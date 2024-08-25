import React from "react";
import "./termsandconditions.css";
import TermsSidebar from "./TermsSidebar/TermsSidebar";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <>
      <main className="main-terms-div">
        <TermsSidebar />

        <div className="sub-terms-div">
          <div className="terms-of-use">
            <h4 className="use-h4">Terms of use</h4>
            <p className="use-p">
              Your use of engineerHUB&#39;s products, software, services and
              websites (referred to collectively as the “Services” in this
              document) is subject to the terms of a legal agreement between you
              and engineerHUB. Please read the following terms and conditions
              very carefully as your use of services is subject to your
              acceptance of and compliance with the following terms and
              conditions ("Terms").
            </p>
            <p className="use-p">
              By subscribing to or using any of our services, you agree that you
              have read, understood and are bound by the Terms, regardless of
              how you subscribe to or use the services. If you do not want to be
              bound by the Terms, you must not subscribe to or use our services.
            </p>

            <p className="use-p">
              In these Terms, references to "you", "User", “Visitor” shall mean
              the end user accessing the Website, its contents and using the
              Services offered through the Website, and "we", "us" and "our"
              shall mean engineerhub.in and its affiliates.
            </p>
          </div>

          <div className="user-aggrement">
            <h4 className="use-h4">User Aggrement</h4>
            <p className="use-p">
              These Terms of Use govern your use of Services offered through{" "}
              <Link to={" https://engineerhub.in/"} target="_blank">
                <span> https://engineerhub.in/</span>
              </Link>
              (“Site”). You agree to access "the site", subject to the terms and
              conditions of use as set out here. You may not use the Services if
              you do not accept the Terms.
            </p>
            <p className="use-p">
              engineerhub.in may add to or change or update these Terms of Use,
              from time to time entirely at its own discretion. You are
              responsible for checking these Terms of Use periodically to remain
              in compliance with these terms. Your use of a Site after any
              amendment to the Terms of Use shall constitute your acceptance of
              these terms and you also agree to be bound by any such
              changes/revisions.
            </p>
          </div>

          <div className="acceptance-and-terms">
            <h4 className="use-h4">Acceptance of Terms</h4>
            <p className="use-p">
              You can accept the Terms by: <br />
              <ul className="use-ul">
                <li>
                  Clicking to accept or agree to the Terms, where this option is
                  made available to you by engineerHUB in the user interface for
                  any Service.
                </li>
                <li>
                  By actually using the Services. In this case, you understand
                  and agree that engineerHUB will treat your use of the Services
                  as acceptance of the Terms from that point onwards.
                </li>
              </ul>
            </p>
            <p className="use-p">
              You may not use the Services and may not accept the Terms if you
              are not of legal age to form a binding contract with engineerHUB.
              Before you continue, you should print off or save a local copy of
              the Terms for your records.
            </p>
          </div>

          <div className="modification">
            <h4 className="use-h4">Modification</h4>
            <p className="use-p">
              engineerHUB.in reserves the right to suspend/cancel, or
              discontinue any or all channels, products or service at any time
              without notice, make modifications and alterations in any or all
              of the content, products and services contained on the site
              without prior notice. Any such modifications or alterations shall
              be notified at the website and all users must comply with the new
              terms and conditions.
            </p>
            <p className="use-p">
              You understand and agree that if you use the Services after the
              date on which the Terms have changed, engineerHUB will treat your
              use as acceptance of the updated Terms.
            </p>
          </div>

          <div className="registration-access">
            <h4 className="use-h4">
              Registration, Access and Exchange of Information
            </h4>
            <p className="use-p">
              For certain services such as email, personal web pages, etc.
              registration by the visitor is required. To register for these
              services, you have to open an account by completing the
              registration process (i.e. by providing us with current, complete
              and accurate information as prompted by the applicable
              registration form). You will also choose a password and username
              which will be your email id. You are entirely responsible for
              maintaining the confidentiality of your password and account. By
              registering, you agree to the following terms in addition to any
              other specific terms which shall be posted at an appropriate
              location of the Site.
            </p>

            <p className="use-p">
              To access these services, you will be asked to enter your User
              Name and Password, as chosen by you during your registration.
              Therefore, we do not permit any of the following:- <br />
              <ul className="use-ul">
                <li>Any other person sharing your account and Password;</li>
                <li>
                  Any part of the Site being cached in proxy servers and
                  accessed by individuals who have not registered with
                  engineerhub.in as users of the Site; or
                </li>
                <li>
                  Access through a single account and Password being made
                  available to multiple users on a network.
                </li>
              </ul>
            </p>
            <p className="use-p">
              Furthermore, you are entirely responsible for any and all
              activities that occur under your account. You agree to notify
              engineerHUB.in immediately of any unauthorized use of your account
              or any other breach of security. engineerHUB.in will not be liable
              for any loss that you may incur as a result of someone else using
              your password or account. However, you could be held liable for
              losses incurred by engineerHUB.in or another party due to someone
              else using your account or password.
            </p>
          </div>

          <div className="passwords-and-acc-security">
            <h4 className="use-h4">Your passwords and account security</h4>
            <p className="use-p">
              You agree and understand that you are responsible for maintaining
              the confidentiality of passwords associated with any account you
              use to access the Services. Accordingly, you agree that you will
              be solely responsible to engineerHUB for all activities that occur
              under your account.If you become aware of any unauthorized use of
              your password or of your account, you agree to notify engineerHUB
              immediately at info@engineerhub.in
            </p>
          </div>

          <div className="privacy-policy-div">
            <h4 className="use-h4">Privacy Policy</h4>
            <p className="use-p">
              The User hereby consents, expresses and agrees that he/she has
              read and fully understands the Privacy Policy of enigneerhub.in in
              respect of the Website. The user further consents that the terms
              and contents of such Privacy Policy are acceptable to him.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Advertising Material</h4>
            <p className="use-p">
              Part of the Site contains advertising information or promotion
              material or other material submitted to engineerHUB by third
              parties. Responsibility for ensuring that material submitted for
              inclusion on engineerHUB complies with applicable international
              and national law is exclusively on the party providing the
              information/material. Your correspondence or business dealings
              with, or participation in promotions of, advertisers other than
              engineerhub.in found on or through the Website, including payment
              and delivery of related goods or services, and any other terms,
              conditions, warranties or representations associated with such
              dealings, are solely between you and such advertiser. We will not
              be responsible or liable for any claim, error, omission,
              inaccuracy in advertising material or any loss or damage of any
              sort incurred as the result of any such dealings or as the result
              of the presence of such advertisers on the Website. engineerHUB
              reserves the right to omit, suspend or change the position of any
              advertising material submitted for insertion. Acceptance of
              advertisements on the Site will be subject to these terms and
              conditions.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Cookies</h4>
            <p className="use-p">
              We employ the use of cookies. By accessing engineerHUB, you agreed
              to use cookies in agreement with the Campus Engineerhub Private
              Limited&#39;s Privacy Policy.
              <br />
              Most interactive websites use cookies to let us retrieve the
              user's details for each visit. Cookies are used by our website to
              enable the functionality of certain areas to make it easier for
              people visiting our website. Some of our affiliate/advertising
              partners may also use cookies.nt with the Campus Engineerhub
              Private Limited&#39;s Privacy Policy. Most interactive websites
              use cookies to let us retrieve the user's details for each visit.
              Cookies are used by our website to enable the functionality of
              certain areas to make it easier for people visiting our website.
              Some of our affiliate/advertising partners may also use cookies.
            </p>
          </div>

          <div className="user-conduct-and-rules">
            <h4 className="use-h4">User Conduct and rules</h4>
            <p className="use-p">
              You agree and undertake to use the Website and the Service only to
              post and upload messages and material that are proper. By way of
              example, and not as a limitation, you agree and undertake that
              when using a Service, you will not:
              <br />
              <ul className="use-ul">
                <li>
                  Defame, abuse, harass, stalk, threaten or otherwise violate
                  the legal rights of others;
                </li>
                <li>
                  Publish, post, upload, distribute or disseminate any
                  inappropriate, profane, defamatory, infringing, obscene,
                  indecent or unlawful topic, name, material or information;
                </li>
                <li>
                  Upload files that contain software or other material protected
                  by intellectual property laws unless you own or control the
                  rights thereto or have received all necessary consents;
                </li>
                <li>
                  Upload or distribute files that contain viruses, corrupted
                  files, or any other similar software or programs that may
                  damage the operation of the Website or another's computer;
                </li>
                <li>
                  Conduct or forward surveys, contests, pyramid schemes, digital
                  products, documents or chain letters;
                </li>
                <li>
                  Download any file posted by another user of a Service that you
                  know, or reasonably should know, cannot be legally distributed
                  in such manner;
                </li>
                <li>
                  Falsify or delete any author attributions, legal or other
                  proper notices or proprietary designations or labels of the
                  origin or source of software or other material contained in a
                  file that is uploaded;
                </li>
                <li>
                  Violate any code of conduct or other guidelines, which may be
                  applicable for or to any particular Service;
                </li>
                <li>
                  Violate any applicable laws or regulations for the time being
                  in force in or outside India; and
                </li>
              </ul>
            </p>

            <p className="use-p">
              Violate any of the terms and conditions of this Agreement or any
              other terms and conditions for the use of the Website contained
              elsewhere herein.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">User Warranty and representation</h4>
            <p className="use-p">
              The user guarantees, warrants, and certifies that you are the
              owner of the content which you submit or otherwise authorized to
              use the content and that the content does not infringe upon the
              property rights, intellectual property rights or other rights of
              others. You further warrant that to your knowledge, no action,
              suit, proceeding, or investigation has been instituted or
              threatened relating to any content, including trademark, trade
              name service mark, and copyright formerly or currently used by you
              in connection with the Services rendered by engineerHUB.in.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">License</h4>
            <p className="use-p">
              You must not:
              <br />
              <ul className="use-ul">
                <li>Republish material from engineerHUB</li>
                <li>Sell, rent or sub-license material from engineerHUB</li>
                <li>Reproduce, duplicate or copy material from engineerHUB</li>
                <li>Redistribute content from engineerHUB</li>
              </ul>
            </p>

            <p className="use-p">
              This Agreement shall begin on the date hereof. <br />
              Parts of this website offer an opportunity for users to post and
              exchange opinions and information in certain areas of the website.
              Campus Engineerhub Private Limited does not filter, edit, publish
              or review Comments prior to their presence on the website.
              Comments do not reflect the views and opinions of Campus
              Engineerhub Private Limited,its agents and/or affiliates. Comments
              reflect the views and opinions of the person who post their views
              and opinions. To the extent permitted by applicable laws, Campus
              Engineerhub Private Limited shall not be liable for the Comments
              or for any liability, damages or expenses caused and/or suffered
              as a result of any use of and/or posting of and/or appearance of
              the Comments on this website. <br />
              Campus Engineerhub Private Limited reserves the right to monitor
              all Comments and to remove any Comments which can be considered
              inappropriate, offensive or causes breach of these Terms and
              Conditions.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Termination and Access Restriction</h4>
            <p className="use-p">
              engineerhub.in reserves the right, in its sole discretion, to
              terminate the access to the website and the related services or
              any portion thereof at any time, without notice.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Fee Payments</h4>
            <p className="use-p">
              enigneerhub.in reserves the right to charge
              listing/advertising/product usage fees as well as transaction fees
              based on certain completed transactions using the engineerhub.in
              Services. engineerhub.in further reserves the right to alter any
              and all fees from time to time, without notice. The User shall be
              liable to pay all applicable charges, fees, duties, taxes, levies
              and assessments for availing the engineerhub.in Services.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Delivery of services</h4>
            <p className="use-p">
              All our services are online. No physical delivery will be carried
              out for any of the services purchased. Users will get an email
              once a service is purchased with instructions on how to go about
              availing them on the website. Our team of experts will assist you
              in providing a hassle free user experience.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Cancellation/Refund Policy</h4>
            <p className="use-p">
              All sales/purchase of services are final with no refund or
              exchange permitted. However, if in a transaction performed by you
              on the site, money has been charged to your card or bank account
              without the delivery of the services, then you may inform us by
              sending an email to info@engineerhub.in or an email address
              mentioned on the Contact Us page. engineerhub.in shall investigate
              the incident and if it is found that money was indeed charged to
              your card or bank account without delivery of the service, then
              you will be refunded the money within 21 working days from the
              date of receipt of your email. All refunds will be credited back
              to the source of the payment after deducting the service charges
              and taxes(if applicable). It will take 3-21 days for the money to
              show in your bank account depending on your bank&#39;s policy.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">
              Disclaimer of Warranties/Limitation of Liability
            </h4>
            <p className="use-p">
              engineerhub.in has endeavored to ensure that all the information
              on the Website is correct, but engineerhub.in neither warrants nor
              makes any representations regarding the quality, accuracy or
              completeness of any data, information, product or Service. In no
              event shall engineerhub.in be liable for any direct, indirect,
              punitive, incidental, special, consequential damages or any other
              damages resulting from <br />
              <ul className="use-ul">
                <li>the use or the inability to use the Services;</li>
                <li>
                  unauthorized access to or alteration of the user's
                  transmissions or data;
                </li>
              </ul>
            </p>

            <p className="use-p">
              any other matter related to the services; including, without
              limitation, damages for loss of use, data or profits, arising out
              of or in any way connected with the use or performance of the
              website or service. Neither shall engineerhub.in be responsible
              for the delay or inability to use the website or related services,
              the provision of or failure to provide services, or for any
              information, software, products, services and related graphics
              obtained through the website, or otherwise arising out of the use
              of the website, whether based on contract, tort, negligence,
              strict liability or otherwise. Further, engineerhub.in shall not
              be held responsible for non-availability of the Website during
              periodic maintenance operations or any unplanned suspension of
              access to the website that may occur due to technical reasons or
              for any reason beyond engineerhub.in&#39;s control. The user
              understands and agrees that any material and/or data downloaded or
              otherwise obtained through the website is done entirely at their
              own discretion and risk and they will be solely responsible for
              any damage to their computer systems or loss of data that results
              from the download of such material and/or data.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Indemnification</h4>
            <p className="use-p">
              You agree to indemnify, defend and hold harmless engineerhub.in
              from and against any and all losses, liabilities, claims, damages,
              costs and expenses (including legal fees and disbursements in
              connection therewith and interest chargeable thereon) asserted
              against or incurred by engineerhub.in that arise out of, result
              from, or may be payable by virtue of, any breach or
              non-performance of any representation, warranty, covenant or
              agreement made or obligation to be performed by you pursuant to
              these Terms and for all the activities that occur through your
              account.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Governing Law</h4>
            <p className="use-p">
              These terms shall be governed by and constructed in accordance
              with the laws of India without reference to conflict of laws
              principles and disputes arising in relation hereto shall be
              subject to the exclusive jurisdiction of the courts at Uttar
              Pradesh.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Severability</h4>
            <p className="use-p">
              If any provision of the Terms is determined to be invalid or
              unenforceable in whole or in part, such invalidity or
              unenforceability shall attach only to such provision or part of
              such provision and the remaining part of such provision and all
              other provisions of these Terms shall continue to be in full force
              and effect.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Report Abuse</h4>
            <p className="use-p">
              As per these Terms, users are solely responsible for every
              material or content uploaded on to the website. engineerhub.in
              does not verify, endorse or otherwise vouch for the contents of
              any user or any content generally posted or uploaded on to the
              website. Users can be held legally liable for their contents and
              may be held legally accountable if their contents or material
              include, for example, defamatory comments or material protected by
              copyright, trademark, etc. If you come across any abuse or
              violation of these Terms, please report to info@engineerhub.in
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">Forum Rules</h4>
            <p className="use-p">
              Registration to the forum under engineerhub.in is free. We do
              insist that you abide by the rules and policies detailed below.
              Although the administrators and moderators of engineerhub.in will
              attempt to keep all objectionable messages off this forum, it is
              impossible for us to review all messages. All messages express the
              views of the author, engineerhub.in will not be held responsible
              for the content of any message.
            </p>
            <p className="use-p">
              By agreeing to these rules, you warrant that you will not post any
              messages that are obscene, vulgar, sexually-oriented, hateful,
              threatening, or otherwise violative of any laws.
            </p>
            <p className="use-p">
              engineerhub.in reserves the right to remove, edit, move or close
              any thread for any reason. <br />
              You agree that engineerHUB may provide you with notices, including
              those regarding changes to the Terms, by email, regular mail, or
              postings on the Services.
            </p>
          </div>

          <div className="advertising-material">
            <h4 className="use-h4">
              Ending your relationship with engineerHUB.in
            </h4>
            <p className="use-p">
              The Terms will continue to apply until terminated by either you or
              engineerHUB as set out below. If you want to terminate your legal
              agreement with engineerHUB, you may do so by (a) notifying
              engineerHUB at any time and (b) closing your accounts for all of
              the Services which you use, where engineerHUB has made this option
              available to you. Your notice should be sent, in writing, to
              engineerHUB&#39;s address which is set out at the beginning of
              these Terms. <br />
              engineerHUB may at any time, terminate its legal agreement with
              you if:
            </p>

            <p className="use-p">
              <ul className="use-ul">
                <li>
                  you have breached any provision of the Terms (or have acted in
                  manner which clearly shows that you do not intend to, or are
                  unable to comply with the provisions of the Terms); or
                </li>
                <li>
                  engineerHUB is required to do so by law (for example, where
                  the provision of the Services to you is, or becomes,
                  unlawful); or
                </li>
                <li>
                  the partner with whom engineerHUB offered the Services to you
                  has terminated its relationship with engineerHUB or ceased to
                  offer the Services to you; or
                </li>
                <li>
                  the provision of the Services to you by engineerHUB is, in
                  engineerHUB&#39;s opinion, no longer commercially viable. When
                  these Terms come to an end, all of the legal rights,
                  obligations and liabilities that you and engineerHUB have
                  benefited from, been subject to (or which have accrued over
                  time whilst the Terms have been in force) or which are
                  expressed to continue indefinitely, shall be unaffected by
                  this cessation, and the provisions of Indemnification and
                  Governing Law shall continue to apply to such rights,
                  obligations and liabilities indefinitely.
                </li>{" "}
              </ul>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default TermsAndConditions;
