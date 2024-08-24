import { Fragment, useEffect, useState } from "react";
import { getUserEmail, isUserLoggedIn } from "../../features/User/UserDetails";
import Page404 from "../Maintenance/Page404";
import "./ReferralAdminPage.css";
import { Helmet } from "react-helmet";
import { IoIosInformationCircleOutline, IoMdCheckmark } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ADMIN_REFERRAL_TOKEN, PAYMENT_API_URL } from "../../services/APIUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment/moment";
import PaginationBarWithSearchParams from "../../components/PaginationBarWithSearchParams/PaginationBarWithSearchParams";
import Loading from "../../components/Loader/Loading";

export default function ReferralAdminPage() {
  if (!isUserLoggedIn()) return <Page404 />;
  const allowedEmailIds = [
    "raj.swapnil1708@gmail.com",
    "career@engineerhub.in",
  ];
  if (!allowedEmailIds.includes(getUserEmail())) return <Page404 />;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({
    pageNo: "",
    limit: "",
  });
  const [pageCount, setPageCount] = useState(1);
  const pageNo = searchParams.get("pageNo");
  const limit = searchParams.get("limit");

  const params = {
    pageNo: pageNo ? pageNo : 1,
    limit: limit ? limit : 30,
  };

  const config = {
    headers: {
      accessToken: ADMIN_REFERRAL_TOKEN,
    },
  };

  const referralQuery = useQuery({
    queryKey: [
      "admin",
      "referral",
      !!params.pageNo ? params.pageNo : 1,
      !!params.limit ? params.limit : 10,
    ],
    queryFn: () =>
      axios
        .get(
          `${PAYMENT_API_URL}api/v1/admin/meet-payment-records?page=${params.pageNo}&limit=${params.limit}`,
          config
        )
        .then((res) => {
          return res;
        }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!pageNo || !limit) {
      navigate("/admin/referrals?pageNo=1&limit=30");
    }
    if (limit < 1 || limit > 50)
      navigate(`/admin/referrals?pageNo=${pageNo}&limit=30`);
  }, [pageNo, limit]);

  useEffect(() => {
    if (referralQuery.isSuccess) {
      if (
        referralQuery?.data?.data?.data?.records?.length === 0 &&
        pageNo !== 1
      ) {
        navigate(`/admin/referrals?pageNo=1&limit=${limit}`);
        return;
      }
      setPageCount(
        Math.ceil(
          (!!referralQuery.data?.data?.data?.totalRecords
            ? referralQuery.data?.data?.data?.totalRecords
            : 1) /
            (!!limit ? limit : referralQuery.data?.data?.data?.records?.length)
        )
      );
    }
  }, [referralQuery]);

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
        <div className="referral-table-title">
          <h1 className="body-lg-semibold">Admin Panel for Service Page</h1>
          <PaginationBarWithSearchParams
            className="m-0 referral-table-pagination-bar"
            param="pageNo"
            pages={pageCount}
          />
        </div>
        <div className="limit-container">
          <p className="text">Showing</p>
          <select
            name="limit"
            id="limit"
            defaultValue={limit}
            onChange={(e) => {
              navigate(`/admin/referrals?pageNo=1&limit=${e.target.value}`);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option
              style={{
                display: "none",
              }}
              value={limit}
            >
              {limit}
            </option>
          </select>
          <p className="text">results</p>
        </div>
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
          {referralQuery.isPending && (
            <>
              <div
                style={{
                  marginTop: "5dvh",
                  marginBottom: "10dvh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gridColumn: "1/8",
                  gridRow: "7/7",
                }}
              >
                <Loading />
              </div>
            </>
          )}
          {referralQuery.isSuccess &&
            referralQuery.data.data.data.records.map((content, index) => (
              <Fragment key={index}>
                <p className="table-item table-content body-md-semibold">
                  {content?.meetData[0]?.title}
                </p>
                <div className="table-item table-content table-content-2">
                  <p className="body-sm-semibold">
                    {content?.name ? content?.name : <i>No name provided</i>}
                  </p>
                  <p className="label-sm">
                    {content?.email ? content?.email : <i>No email provided</i>}
                  </p>
                  {content?.resume ? (
                    <a
                      href={
                        // check if the resume link is ending with doc or docx then add to the starting this link "http://docs.google.com/gview?url=" else open the link
                        content?.resume.endsWith("doc") ||
                        content?.resume.endsWith("docx")
                          ? `http://docs.google.com/gview?url=${content?.resume}`
                          : content?.resume
                      }
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      View Resume
                    </a>
                  ) : (
                    <i className="not-present">No resume provided</i>
                  )}
                </div>
                <div className="table-item table-content body-sm-semibold">
                  {content?.mobile ? (
                    content?.mobile
                  ) : (
                    <i>No phone number provided</i>
                  )}
                </div>
                <div className="table-item table-content table-content-4">
                  <p className="body-sm-regular">
                    {moment(content?.startDateTime).format("D[/]M[/]YYYY")}
                  </p>
                  <p className="body-sm-regular">
                    {moment(content?.startDateTime).format("h[:]mmA")} to{" "}
                    {moment(content?.endDateTime).format("h[:]mmA")}
                  </p>
                </div>
                <div className="table-item table-content table-content-5">
                  <button
                    disabled={!content?.eventData[0]?.meetLink}
                    className="join-btn body-sm-semibold"
                    onClick={() => window.open(content?.eventData[0]?.meetLink)}
                  >
                    Join
                  </button>
                </div>
                <div className="table-item table-content table-content-6">
                  <div key={index}>
                    <p className="label-sm">Purchased at</p>
                    <p className="body-sm-semibold">
                      {!!content?.paymentData[0]?.paymentDate ? (
                        moment(content?.paymentData[0]?.paymentDate).format(
                          "D[/]M[/]YY [at] h[:]mmA"
                        )
                      ) : (
                        <i>--N/A--</i>
                      )}
                    </p>
                  </div>
                  <div key={index}>
                    <p className="label-sm">Total Amount</p>
                    <p className="body-sm-semibold">
                      {!!content?.paymentData[0]?.amount &&
                        new Intl.NumberFormat("en-in", {
                          style: "currency",
                          currency: "INR",
                        }).format(content?.paymentData[0]?.amount / 100)}
                      {!content?.paymentData[0]?.amount && <i>Not Paid</i>}
                    </p>
                  </div>
                </div>
                <div className="table-item table-content table-content-7">
                  {new Date(content?.endDateTime).getTime() <
                    new Date().getTime() && (
                    <div
                      className="status"
                      style={{ backgroundColor: "#0FB800" }}
                    >
                      <IoMdCheckmark
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                    </div>
                  )}
                  {new Date(content?.startDateTime).getTime() <
                    new Date().getTime() &&
                    new Date().getTime() <
                      new Date(content?.endDateTime).getTime() && (
                      <div
                        className="status"
                        style={{ backgroundColor: "blue" }}
                      >
                        <IoVideocam
                          style={{ color: "white", fontSize: "1.5rem" }}
                        />
                      </div>
                    )}
                  {new Date(content?.startDateTime).getTime() >
                    new Date().getTime() && (
                    <div
                      className="status"
                      style={{ backgroundColor: "#FFD600" }}
                    >
                      <IoIosInformationCircleOutline
                        style={{ color: "black", fontSize: "1.5rem" }}
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
