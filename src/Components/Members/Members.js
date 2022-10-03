import "../Members/Members.css";
import Img4 from "../shared/ProfilePic/pic2.png";
import Img3 from "../shared/ProfilePic/pic3.png";
import Img2 from "../shared/ProfilePic/pic4.png";
import Img1 from "../shared/ProfilePic/pic5.png";

function Members() {
  return (
    <>
      <div className="container mw-100 Memberscontainer">
        <h1 className="txtMembers">What our Members think about us</h1>

        <p className="memberstext">
          engineerhub is one of the fastest growing communities providing
          students ample verified resources & materials.{" "}
        </p>
        <div className="cardz cardMember">
          <div className="row">
            <div className="col-lg-3">
              <img src={Img1} alt="" className="girlimage1" />
              <div className="row namePosition">
                Manish KR
              </div>
            </div>
            <div className="col-lg-9 textofMember">
              "The extreme efforts & hard work of each member of the community is
              appreciable. They have outgrown themselves in such a short period."
            </div>
            <div style={{color:"white", textAlign:"right"}}>Manish Kumar</div>
          </div>
          <div className="row memberinnertext">May 8, 2020</div>
        </div>

        <div className="cardz cardMember1 desk-tab--view">
          <div className="row">
            <div className="col-lg-9 textofMember order-md-2 order-lg-1 order-sm-2 ">
              "The community provides updated content & authorized resources to
              benefit students with various courses to brush up their skills."
            </div>
            <div className="col-lg-3 girl order-md-1 order-lg-1 order-sm-1 ">
              <img src={Img2} alt="" className="girlimage " />
              <div className="row namePosition1">
                Rahul KM
              </div>
            </div>
          </div>
          
          <div className="row memberinnertext1">May 18, 2020</div>
        </div>

        <div className="cardz cardMember">
          <div className="row">
            <div className="col-lg-3 girl">
              <img src={Img3} alt="" className="girlimage1" />
              <div className="row namePosition">
                Swapnil Raj
              </div>
            </div>
            <div className="col-lg-9 textofMember">
              "The "Weekend with Us" Program organised by the company provides a
              framework for the students to help them prepare for the
              placements."
            </div>
            <div style={{color:"white", textAlign:"right"}}>Swapnil Raj</div>
          </div>
          <div className="row memberinnertext">May 8, 2020</div>
        </div>

        <div className="cardz cardMember1 desk-tab--view">
          <div className="row">
            <div className="col-lg-9 textofMember order-md-2 order-lg-1 order-sm-2 order-xs-last">
              " engineerhub is an ideal platform to receive all the major
              resources, courses & guidance a student demands during his
              preparation. Its strategic framework & structure is phenomenal."
            </div>
            <div className="col-lg-3 girl order-md-1 order-lg-2 order-sm-1 order-xs-first">
              <img src={Img4} alt="" className="girlimage"  />
              <div className="row namePosition1">
                Aditi JS
              </div>
            </div>
          </div>
          <div className="row memberinnertext1">June 12, 2020</div>
        </div>
      </div>
    </>
  );
}

export default Members;