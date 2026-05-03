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
import { FiExternalLink } from "react-icons/fi";
import DownloadButton from "./DownloadButton";

export default function DigitalProductAdminPage() {
  if (!isUserLoggedIn()) return <Page404 />;
  const allowedEmailIds = [
    "raj.swapnil1708@gmail.com",
    "career@engineerhub.in",
  ];
  if (!allowedEmailIds.includes(getUserEmail().toLowerCase()))
    return <Page404 />;
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

  const query = useQuery({
    queryKey: [
      "admin",
      "digitalProduct",
      !!params.pageNo ? params.pageNo : 1,
      !!params.limit ? params.limit : 10,
    ],
    queryFn: () =>
      axios
        .get(
          `${PAYMENT_API_URL}payment/admin/course-payment-records?page=${params.pageNo}&limit=${params.limit}`,
          config
        )
        .then((res) => {
          return res;
        }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (!pageNo || !limit) {
      navigate("/admin/digital-products?pageNo=1&limit=30");
    }
  }, []);

  useEffect(() => {
    if (query.isSuccess) {
      setPageCount(
        Math.ceil(
          (!!query.data?.data?.data?.totalRecords
            ? query.data?.data?.data?.totalRecords
            : 1) / (!!limit ? limit : query.data?.data?.data?.records?.length)
        )
      );
    }
  }, [query]);

  return (
    <main className="referral-admin-page digital-product-admin-page">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Digital Products | Admin Panel</title>
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
              navigate(
                `/admin/digital-products?pageNo=1&limit=${e.target.value}`
              );
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
          <p className="text">results for</p>
          <div className="switch-options">
            <button
              onClick={() => navigate("/admin/referrals?pageNo=1&limit=30")}
              className="option"
            >
              Referrals
            </button>
            <button
              onClick={() =>
                navigate("/admin/digital-products?pageNo=1&limit=30")
              }
              className="option --selected"
            >
              Digital Products
            </button>
          </div>
        </div>
        <div className="referral-table">
          <div className="table-item table-headers body-sm-regular">
            Product Name
          </div>
          <div className="table-item table-headers body-sm-regular">Name</div>
          <div className="table-item table-headers body-sm-regular">
            Phone Number
          </div>
          <div className="table-item table-headers body-sm-regular">
            Actions
          </div>
          <div className="table-item table-headers body-sm-regular">
            Purchase Details
          </div>
          <div className="table-item table-headers body-sm-regular">
            Process Status
          </div>
          {query.isPending && (
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
          {query.isSuccess &&
            query.data.data.data.records.map((content, index) => (
              <Fragment key={index}>
                <p className="table-item table-content body-md-semibold">
                  {content?.productData[0]?.title}
                </p>
                <div className="table-item table-content table-content-2">
                  <p className="body-sm-semibold">
                    {content?.name ? content?.name : <i>No name provided</i>}
                  </p>
                  <p className="label-sm">
                    {content?.email ? content?.email : <i>No email provided</i>}
                  </p>
                </div>
                <div className="table-item table-content body-sm-semibold">
                  {content?.mobile ? (
                    content?.mobile
                  ) : (
                    <i>No phone number provided</i>
                  )}
                </div>
                <div className="table-item table-content table-content-5">
                  <button
                    className="join-btn view-btn body-sm-semibold"
                    onClick={() =>
                      window.open(content?.productData[0]?.coursePdf)
                    }
                  >
                    View <FiExternalLink style={{ fontSize: "1rem" }} />
                  </button>
                  <DownloadButton data={content} />
                </div>
                <div className="table-item table-content table-content-6">
                  <div key={index}>
                    <p className="label-sm">Purchased at</p>
                    <p className="body-sm-semibold">
                      {!!content?.paymentData[0]?.paymentDate ? (
                        moment(content?.paymentData[0]?.paymentDate).format(
                          "D[/]M[/]YY [at] h[:]mmA"
                        )
                      ) : !!content?.updatedAt ? (
                        moment(content?.updatedAt).format(
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
                      {!!content?.paymentData[0]?.amount ? (
                        new Intl.NumberFormat("en-in", {
                          style: "currency",
                          currency: "INR",
                        }).format(content?.paymentData[0]?.amount / 100)
                      ) : content?.isPaymentPaid ? (
                        "Free"
                      ) : (
                        <i>Not Paid</i>
                      )}
                    </p>
                  </div>
                </div>
                <div className="table-item table-content table-content-7">
                  {content?.status === "confirmed" && (
                    <div
                      className="status"
                      style={{ backgroundColor: "#0FB800" }}
                    >
                      <IoMdCheckmark
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
