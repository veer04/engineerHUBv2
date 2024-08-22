import { Fragment } from "react";
import { getUserEmail, isUserLoggedIn } from "../../features/User/UserDetails";
import Page404 from "../Maintenance/Page404";
import "./ReferralAdminPage.css";
import { Helmet } from "react-helmet";
import { IoIosInformationCircleOutline, IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

export default function ReferralAdminPage() {
  if (!isUserLoggedIn()) return <Page404 />;
  const allowedEmailIds = ["raj.swapnil1708@gmail.com"];
  if (!allowedEmailIds.includes(getUserEmail())) return <Page404 />;

  const tableContent = [
    {
      serviceName: "Resume Building+Career Guidance | Referral for Job",
      name: "Girish Shedge",
      email: "girishshedge54@gmail.com",
      phoneNumber: "9874563210",
      date: "14/08/24",
      timeSlot: "3:30PM to 4:30PM",
      bookingDetails: [
        {
          label: "Purchased at",
          value: "13/08/24 at 12:00 PM",
        },
        {
          label: "Total Amount",
          value: "399/-",
        },
      ],
      bookingStatus: "done",
    },
    {
      serviceName: "Resume Building+Career Guidance | Referral for Job",
      name: "Girish Shedge",
      email: "girishshedge54@gmail.com",
      phoneNumber: "9874563210",
      date: "14/08/24",
      timeSlot: "3:30PM to 4:30PM",
      bookingDetails: [
        {
          label: "Purchased at",
          value: "13/08/24 at 12:00 PM",
        },
        {
          label: "Total Amount",
          value: "399/-",
        },
      ],
      bookingStatus: "pending",
    },
    {
      serviceName: "Resume Building+Career Guidance | Referral for Job",
      name: "Girish Shedge",
      email: "girishshedge54@gmail.com",
      phoneNumber: "9874563210",
      date: "14/08/24",
      timeSlot: "3:30PM to 4:30PM",
      bookingDetails: [
        {
          label: "Purchased at",
          value: "13/08/24 at 12:00 PM",
        },
        {
          label: "Total Amount",
          value: "399/-",
        },
      ],
      bookingStatus: "failed",
    },
  ];

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
        <div className="referral-table">
          <div className="table-item table-headers body-sm-regular">
            Service Name
          </div>
          <div className="table-item table-headers body-sm-regular">Name</div>
          <div className="table-item table-headers body-sm-regular">
            Phone Number
          </div>
          <div className="table-item table-headers body-sm-regular">
            Date & Time Slot
          </div>
          <div className="table-item table-headers body-sm-regular">
            Event Actions
          </div>
          <div className="table-item table-headers body-sm-regular">
            Booking Details
          </div>
          <div className="table-item table-headers body-sm-regular">
            Booking Status
          </div>
          {tableContent.map((content, index) => (
            <Fragment key={index}>
              <div className="table-item table-content body-md-semibold">
                {content.serviceName}
              </div>
              <div className="table-item table-content table-content-2">
                <p className="body-sm-semibold">{content.name}</p>
                <p className="label-sm">{content.email}</p>
                <a href="/" target="_blank" rel="noreferrer noopener">
                  View Resume
                </a>
              </div>
              <div className="table-item table-content body-sm-semibold">
                {content.phoneNumber}
              </div>
              <div className="table-item table-content table-content-4">
                <p className="body-sm-regular">{content.date}</p>
                <p className="body-sm-regular">{content.timeSlot}</p>
              </div>
              <div className="table-item table-content table-content-5">
                <button className="join-btn body-sm-semibold">Join</button>
              </div>
              <div className="table-item table-content table-content-6">
                {content.bookingDetails.map((detail, index) => (
                  <div key={index}>
                    <p className="label-sm">{detail.label}</p>
                    <p className="body-sm-semibold">{detail.value}</p>
                  </div>
                ))}
              </div>
              <div className="table-item table-content table-content-7">
                {content.bookingStatus === "done" && (
                  <div
                    className="status"
                    style={{ backgroundColor: "#0FB800" }}
                  >
                    <IoMdCheckmark
                      style={{ color: "white", fontSize: "1.5rem" }}
                    />
                  </div>
                )}
                {content.bookingStatus === "pending" && (
                  <div
                    className="status"
                    style={{ backgroundColor: "#FFD600" }}
                  >
                    <IoIosInformationCircleOutline
                      style={{ color: "black", fontSize: "1.5rem" }}
                    />
                  </div>
                )}
                {content.bookingStatus === "failed" && (
                  <div
                    className="status"
                    style={{ backgroundColor: "#FF3737" }}
                  >
                    <RxCross1 
                      style={{ color: "white", fontSize: "1.5rem" }}
                    />
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}
