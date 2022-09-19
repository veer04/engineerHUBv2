import '../Members/Members.css'
import girlImg from '../Members/girlimg.png'
function Members() {
  return (
    <>
    <div className="container  mw-100 Memberscontainer">
        
<h1 className='txtMembers'>What our Members think about us</h1>

<p className='memberstext'>Lorem ipsum dolor sit amet,
             consectetur adipiscing elit. At ornare nibh
            malesuada porttitor tristique donec leo.
            adipiscing elit. At ornar porttitor tristique donec leo.</p>
            <div className="cardz cardMember">
            <div className="row">
    
                <div className="col-lg-3">
                <img src={girlImg} alt="" className='girlimage1' />
                </div>
        <div className="col-lg-9 textofMember">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Dolorum expedita optio 
                        aliquam, maxime assumenda quidem perferendis,
                         odio deleniti doloribus eaque ipsam modi, 
                        impedit velit quis magni commodi quas fugiat molestias?
        </div>
    </div>
    <div className="row memberinnertext">
    May 8, 2020
    </div>
</div>


<div className="cardz cardMember1">
            <div className="row">
            <div className="col-lg-9 textofMember order-md-2 order-lg-1 order-sm-2 ">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Dolorum expedita optio 
                        aliquam, maxime assumenda quidem perferendis,
                         odio deleniti doloribus eaque ipsam modi, 
                        impedit velit quis magni commodi quas fugiat molestias?
        </div>
    
                <div className="col-lg-3 girl order-md-1 order-lg-1 order-sm-1 ">
                <img src={girlImg} alt="" className='girlimage ' />
                </div>
    </div>         
    <div className="row memberinnertext1">
    May 8, 2020
    </div>
</div>

<div className="cardz cardMember">
            <div className="row">
    
                <div className="col-lg-3 girl">
                <img src={girlImg} alt="" className='girlimage1' />
                </div>
        <div className="col-lg-9 textofMember">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Dolorum expedita optio 
                        aliquam, maxime assumenda quidem perferendis,
                         odio deleniti doloribus eaque ipsam modi, 
                        impedit velit quis magni commodi quas fugiat molestias?
        </div>
    </div>
    <div className="row memberinnertext">
    May 8, 2020
    </div>
</div>


<div className="cardz cardMember1">
            <div className="row">
            <div className="col-lg-9 textofMember order-md-2 order-lg-1 order-sm-2 order-xs-last">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Dolorum expedita optio 
                        aliquam, maxime assumenda quidem perferendis,
                         odio deleniti doloribus eaque ipsam modi, 
                        impedit velit quis magni commodi quas fugiat molestias?
        </div>
                <div className="col-lg-3 girl order-md-1 order-lg-2 order-sm-1 order-xs-first">
                <img src={girlImg} alt="" className='girlimage' />
                </div>
       
    </div>
    <div className="row memberinnertext1">
    May 8, 2020
    </div>
</div>


    </div>
    
    
    </>
    
  )
}

export default Members