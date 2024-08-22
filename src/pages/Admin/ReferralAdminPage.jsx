import { getUserEmail, isUserLoggedIn } from "../../features/User/UserDetails";
import Page404 from "../Maintenance/Page404";
import "./ReferralAdminPage.css";
import { Helmet } from "react-helmet";

export default function ReferralAdminPage() {
  if (!isUserLoggedIn()) return <Page404 />;
  const allowedEmailIds = ["raj.swapnil1708@gmail.com"];
  if (!allowedEmailIds.includes(getUserEmail())) return <Page404 />;

  return (
    <main className="referral-admin-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Referrals | Admin Panel</title>
      </Helmet>
      <p>
        This page is only accessible to authorized users. If you think this is a
        mistake, please contact the engineerHUB administration. Email us at{" "}
        <a href="mailto:info@engineerhub.in">info@engineerhub.in</a> or call us
        at <a href="tel:+918303156089">+91 83031 56089</a>
      </p>
      <section>
        <h1 className="body-lg-semibold">Admin Panel for Service Page</h1>
        <div className="table">
          <div className="table-col table-headers body-sm-regular">Service Name</div>
          <div className="table-col table-headers body-sm-regular">Name</div>
          <div className="table-col table-headers body-sm-regular">Phone Number</div>
          <div className="table-col table-headers body-sm-regular">Date & Time Slot</div>
          <div className="table-col table-headers body-sm-regular">Event Actions</div>
          <div className="table-col table-headers body-sm-regular">Booking Details</div>
          <div className="table-col table-headers body-sm-regular">Booking Status</div>
          <div className="table-col">Service Name</div>
          <div className="table-col">Name</div>
          <div className="table-col">Phone Number</div>
          <div className="table-col">Date & Time Slot</div>
          <div className="table-col">Event Actions</div>
          <div className="table-col">Booking Details</div>
          <div className="table-col">Booking Status</div>
        </div>
      </section>
    </main>
  );
}
