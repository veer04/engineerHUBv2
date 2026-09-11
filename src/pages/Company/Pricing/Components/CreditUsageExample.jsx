import React from "react";
import { HelpCircle } from "lucide-react";

export default function CreditUsageExample({ examples }) {
  return (
    <section className="educational-section">
      <div className="section-title-wrap">
        <h2 className="section-title">How far can your credits go?</h2>
        <p className="section-subtitle">
          Here are a few example scenarios illustrating how many candidate evaluations a single credit pool delivers.
        </p>
      </div>

      <div className="examples-grid">
        {examples.map((item, idx) => (
          <div key={idx} className="example-card">
            <div className="example-card-header">
              <div className="example-credit-title">
                {item.credits.toLocaleString()} AI Credits
              </div>
              <span className="example-credit-tag">Example usage</span>
            </div>

            <div className="example-options-list">
              {item.options.map((opt, oIdx) => (
                <div key={oIdx} className="example-option-row">
                  <span className="example-opt-lbl">≈ {opt.label}</span>
                  <span className="example-opt-count">{opt.count}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
