import React from "react";
import {
  Search,
  Briefcase,
  Users,
  Filter,
  FileCheck,
  Mic,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
} from "lucide-react";
import "../PricingPage.css";


export default function PlatformFeatures({ onExploreTalent }) {
  return (
    <section className="platform-features-section">
      <div className="section-title-wrap">
        <div className="section-pill-badge">COMPLETE HIRING SUITE</div>
        <h2 className="section-title">Everything your hiring team needs</h2>
        <p className="section-subtitle">
          From the first candidate search to the final hire.
        </p>
      </div>

      <div className="features-groups-grid">
        {/* GROUP 1: SOURCING */}
        <div className="feature-group-card group-sourcing">
          <div className="group-header">
            <span className="group-category-tag tag-teal">SOURCING</span>
            <h3>Talent Discovery & Job Posting</h3>
          </div>

          <div className="feature-subcards-grid">
            <div className="feature-item-card">
              <div className="feature-icon-box box-teal">
                <Search size={22} />
              </div>
              <h4 className="feature-item-title">Fastest Sourcing</h4>
              <p className="feature-item-desc">
                Access a growing network of 1M+ engineering users and discover
                relevant profiles for your open roles.
              </p>

              {/* <button
                className="btn-feature-link"
                onClick={onExploreTalent}
              >
                Explore Talent <ArrowRight size={14} />
              </button> */}
            </div>

            <div className="feature-item-card">
              <div className="feature-icon-box box-teal">
                <Briefcase size={22} />
              </div>
              <h4 className="feature-item-title">Job & Internship Posting</h4>
              <p className="feature-item-desc">
                Post jobs and internships and reach an active engineering candidate
                network instantly.
              </p>
            </div>
          </div>
        </div>

        {/* GROUP 2: MANAGEMENT & WORKFLOW */}
        <div className="feature-group-card group-management">
          <div className="group-header">
            <span className="group-category-tag tag-blue">MANAGEMENT</span>
            <h3>Integrated Candidate CRM</h3>
          </div>

          <div className="feature-subcards-grid">
            <div className="feature-item-card">
              <div className="feature-icon-box box-blue">
                <Users size={22} />
              </div>
              <h4 className="feature-item-title">Integrated Candidate CRM</h4>
              <p className="feature-item-desc">
                Review applications, shortlist candidates, reject profiles, track
                candidate progress and manage communication from one place.
              </p>
              <div className="crm-bullets-flex">
                <span className="crm-bullet-chip">✓ Review</span>
                <span className="crm-bullet-chip">✓ Shortlist</span>
                <span className="crm-bullet-chip">✓ Reject</span>
                <span className="crm-bullet-chip">✓ Candidate pipeline</span>
                <span className="crm-bullet-chip">✓ Bulk email</span>
              </div>
            </div>

            <div className="feature-item-card">
              <div className="feature-icon-box box-blue">
                <Layers size={22} />
              </div>
              <h4 className="feature-item-title">Hiring Workflow</h4>
              <p className="feature-item-desc">
                Keep your complete candidate journey organised from application to
                final selection.
              </p>
            </div>
          </div>
        </div>

        {/* GROUP 3: AI POWERED (Purple Accent) */}
        <div className="feature-group-card group-ai">
          <div className="group-header">
            <span className="group-category-tag tag-purple">
              <Sparkles size={13} /> AI POWERED
            </span>
            <h3>AI Recruitment Tools</h3>
          </div>

          <div className="feature-subcards-grid grid-3-col">
            <div className="feature-item-card card-ai-accent">
              <div className="feature-icon-box box-purple">
                <Filter size={22} />
              </div>
              <h4 className="feature-item-title">AI Sorting</h4>
              <p className="feature-item-desc">
                Automatically evaluate and rank resumes against your job description,
                skills and hiring criteria.
              </p>
            </div>

            <div className="feature-item-card card-ai-accent">
              <div className="feature-icon-box box-purple">
                <FileCheck size={22} />
              </div>
              <h4 className="feature-item-title">AI Assessment</h4>
              <p className="feature-item-desc">
                Create role-specific assessments and evaluate candidates with
                AI-powered scoring and proctoring.
              </p>
            </div>

            <div className="feature-item-card card-ai-accent">
              <div className="feature-icon-box box-purple">
                <Mic size={22} />
              </div>
              <h4 className="feature-item-title">AI Interview</h4>
              <p className="feature-item-desc">
                Let Sanya conduct dynamic voice-based interviews and evaluate
                candidates across technical and behavioural dimensions.
              </p>
            </div>
          </div>
        </div>

        {/* GROUP 4: INTERVIEWING */}
        <div className="feature-group-card group-interview">
          <div className="group-header">
            <span className="group-category-tag tag-emerald">INTERVIEWS</span>
            <h3>Flexible Interview Execution</h3>
          </div>

          <div className="feature-subcards-grid">
            <div className="feature-item-card">
              <div className="feature-icon-box box-emerald">
                <Calendar size={22} />
              </div>
              <h4 className="feature-item-title">Manual Interview Integration</h4>
              <p className="feature-item-desc">
                Connect your Google account and conduct interviews with calendar and
                email integration for a seamless scheduling experience.
              </p>
            </div>

            <div className="feature-item-card">
              <div className="feature-icon-box box-purple">
                <Mic size={22} />
              </div>
              <h4 className="feature-item-title">Automated AI Interviews (Sanya)</h4>
              <p className="feature-item-desc">
                Scale your first-round interviews 24/7 with zero recruiter scheduling
                overhead.
              </p>
            </div>
          </div>
        </div>
      </div>
{/*     
 
      <div className="workflow-positioning-card">
        <div className="positioning-content-wrap">
          <div className="positioning-badge">FLEXIBLE WORKFLOWS</div>
          <h3 className="positioning-title">
            Use the tools you need, the way you want.
          </h3>
          <p className="positioning-subtitle">
            Manual and AI workflows work together to match your hiring style.
          </p>

          <div className="workflows-dual-comparison">
           
            <div className="workflow-box">
              <div className="workflow-box-title">
                <Clock size={16} /> Hybrid Workflow (Recruiter + AI)
              </div>
              <div className="workflow-flow-steps">
                <span>Post Job</span>
                <ArrowRight size={14} />
                <span>Receive Applications</span>
                <ArrowRight size={14} />
                <span className="step-highlight-ai">AI Sort</span>
                <ArrowRight size={14} />
                <span className="step-highlight-ai">AI Assessment</span>
                <ArrowRight size={14} />
                <span>Manual Interview</span>
              </div>
            </div>

         
            <div className="workflow-box">
              <div className="workflow-box-title">
                <Sparkles size={16} color="#7c3aed" /> Full AI-Accelerated Workflow
              </div>
              <div className="workflow-flow-steps">
                <span>Post Job</span>
                <ArrowRight size={14} />
                <span>Source Candidates</span>
                <ArrowRight size={14} />
                <span className="step-highlight-ai">AI Sort</span>
                <ArrowRight size={14} />
                <span className="step-highlight-ai">AI Assessment</span>
                <ArrowRight size={14} />
                <span className="step-highlight-ai">AI Interview with Sanya</span>
                <ArrowRight size={14} />
                <span className="step-highlight-hire">Hire</span>
              </div>
            </div>
          </div>
        </div> 
        
      </div>
      */}
    </section>
  );
}
