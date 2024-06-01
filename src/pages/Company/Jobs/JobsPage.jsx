import { useState } from "react";
import FormInputAutocomplete from "../../../components/FormInputs/FormInputAutocomplete";
import "./JobsPage.css";
import { useSearchParams } from "react-router-dom";

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams({ search: "" });
  const q = searchParams.get("search");

  return (
    <main className="jobs-page">
      <h1 className="display-md">Job Hiring</h1>
      <h2 className="body-md-regular">
        Apply for the jobs of your interest and get the offer letter in the next
        step
      </h2>
      <div>
        <input
          type="text"
          id="search-box-ehub"
          placeholder="Search"
          aria-label="Search Term"
          aria-describedby="basic-addon2"
          value={q}
          onChange={(e) => {
            setSearchParams(
              (prev) => {
                prev.set("search", e.target.value);
                return prev;
              },
              { replace: true }
            );
          }}
        />
      </div>
    </main>
  );
}
