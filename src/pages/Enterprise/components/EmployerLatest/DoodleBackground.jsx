import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "./DoodleBackground.css";
import { DOODLE_ICONS } from "./icons";

// CONFIGURABLE CONSTANTS (top of file as requested)
export const ICON_COLOR = "#CBD5D1";
export const HOVER_COLOR = "#128381";
export const BASE_OPACITY = 0.40;
export const HOVER_OPACITY = 0.60;
export const HOVER_RADIUS = 150;
export const MAX_SCALE = 1.6;
export const DENSITY = 1.0;
export const SEED = 42;

/**
 * Deterministic 32-bit PRNG (Mulberry32) for stable seeded layout across re-renders.
 */
function createPrng(seedValue = SEED) {
  let s = (typeof seedValue === "number" ? seedValue : 42) >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Reusable DoodleBackground component for Hero sections.
 * Renders domain-relatable doodle icons with wobbly hand-drawn SVG filter,
 * high density on sides, low density in central text column with exclusion zones,
 * and high-performance rAF CSS variable --p hover proximity interactions.
 */
export default function DoodleBackground({
  heroRef,
  iconColor = ICON_COLOR,
  hoverColor = HOVER_COLOR,
  baseOpacity = BASE_OPACITY,
  hoverOpacity = HOVER_OPACITY,
  hoverRadius = HOVER_RADIUS,
  maxScale = MAX_SCALE,
  density = DENSITY,
  seed = SEED,
  customIcons = DOODLE_ICONS,
}) {
  const containerRef = useRef(null);
  const iconDomRefs = useRef([]);
  const cachedIconsRef = useRef([]);
  const heroRectRef = useRef(null);
  const cursorPosRef = useRef({ x: -2000, y: -2000 });
  const rafIdRef = useRef(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [exclusions, setExclusions] = useState([]);

  // Compute the host hero element (either passed ref or parent element)
  const getHostElement = useCallback(() => {
    return heroRef?.current || containerRef.current?.parentElement || null;
  }, [heroRef]);

  // Debounced measurement of dimensions and central exclusion zones
  const measureHost = useCallback(() => {
    const host = getHostElement();
    if (!host) return;

    const hostRect = host.getBoundingClientRect();
    const width = Math.round(hostRect.width || host.clientWidth || window.innerWidth);
    const height = Math.round(hostRect.height || host.clientHeight || 650);

    // Measure exclusion zones for all critical centered text and interactive buttons
    const exclusionSelectors = [
      '[class*="pillBadgeWrapper"]',
      '[class*="pillBadge"]',
      "h1",
      '[class*="mainHeadline"]',
      "p",
      '[class*="subHeadline"]',
      '[class*="affirmationBanner"]',
      '[class*="ctaButtonGroup"]',
      '[class*="metricsStrip"]',
    ];

    const boxes = [];
    exclusionSelectors.forEach((selector) => {
      const elements = host.querySelectorAll(selector);
      elements.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        // Add comfortable exclusion margin around content
        const padX = selector.includes("ctaButtonGroup") || selector.includes("mainHeadline") ? 28 : 20;
        const padY = 16;
        boxes.push({
          left: elRect.left - hostRect.left - padX,
          top: elRect.top - hostRect.top - padY,
          right: elRect.right - hostRect.left + padX,
          bottom: elRect.bottom - hostRect.top + padY,
        });
      });
    });

    // Fallback exclusion if elements have not mounted/measured yet
    if (boxes.length === 0) {
      const midX = width / 2;
      const safeHalfW = Math.min(380, width * 0.44);
      boxes.push({
        left: midX - safeHalfW,
        top: 60,
        right: midX + safeHalfW,
        bottom: Math.min(height - 80, 480),
      });
      boxes.push({
        left: midX - Math.min(440, width * 0.48),
        top: height - 120,
        right: midX + Math.min(440, width * 0.48),
        bottom: height - 15,
      });
    }

    heroRectRef.current = hostRect;
    setDimensions({ width, height });
    setExclusions(boxes);
  }, [getHostElement]);

  // Mount & resize listener setup (debounced 200ms)
  useEffect(() => {
    measureHost();

    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measureHost();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [measureHost]);

  // Generate stable icon layout via seeded PRNG
  const icons = useMemo(() => {
    const { width, height } = dimensions;
    if (!width || !height || customIcons.length === 0) return [];

    const prng = createPrng(seed);
    const isMobile = width < 768;

    // Keep icons strictly inside the bordered container only!
    // Hatched gutters on desktop (>900px) take 70px on left and right.
    const gutterWidth = width > 900 ? 70 : 0;
    const padX = isMobile ? 16 : 28;
    const padY = isMobile ? 20 : 30;

    const minX = gutterWidth + padX;
    const maxX = width - gutterWidth - padX;
    const minY = padY;
    const maxY = height - padY;

    const innerWidth = maxX - minX;
    const innerHeight = maxY - minY;

    if (innerWidth <= 40 || innerHeight <= 40) return [];

    // Define 3 horizontal sections: high density on left & right thirds, low in center
    const leftThirdEnd = minX + innerWidth * 0.32;
    const rightThirdStart = maxX - innerWidth * 0.32;

    // Grid sizing based on responsive viewport and density multiplier
    const densityFactor = isMobile ? density * 0.4 : density;
    const cellW = isMobile
      ? Math.max(90, Math.floor(innerWidth / 4))
      : Math.max(76, Math.floor(innerWidth / (12 * densityFactor)));
    const cellH = isMobile
      ? Math.max(88, Math.floor(innerHeight / 5))
      : Math.max(72, Math.floor(innerHeight / (6 * densityFactor)));

    const numCols = Math.max(1, Math.floor(innerWidth / cellW));
    const numRows = Math.max(1, Math.floor(innerHeight / cellH));

    const placedItems = [];
    const minDistance = isMobile ? 65 : 62;
    let iconIndex = 0;

    // Shuffle icon sequence deterministically for variety
    const iconPool = [...customIcons].sort(() => prng() - 0.5);

    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        // Jittered coordinate within the cell
        const jx = minX + c * cellW + cellW * (0.18 + 0.64 * prng());
        const jy = minY + r * cellH + cellH * (0.18 + 0.64 * prng());

        // Check if candidate falls inside any exclusion rectangle (text, buttons, badges)
        const isExcluded = exclusions.some(
          (box) =>
            jx >= box.left &&
            jx <= box.right &&
            jy >= box.top &&
            jy <= box.bottom
        );
        if (isExcluded) continue;

        const inCenterColumn = jx >= leftThirdEnd && jx <= rightThirdStart;

        // In central column: density is LOW (about 30% of normal)
        if (inCenterColumn) {
          if (prng() > 0.3) continue;
        }

        // Random size and rotation (-20deg to 20deg)
        const minSize = isMobile ? 22 : 28;
        const maxSize = isMobile ? 36 : 52;
        const size = Math.round(minSize + prng() * (maxSize - minSize));
        const rotation = Math.round(-20 + prng() * 40);

        // Lower base opacity in central column (e.g. 0.38) vs standard on sides (0.58)
        const itemBaseOpacity = inCenterColumn
          ? Number((baseOpacity * 0.65).toFixed(2))
          : baseOpacity;

        // Check collision with already placed icons to prevent overlaps
        let collides = false;
        for (let i = 0; i < placedItems.length; i++) {
          const other = placedItems[i];
          const dx = jx - other.cx;
          const dy = jy - other.cy;
          if (dx * dx + dy * dy < minDistance * minDistance) {
            collides = true;
            break;
          }
        }
        if (collides) continue;

        const iconItem = iconPool[iconIndex % iconPool.length];
        iconIndex++;

        placedItems.push({
          id: `doodle-${r}-${c}-${iconIndex}`,
          name: iconItem.name,
          domain: iconItem.domain,
          IconComponent: iconItem.icon,
          size,
          rotation,
          baseOpacity: itemBaseOpacity,
          x: Math.round(jx - size / 2),
          y: Math.round(jy - size / 2),
          cx: Math.round(jx),
          cy: Math.round(jy),
        });
      }
    }

    return placedItems;
  }, [dimensions, exclusions, customIcons, seed, density, baseOpacity]);

  // Cache icon centers and DOM references for zero getBoundingClientRect calls during mousemove
  useEffect(() => {
    cachedIconsRef.current = icons.map((item, idx) => ({
      cx: item.cx,
      cy: item.cy,
      el: iconDomRefs.current[idx],
      currentP: 0,
    }));
  }, [icons]);

  // Performance-critical mousemove interaction attached to the hero container
  useEffect(() => {
    const host = getHostElement();
    if (!host) return;

    // Disable interaction on touch devices or if user prefers reduced motion
    const isTouchOnly = window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchOnly || prefersReducedMotion) return;

    const updateHostRect = () => {
      heroRectRef.current = host.getBoundingClientRect();
    };

    const updateDoodles = () => {
      rafIdRef.current = null;
      const { x: mouseX, y: mouseY } = cursorPosRef.current;
      const items = cachedIconsRef.current;
      const radius = hoverRadius;
      const radiusSq = radius * radius;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.el) continue;

        const dx = mouseX - item.cx;
        const dy = mouseY - item.cy;
        const distSq = dx * dx + dy * dy;

        if (distSq >= radiusSq) {
          if (item.currentP !== 0) {
            item.el.style.setProperty("--p", "0");
            item.currentP = 0;
          }
        } else {
          const dist = Math.sqrt(distSq);
          const linearP = 1 - dist / radius;
          // Smoothstep easing for silky proximity response
          const p = linearP * linearP * (3 - 2 * linearP);
          if (Math.abs(item.currentP - p) > 0.005) {
            item.el.style.setProperty("--p", p.toFixed(3));
            item.currentP = p;
          }
        }
      }
    };

    const onMouseMove = (e) => {
      if (!heroRectRef.current) {
        updateHostRect();
      }
      const rect = heroRectRef.current;
      cursorPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateDoodles);
      }
    };

    const onMouseEnter = () => {
      updateHostRect();
    };

    const onMouseLeave = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      cursorPosRef.current = { x: -2000, y: -2000 };

      // Reset all --p CSS variables to 0
      const items = cachedIconsRef.current;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.el && item.currentP !== 0) {
          item.el.style.setProperty("--p", "0");
          item.currentP = 0;
        }
      }
    };

    host.addEventListener("mousemove", onMouseMove, { passive: true });
    host.addEventListener("mouseenter", onMouseEnter, { passive: true });
    host.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", updateHostRect, { passive: true });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      host.removeEventListener("mousemove", onMouseMove);
      host.removeEventListener("mouseenter", onMouseEnter);
      host.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", updateHostRect);
    };
  }, [getHostElement, hoverRadius]);

  return (
    <div
      ref={containerRef}
      className="doodleBackgroundRoot"
      aria-hidden="true"
      style={{
        "--icon-color": iconColor,
        "--hover-color": hoverColor,
      }}
    >
      {/* Hand-drawn SVG wobble distortion filter */}
      <svg className="doodleFilterDefs" aria-hidden="true" tabIndex={-1}>
        <defs>
          <filter id="doodle-wobble" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Render placed doodle icons */}
      {icons.map((item, idx) => {
        const Icon = item.IconComponent;
        return (
          <div
            key={item.id}
            ref={(el) => {
              iconDomRefs.current[idx] = el;
            }}
            className="doodleIconItem"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              "--rot": `${item.rotation}deg`,
              "--base-opacity": item.baseOpacity,
              "--p": 0,
            }}
            title={item.domain}
          >
            <Icon
              size={item.size}
              strokeWidth={1.5}
              className="doodleSvg"
            />
          </div>
        );
      })}
    </div>
  );
}
