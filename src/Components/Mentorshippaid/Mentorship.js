import './Mentorship.css';
import Thumb from "./ithumb.jpg";
const Mentorship =()=>
{
    return (
        <>
        <div className="mentorshipOne">
            <div className="headtextmentor heading">
            1 to 1 Mentorship Program
            </div>
            <div className="headtextdata texthire">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                 Illo assumenda officia est impedit dolorem veritatis. 
                 Commodi blanditiis eos ducimus autem tempora,
                 aliquam est incidunt sit adipisci neque, ipsum iure repellat.
            </div>
            <div className="mentorBanner">
                <img src={Thumb} alt="" className="BannerImage" />
            </div>
            <div className="mentorPlan">
                <p className='headingMentorCard'>Choose a plan</p>
            </div>
            <div className="mentorPlantxt mentorPlantext">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, numquam repellat  </p>
            </div>
            <div className="mentorPlancard row">
                
                <div className="col-lg-3 plan1 mt-5">
                    <p className='headingOfCard'>SILVER</p>
                    <div className="priceTag">
                        <sub>/month</sub> <p className='priceSilver'>99</p> <sup>₹</sup>
                    </div>
                    <div className="descp">Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
                    <hr className='horizontal-rule'/>
                    <div className="listElementCard">
                        <ul>
                            <li className='priceCardlist'>
                                element1
                            </li>
                            <li className='priceCardlist'>
                                element2
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 plan2">
                <p className='headingOfCard'>GOLD</p>
                    <div className="priceTag">
                        <sub>/month</sub> <p className='priceSilver'>499</p> <sup>₹</sup>
                    </div>
                    <div className="descp">Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
                    <hr className='horizontal-rule'/>
                    <div className="listElementCard">
                        <ul>
                            <li className='priceCardlist'>
                                element1
                            </li>
                            <li className='priceCardlist'>
                                element2
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 plan3 mt-5">
                <p className='headingOfCard'>PLATINUM</p>
                    <div className="priceTag">
                        <sub>/month</sub> <p className='priceSilver'>999</p> <sup>₹</sup>
                    </div>
                    <div className="descp">Lorem ipsum dolor sit amet consectetur adipisicing elit. </div>
                    <hr className='horizontal-rule'/>
                    <div className="listElementCard">
                        <ul>
                            <li className='priceCardlist'>
                                element1
                            </li>
                            <li className='priceCardlist'>
                                element2
                            </li>
                        </ul>
                    </div>
                </div>

              <div className="applyButtonForthePlan">
              Fill the given form, our team will contact you :)
              </div>  
            <div className="descForm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores 
            </div>
            </div>
        </div>
        </>


    );
}
export default Mentorship;