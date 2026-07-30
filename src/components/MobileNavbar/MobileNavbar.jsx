import "./MobileNavbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useNavbar from "../../hooks/use-navbar";
import { useEffect, useRef, useState } from "react";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import useChatNotifications from "../../hooks/useChatNotifications";
import {
  getUserRole,
  isUserLoggedIn,
} from "../../features/User/UserDetails";
import { ENABLE_COMMUNITY_CHAT } from "../../config/featureFlags";
import { FaUserCircle } from "react-icons/fa";

const EMPLOYER_CONNECT_PHONE_DISPLAY = "83031 56089 / 91298 83089";
const EMPLOYER_CONNECT_EMAIL_DISPLAY = "info@engineerhub.in";
const EMPLOYER_BOOK_SLOT_REFERRAL_PATH =
  "/referrals/book-now/67a107c89d57a46e99582bd1";

export function CommunitySvg({ className }) {
  return (
    <svg
      className={`${className}`}
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.0227 22.0985C24.903 22.7652 21.967 24.1266 23.7552 25.8303C24.6287 26.6624 25.6016 27.2576 26.8247 27.2576H33.8042C35.0273 27.2576 36.0002 26.6624 36.8737 25.8303C38.6619 24.1266 35.726 22.7652 34.6062 22.0985C31.9804 20.5349 28.6486 20.5349 26.0227 22.0985Z"
        fill="#CCCCCC"
      />
      <path
        d="M33.8762 14.9894C33.8762 16.9564 32.2816 18.551 30.3146 18.551C28.3475 18.551 26.7529 16.9564 26.7529 14.9894C26.7529 13.0223 28.3475 11.4277 30.3146 11.4277C32.2816 11.4277 33.8762 13.0223 33.8762 14.9894Z"
        fill="#CCCCCC"
      />
      <path
        d="M6.57449 22.0985C5.45473 22.7652 2.51879 24.1266 4.30698 25.8303C5.18049 26.6624 6.15336 27.2576 7.3765 27.2576H14.3559C15.5791 27.2576 16.552 26.6624 17.4254 25.8303C19.2136 24.1266 16.2777 22.7652 15.1579 22.0985C12.5321 20.5349 9.20032 20.5349 6.57449 22.0985Z"
        fill="#CCCCCC"
      />
      <path
        d="M14.428 14.9894C14.428 16.9564 12.8334 18.551 10.8663 18.551C8.8993 18.551 7.30469 16.9564 7.30469 14.9894C7.30469 13.0223 8.8993 11.4277 10.8663 11.4277C12.8334 11.4277 14.428 13.0223 14.428 14.9894Z"
        fill="#CCCCCC"
      />
      <path
        d="M15.0787 22.8858C14.9612 22.9557 14.8188 23.0361 14.6594 23.1261C13.9786 23.5106 12.9883 24.0698 12.3083 24.7354C11.8831 25.1516 11.5061 25.6752 11.438 26.2979C11.3666 26.9514 11.647 27.5828 12.2611 28.1679L12.2611 28.1679C13.3574 29.2122 14.6458 30.0234 16.2995 30.0234H24.6978C26.3516 30.0234 27.64 29.2123 28.7362 28.1679L28.4195 27.8354L28.7362 28.1679C29.3503 27.5828 29.6307 26.9514 29.5593 26.2979C29.4912 25.6752 29.1142 25.1516 28.689 24.7354C28.009 24.0697 27.0187 23.5105 26.3379 23.1261C26.1785 23.0361 26.0362 22.9557 25.9187 22.8858C22.6014 20.9105 18.3959 20.9105 15.0787 22.8858ZM15.0787 22.8858L15.3345 23.3154L15.0787 22.8858Z"
        fill="#CCCCCC"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4986 19.548C23.1417 19.548 25.2843 17.4054 25.2843 14.7623C25.2843 12.1192 23.1417 9.97656 20.4986 9.97656C17.8555 9.97656 15.7129 12.1192 15.7129 14.7623C15.7129 17.4054 17.8555 19.548 20.4986 19.548Z"
        fill="#CCCCCC"
        stroke="white"
      />
    </svg>
  );
}
export function CampusSvg({ className }) {
  return (
    <svg
      className={`${className}`}
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37.9067 13.0206L22.0333 7.43736C21.0469 7.06515 21.2441 7.06515 20.2729 7.43736L4.29323 12.9585C3.30682 13.3152 3.322 13.9046 4.3084 14.2768L8.10225 15.595C6.41778 17.2545 6.31155 18.9915 6.29638 20.9921C5.64384 21.2403 5.18857 21.8917 5.18857 22.6516C5.18857 23.3495 5.58313 23.9388 6.14462 24.2335C5.87147 26.2652 5.1127 28.607 2.85156 31.3676C3.97454 32.2516 4.55121 32.5463 5.4162 32.8409C8.58786 31.4451 8.1933 27.754 7.9505 24.0939C8.39058 23.7682 8.66374 23.2564 8.66374 22.6671C8.66374 22.0312 8.34506 21.4729 7.84427 21.1627C7.90497 19.1931 8.31471 17.4406 9.75637 16.2929C9.77154 16.2619 9.80189 16.2309 9.8626 16.2154L20.7737 11.7023C21.1834 11.5317 21.6387 11.7333 21.8056 12.1521L21.8208 12.1831C21.9877 12.6018 21.7905 13.0671 21.3807 13.2377L12.1541 17.0064L20.4095 19.86C21.3959 20.2322 21.1986 20.2322 22.1698 19.86L37.9219 14.3233C38.8931 13.9666 38.8931 13.3773 37.9067 13.0206ZM20.3791 22.0002L10.3937 18.5417V21.1472C10.9097 21.6435 11.198 22.3414 11.198 23.1169C11.198 23.8148 10.9552 24.4506 10.5607 24.9314C10.6972 25.3346 10.9249 25.7379 11.2587 25.8619C17.0709 29.1498 25.1139 29.1033 31.5634 25.5363C32.049 25.133 32.4132 24.6212 32.4132 24.1405V18.4022L22.1395 22.0157C21.1683 22.3724 21.3655 22.3724 20.3791 22.0002Z"
        fill="#CCCCCC"
      />
    </svg>
  );
}
export function CompanySvg({ className }) {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 26 20"
      fill="none"
    >
      <g clipPath="url(#clip0_3000_29813)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3981 4.515H9.60116C9.32411 4.515 9.06012 4.40586 8.8642 4.21213C8.66827 4.01841 8.55896 3.75578 8.55896 3.48088V2.85877C8.55896 2.11456 8.85732 1.4065 9.38736 0.88057C9.91739 0.354642 10.631 0.0585938 11.381 0.0585938H14.619C15.369 0.0585938 16.0826 0.354642 16.6126 0.88057C17.1427 1.4065 17.441 2.11456 17.441 2.85877V3.48088C17.441 3.75578 17.331 4.01772 17.1358 4.21213C16.9399 4.40654 16.6759 4.515 16.3988 4.515H16.3981ZM10.2488 2.83831H15.7512C15.7457 2.54635 15.6261 2.27145 15.4178 2.06476C15.2054 1.8533 14.9201 1.73393 14.619 1.73393H11.381C11.0799 1.73393 10.7946 1.8533 10.5822 2.06476C10.3739 2.27145 10.2543 2.54635 10.2488 2.83831Z"
          fill="#A2D4D3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.3737 2.83398H16.4875C16.4586 2.83808 16.4284 2.84012 16.3981 2.84012H9.60116C9.57092 2.84012 9.54067 2.83808 9.51179 2.83398H0.626286C0.545165 2.83398 0.470231 2.86741 0.416609 2.9213C0.362299 2.97519 0.328613 3.04886 0.328613 3.12935V5.39541C0.328613 7.24401 1.09101 8.92548 2.31952 10.1445C3.54802 11.3634 5.24194 12.1199 7.10566 12.1199H10.7798C11.1881 12.1199 11.5192 11.7889 11.5192 11.3805C11.5192 10.976 11.6856 10.6083 11.9537 10.3423C12.2218 10.0762 12.5923 9.91117 13 9.91117C13.4077 9.91117 13.7782 10.0762 14.0463 10.3423C14.3144 10.6083 14.4808 10.976 14.4808 11.3805C14.4808 11.7889 14.8119 12.1199 15.2202 12.1199H18.8943C20.7574 12.1199 22.452 11.3634 23.6805 10.1445C24.909 8.92548 25.6714 7.24469 25.6714 5.39541V3.12935C25.6714 3.04886 25.6377 2.97519 25.5834 2.9213C25.5291 2.86741 25.4548 2.83398 25.3737 2.83398Z"
          fill="#A2D4D3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.278 10.7346C22.8969 12.1051 20.9912 12.9557 18.8951 12.9557H14.4816V14.1549C14.4816 14.5594 14.3152 14.9271 14.0471 15.1931C13.779 15.4591 13.4084 15.6242 13.0008 15.6242C12.5931 15.6242 12.2226 15.4591 11.9545 15.1931C11.6863 14.9271 11.52 14.5594 11.52 14.1549V12.9557H7.10644C5.01035 12.9557 3.10469 12.1051 1.72357 10.7346C1.16673 10.1821 0.694436 9.54431 0.330078 8.84375V19.6461C0.330078 19.7266 0.363764 19.8003 0.418074 19.8541C0.472384 19.908 0.54663 19.9415 0.627751 19.9415H25.3752C25.4563 19.9415 25.5305 19.908 25.5849 19.8541C25.6392 19.8003 25.6729 19.7266 25.6729 19.6461V8.84375C25.3078 9.54431 24.8362 10.1814 24.2794 10.7346H24.278Z"
          fill="#A2D4D3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.6366 12.5373V11.379C13.6366 11.2058 13.5651 11.0482 13.4496 10.9336C13.3341 10.819 13.1753 10.748 13.0007 10.748C12.826 10.748 12.6672 10.819 12.5517 10.9336C12.4362 11.0482 12.3647 11.2058 12.3647 11.379V14.1553C12.3647 14.3286 12.4362 14.4862 12.5517 14.6008C12.6672 14.7154 12.826 14.7863 13.0007 14.7863C13.1753 14.7863 13.3341 14.7154 13.4496 14.6008C13.5651 14.4862 13.6366 14.3286 13.6366 14.1553V12.5373Z"
          fill="#A2D4D3"
        />
      </g>
      <defs>
        <clipPath id="clip0_3000_29813">
          <rect
            width="25.3428"
            height="19.8843"
            fill="white"
            transform="translate(0.328613 0.0585938)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
export function ServicesSvg({ className }) {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 25 18"
      fill="none"
    >
      <path
        d="M24.1655 2.51421V9.74866C24.1655 9.74866 22.6207 10.0508 22.3016 10.0934C21.9824 10.1359 20.9908 10.4551 20.2674 9.76143C19.1524 8.672 15.199 4.73561 15.199 4.73561C14.9505 4.53356 14.6441 4.41597 14.3242 4.3999C14.0044 4.38383 13.6877 4.47012 13.4202 4.64625C12.4159 5.17393 10.9222 5.9527 10.3009 6.25485C10.0914 6.37732 9.85421 6.44463 9.6116 6.45047C9.36899 6.45631 9.12887 6.40049 8.91372 6.28823C8.69856 6.17598 8.51541 6.01096 8.38142 5.80863C8.24742 5.6063 8.16695 5.37328 8.14756 5.13138C8.16119 4.85602 8.2523 4.59011 8.4104 4.36425C8.5685 4.13839 8.78717 3.96177 9.04123 3.85471C10.4583 3.0036 13.45 1.30137 14.6969 0.654528C15.4544 0.228972 15.9991 0.228972 17.0417 1.08008C18.3226 2.18227 19.4844 3.14829 19.4844 3.14829C19.622 3.24642 19.7792 3.3136 19.9452 3.34518C20.1112 3.37677 20.2821 3.37203 20.4461 3.33128C21.8803 3.03339 24.1655 2.51421 24.1655 2.51421ZM8.41992 14.7362C8.51626 14.5151 8.54803 14.2713 8.51153 14.0329C8.47504 13.7945 8.37178 13.5714 8.21371 13.3893C8.05564 13.2072 7.84922 13.0735 7.61835 13.0039C7.38749 12.9342 7.14161 12.9314 6.90919 12.9957C6.97973 12.7777 6.9917 12.5449 6.94389 12.3209C6.89609 12.0968 6.7902 11.8892 6.63684 11.719C6.46989 11.5598 6.26446 11.4467 6.04067 11.3907C5.81687 11.3348 5.58239 11.3379 5.36017 11.3998C5.43015 11.1815 5.44143 10.9485 5.39288 10.7244C5.34432 10.5003 5.23764 10.293 5.08356 10.1232C4.80776 9.8684 4.44329 9.73158 4.06798 9.74192C3.69268 9.75226 3.33629 9.90893 3.07493 10.1785C2.48766 10.7402 2.10892 11.7615 2.64938 12.3658C3.18983 12.9701 3.77284 12.5999 4.23244 12.4935C4.10478 12.9488 3.72178 13.3744 4.19414 13.9702C4.66651 14.566 5.31761 14.2042 5.77721 14.0978C5.64955 14.5532 5.28357 15.017 5.73466 15.5703C6.18575 16.1235 6.94324 15.8299 7.43688 15.6767C7.24538 16.166 6.83685 16.6937 7.36028 17.2895C7.88371 17.8853 9.09655 17.6087 9.68807 17.0427C9.96871 16.7953 10.1398 16.4466 10.1637 16.0733C10.1876 15.6999 10.0625 15.3323 9.81574 15.0511C9.63575 14.8734 9.40957 14.7497 9.16285 14.6941C8.91614 14.6384 8.65876 14.653 8.41992 14.7362ZM19.2078 10.9828L14.6415 6.43784C14.4303 6.2403 14.1666 6.10792 13.882 6.05659C13.5975 6.00525 13.3041 6.03715 13.0372 6.14846C12.3989 6.42932 11.5775 6.81232 10.9562 7.1017C10.5285 7.35641 10.051 7.51606 9.55615 7.56981C9.03701 7.57476 8.5305 7.40974 8.1139 7.09993C7.69731 6.79012 7.3935 6.35253 7.24884 5.85392C7.10417 5.35531 7.1266 4.82307 7.31268 4.3384C7.49877 3.85373 7.8383 3.44324 8.27948 3.16956C9.27103 2.49293 11.4371 1.33116 11.4371 1.33116C11.1645 1.04459 10.8333 0.820202 10.4661 0.673318C10.0989 0.526433 9.70434 0.460511 9.30933 0.48005C7.85393 0.48005 4.80694 2.48016 4.80694 2.48016C4.48456 2.6486 4.12796 2.74114 3.76435 2.75073C3.40075 2.76032 3.03976 2.68669 2.70895 2.53549L0.334351 1.70991V9.9657C0.334351 9.9657 1.01098 10.1615 1.61102 10.3913C1.74732 9.99391 1.97467 9.63395 2.27489 9.34013C2.75918 8.87546 3.40302 8.61389 4.07416 8.60914C4.7453 8.60439 5.39278 8.85683 5.8836 9.31459C6.1567 9.59656 6.35303 9.94379 6.45385 10.3232C6.82298 10.4381 7.15783 10.6428 7.42837 10.9189C7.70246 11.2062 7.89746 11.5595 7.99436 11.9445C8.38347 12.0653 8.73407 12.286 9.01113 12.5848C9.28819 12.8835 9.48199 13.2497 9.57317 13.6468C9.95974 13.7568 10.3105 13.9667 10.5903 14.2553C10.8513 14.5283 11.0444 14.859 11.1538 15.2205C11.2632 15.5821 11.2859 15.9643 11.2201 16.3363C11.2201 16.3363 11.5605 16.7193 11.769 16.9278C11.9654 17.1242 12.2318 17.2345 12.5095 17.2345C12.7872 17.2345 13.0536 17.1242 13.25 16.9278C13.4464 16.7314 13.5567 16.4651 13.5567 16.1873C13.5567 15.9096 13.4464 15.6432 13.25 15.4469C13.25 15.4469 14.1011 16.5022 15.0714 15.8724C15.9225 15.2766 15.7905 14.5702 15.3863 14.1702C15.5097 14.3171 15.6628 14.4362 15.8356 14.5196C16.0084 14.603 16.197 14.6489 16.3888 14.6541C16.5806 14.6593 16.7713 14.6238 16.9484 14.55C17.1255 14.4761 17.2849 14.3655 17.4162 14.2255C17.5988 14.0405 17.7058 13.7939 17.716 13.5341C17.7262 13.2743 17.639 13.02 17.4715 12.8212C17.4715 12.8212 18.0375 13.5914 19.1737 12.8722C19.978 12.1914 19.5993 11.4126 19.1737 11.0041L19.2078 10.9828Z"
        fill="#CCCCCC"
      />
    </svg>
  );
}
export function HostSvg({ className }) {
  return (
    <svg
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M25.6667 14.0007C25.6667 7.55733 20.4433 2.33398 14 2.33398C7.55672 2.33398 2.33337 7.55733 2.33337 14.0007C2.33337 20.4439 7.55672 25.6673 14 25.6673C20.4433 25.6673 25.6667 20.4439 25.6667 14.0007Z"
        fill="#CCCCCC"
      />
      <path
        d="M13.9987 9.33203V18.6654M18.6654 13.9987H9.33203"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const AUTH_PATH_PREFIXES = [
  "/login",
  "/signup",
  "/select-role",
  "/club-signup",
  "/organization-signup",
];

export default function MobileNavbar() {
  const navigate = useNavigate();
  const { selectedPageNavbar, setSelectedPageNavbar } = useNavbar();
  const { notificationData } = useChatNotifications();
  const [showNavbar, setShowNavbar] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    typeof window !== "undefined" ? isUserLoggedIn() : false
  );
  const [hostPickerOpen, setHostPickerOpen] = useState(false);
  const [connectPickerOpen, setConnectPickerOpen] = useState(false);
  const hostPickerRef = useRef(null);
  const connectPickerRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    setUserRole(getUserRole());
    setIsLoggedIn(isUserLoggedIn());
    const path = location.pathname;
    const isBookingRoute =
      path === "/referrals/book-now/payment" ||
      path === "/referrals/product-book-now/payment" ||
      (path.startsWith("/referrals/book-now/") && !path.endsWith("/success")) ||
      (path.startsWith("/referrals/product-book-now/") && !path.endsWith("/success")) ||
      path.includes("/chat/");
    setShowNavbar(!isBookingRoute);
  }, [location]);

  useEffect(() => {
    const onAuth = AUTH_PATH_PREFIXES.some(
      (p) =>
        location.pathname === p || location.pathname.startsWith(`${p}/`)
    );
    if (onAuth) {
      setSelectedPageNavbar("profile");
    }
  }, [location.pathname, setSelectedPageNavbar]);

  const isEmployerMobileNav =
    location.pathname.startsWith("/employer") ||
    location.pathname.startsWith("/host");

  useEffect(() => {
    if (!isEmployerMobileNav) return;
    if (location.pathname.startsWith("/host")) {
      setSelectedPageNavbar("employer-host");
    } else if (location.pathname.startsWith("/employer")) {
      setSelectedPageNavbar("employer-connect");
    }
  }, [isEmployerMobileNav, location.pathname, setSelectedPageNavbar]);

  useEffect(() => {
    setHostPickerOpen(false);
    setConnectPickerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!hostPickerOpen && !connectPickerOpen) return undefined;
    const onPointerDown = (e) => {
      if (
        hostPickerOpen &&
        hostPickerRef.current &&
        !hostPickerRef.current.contains(e.target)
      ) {
        setHostPickerOpen(false);
      }
      if (
        connectPickerOpen &&
        connectPickerRef.current &&
        !connectPickerRef.current.contains(e.target)
      ) {
        setConnectPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [hostPickerOpen, connectPickerOpen]);

  const goEmployerBookSlot = () => {
    setConnectPickerOpen(false);
    navigate(EMPLOYER_BOOK_SLOT_REFERRAL_PATH);
  };

  const profileTab = isLoggedIn ? (
    <button
      type="button"
      className={`item-container ${
        selectedPageNavbar === "profile" ? "--is-active" : ""
      }`}
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
      aria-label="Open account menu"
      onClick={() => setSelectedPageNavbar("profile")}
    >
      <FaUserCircle className="svg mobile-navbar-profile-icon" aria-hidden />
      <span>Profile</span>
    </button>
  ) : (
    <Link
      to="/login"
      onClick={() => setSelectedPageNavbar("profile")}
      className={`item-container ${
        selectedPageNavbar === "profile" ? "--is-active" : ""
      }`}
    >
      <FaUserCircle className="svg mobile-navbar-profile-icon" aria-hidden />
      <span>Profile</span>
    </Link>
  );

  return showNavbar ? (
    <div
      className={
        isEmployerMobileNav
          ? "mobile-navbar mobile-navbar--employer"
          : "mobile-navbar"
      }
    >
      {isEmployerMobileNav ? (
        <>
          <div
            className={`mobile-navbar-host-slot${
              hostPickerOpen ? " mobile-navbar-host-slot--open" : ""
            }`}
            ref={hostPickerRef}
          >
            <button
              type="button"
              onClick={() => {
                setConnectPickerOpen(false);
                setHostPickerOpen((o) => !o);
              }}
              className={`item-container vibrate-1 ${
                selectedPageNavbar === "employer-host" ? "--is-active" : ""
              }`}
              aria-expanded={hostPickerOpen}
              aria-haspopup="dialog"
              aria-controls="mobile-host-picker"
            >
              <HostSvg className="svg" />
              <span>Host</span>
            </button>
            {hostPickerOpen ? (
              <div
                id="mobile-host-picker"
                className="mobile-navbar-host-picker"
                role="dialog"
                aria-label="Choose what to host"
              >
                <p className="mobile-navbar-host-picker-label">Host</p>
                <button
                  type="button"
                  className="mobile-navbar-host-picker-option"
                  onClick={() => {
                    setHostPickerOpen(false);
                    setSelectedPageNavbar("employer-host");
                    navigate("/host/jobs");
                  }}
                >
                  Jobs
                </button>
                <button
                  type="button"
                  className="mobile-navbar-host-picker-option"
                  onClick={() => {
                    setHostPickerOpen(false);
                    setSelectedPageNavbar("employer-host");
                    navigate("/host/internships");
                  }}
                >
                  Internships
                </button>
              </div>
            ) : null}
          </div>
          <div
            className={`mobile-navbar-connect-slot${
              connectPickerOpen ? " mobile-navbar-connect-slot--open" : ""
            }`}
            ref={connectPickerRef}
          >
            <button
              type="button"
              onClick={() => {
                setHostPickerOpen(false);
                setConnectPickerOpen((o) => !o);
              }}
              className={`item-container vibrate-2 ${
                selectedPageNavbar === "employer-connect" ? "--is-active" : ""
              }`}
              aria-expanded={connectPickerOpen}
              aria-haspopup="dialog"
              aria-controls="mobile-connect-picker"
            >
              <ServicesSvg className="svg" />
              <span>Connect</span>
            </button>
            {connectPickerOpen ? (
              <div
                id="mobile-connect-picker"
                className="mobile-navbar-host-picker mobile-navbar-connect-picker-as-host"
                role="dialog"
                aria-label="Connect"
              >
                <p className="mobile-navbar-host-picker-label">Connect</p>
                <div
                  className="mobile-navbar-host-picker-static-row"
                  aria-label="Phone numbers"
                >
                  {EMPLOYER_CONNECT_PHONE_DISPLAY}
                </div>
                <div
                  className="mobile-navbar-host-picker-static-row"
                  aria-label="Email"
                >
                  {EMPLOYER_CONNECT_EMAIL_DISPLAY}
                </div>
                <button
                  type="button"
                  className="mobile-navbar-host-picker-option"
                  onClick={goEmployerBookSlot}
                >
                  Book a slot
                </button>
              </div>
            ) : null}
          </div>
          {profileTab}
        </>
      ) : (
        <>
          {ENABLE_COMMUNITY_CHAT &&
            userRole !== "Organization" &&
            userRole !== "Club" && (
            <Link
              to="/chat"
              onClick={() => {
                setSelectedPageNavbar("chat");
              }}
              className={`item-container ${
                selectedPageNavbar === "community" ? "--is-active" : ""
              }`}
              style={{ position: "relative" }}
            >
              <CommunitySvg className="svg" />
              <span> Chat</span>
              <NotificationBadge
                count={notificationData.count}
                type={notificationData.type}
                className="mobile-badge"
              />
            </Link>
          )}
          <Link
            to="/career"
            onClick={() => {
              setSelectedPageNavbar("career");
            }}
            className={`item-container ${
              selectedPageNavbar === "career" ? "--is-active" : ""
            }`}
          >
            <CompanySvg className="svg" />
            <span className="new-design-color">Career</span>
          </Link>
          <Link
            to="/referrals"
            onClick={() => {
              setSelectedPageNavbar("services");
            }}
            className={`item-container ${
              selectedPageNavbar === "services" ? "--is-active" : ""
            }`}
          >
            <ServicesSvg className="svg" />
            <span>Referrals</span>
          </Link>
          {profileTab}
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
