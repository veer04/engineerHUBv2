import React from "react";
import "../PricingPage.css";


export default function PlanComparison({ matrix }) {
  return (
    <section className="comparison-section">
      <div className="section-title-wrap">
        <h2 className="section-title">Compare plans</h2>
        <p className="section-subtitle">
          Detailed feature breakdown across all subscription tiers.
        </p>
      </div>

      <div className="table-responsive-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{ width: "40%", textAlign: "left" }}>Feature / Capability</th>
              <th style={{ textAlign: "center", width: "20%" }}>Free ($0)</th>
              <th style={{ textAlign: "center", width: "20%" }} className="th-highlight-starter">
                Starter ($19/mo) <span className="th-rec-badge">RECOMMENDED</span>
              </th>
              <th style={{ textAlign: "center", width: "20%" }}>Professional ($49/mo)</th>
            </tr>
          </thead>
          <tbody>
            {matrix.categories.map((cat, cIdx) => (
              <React.Fragment key={cIdx}>
                <tr className="category-header-row">
                  <td colSpan={4}>{cat.name}</td>
                </tr>
                {cat.rows.map((r, rIdx) => (
                  <tr key={rIdx} className="comparison-body-row">
                    <td className="feature-cell">{r.feature}</td>
                    <td className="val-cell">{r.free}</td>
                    <td className="val-cell val-cell-starter">{r.starter}</td>
                    <td className="val-cell val-cell-pro">{r.pro}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
