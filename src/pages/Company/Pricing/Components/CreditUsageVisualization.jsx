import React from "react";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default function CreditUsageVisualization({ usageData }) {
  const { total, items } = usageData;

  return (
    <section className="usage-visualization-section">
      <div className="vis-container">
        <div className="vis-left-info">
          <div className="section-pill-badge" style={{ marginBottom: "0.75rem" }}>
            <SlidersHorizontal size={14} /> FLEXIBLE ALLOCATION
          </div>
          <h3>Your AI Credits, your way.</h3>
          <p>
            No rigid feature siloes. Whether you need 1,000 resume sorts this week or 50 AI voice interviews next month, your single credit balance automatically adapts to your current recruitment cycle.
          </p>

          <div className="vis-pool-card">
            <div className="vis-pool-badge">
              <Sparkles size={24} />
            </div>
            <div>
              <div className="vis-pool-num">{total.toLocaleString()} AI Credits</div>
              <div className="vis-pool-lbl">
                Sample distribution across active hiring pipeline
              </div>
            </div>
          </div>
        </div>

        <div className="vis-dist-list">
          {items.map((item) => (
            <div key={item.id} className="vis-dist-item">
              <div className="vis-dist-meta">
                <div className="vis-dist-name">
                  <span
                    className="vis-dot"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </div>
                <div className="vis-dist-val">
                  {item.used} credits ({item.percentage}%)
                </div>
              </div>
              <div className="vis-dist-bar">
                <div
                  className="vis-dist-fill"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
