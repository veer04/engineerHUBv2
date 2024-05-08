import React, { useEffect, useState } from "react";
// import SiliconValley from "../../assets/siliconValley.png";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
import "./NewSiliconValley.css";
// import SiliconValley from "./SiliconValley.png";
// import girishMain from "./girishMain.png";
// import girishLogo from "./girishLogo.png";
// import manishMain from "./manishMain.png";
// import ratneshMain from "./ratneshMain.png";
import SiliconValleyCard from "../../components/SiliconValleyCard/SiliconValleyCard";
import { Bucket_URL } from "../../services/APIUtils";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const cards = [
//   {
//     logo: "https://example.com/logo1.png",
//     image:
//       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/alumni/64ae9a4d6dc6d78031fe13551706469924798.jpg",
//     name: "Girish Shedge",
//     position: "Design Lead @eHUB",
//     backgroundColor: "#D6F3BF",
//   },
//   {
//     logo: "https://example.com/logo2.png",
//     image:
//       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/alumni/64ae9a4d6dc6d78031fe13551706469924798.jpg",
//     name: "Manish Kumar",
//     position: "Frontend Dev @eHUB",
//     backgroundColor: "#C0E0F2",
//   },
//   {
//     logo: "https://example.com/logo3.png",
//     image:
//       "https://frontendehubbucket.s3.ap-south-1.amazonaws.com/backend/role/alumni/64ae9a4d6dc6d78031fe13551706469924798.jpg",
//     name: "Ratnesh Maurya",
//     position: "Designer @eHUB",
//     backgroundColor: "#FAE8B7",
//   },
// ];

// const NewSiliconValley = ({ logo, image, name, position, backgroundColor }) => {
//   const cardStyle = {
//     margin: "28px",
//     width: "25%",
//     background: backgroundColor,
//     padding: "15px",
//     borderRadius: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   };

//   const mediaStyle = {
//     height: "260px",
//     width: "100%",
//     marginBottom: "16px",
//     borderRadius: "2%",
//     objectFit: "cover",
//   };

//   const contentBoxStyle = {
//     background: "#fff",
//     padding: "5px",
//     borderRadius: "20px",
//     textAlign: "center",
//     width: "100%",
//   };

//   const contentStyle = {
//     color: "#000",
//     margin: "0",
//   };

//   const logoStyle = {
//     height: "50px",
//     width: "50px",
//     borderRadius: "50%",
//     objectFit: "cover",
//     marginBottom: "8px",
//   };

//   return (
//     <div style={cardStyle}>
//       <img src={image} alt={name} style={mediaStyle} />
//       <div style={contentBoxStyle}>
//         <div className="row">
//           <div className="col-2">
//             <img src={logo} alt="Logo" style={logoStyle} />
//           </div>
//           <div className="col-10">
//             <h4 style={contentStyle}>{name}</h4>
//             <p style={contentStyle}>{position}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const NewSiliconValley = () => {
  // const [index, setIndex] = useState(0);

  // const handleChangeIndex = (newIndex) => {
  //   setIndex(newIndex);
  // };

  // const mobileStyles = {
  //   flexDirection: "column",
  //   width: "100%",
  // };

  // const centeringStyles = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // };

  // const getWindowWidth = () =>
  //   window.innerWidth ||
  //   document.documentElement.clientWidth ||
  //   document.body.clientWidth;

  // const showCardsCount = () => {
  //   const width = getWindowWidth();

  //   if (width > 980) {
  //     return 3;
  //   } else if (width >= 600 && width <= 980) {
  //     return 2;
  //   } else {
  //     return 1;
  //   }
  // };

  // get the current month
  const bucket = `${Bucket_URL}frontend/homepage/siliconvalleystreet/`
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });

  const dummyData = [
    {
      _id: "1",
      name: "Kunwar Vidya Niwas",
      title: "Content Head @engineerHUB",
      image: `${bucket}kunwar.png`,
      logo: `${bucket}kunwar.png`,
    },
    {
      _id: "2",
      name: "Swapnil Raj",
      title: "Frontend Dev @engineerHUB",
      image: `${bucket}swapnil.png`,
      logo: `${bucket}swapnil.png`,
    },
    {
      _id: "3",
      name: "Vinit Pundeer",
      title: "Backend Dev @engineerHUB",
      image: `${bucket}vinit.png`,
      logo: `${bucket}vinit.png`,
    },
  ];

  const [data, setData] = useState(dummyData);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width >= 1200) {
      setData(dummyData);
    }
    if (width < 1185) {
      setData(dummyData.slice(0, 2));
    }
    if (width < 790) {
      setData(dummyData.slice(0, 1));
    }
  }, [width]);

  const colors = ["#D6F3BF", "#C0E0F2", "#FAE8B7"];

  return (
    <section id="silicon-valley">
      <div
        style={{
          backgroundImage: `url(${bucket}silicon_valley_street.png)`,
        }}
        className="box"
      >
        <div className="heading">
          <div className="time">{month} 2024</div>
          <h2>"Silicon Valley Street"</h2>
          <h3>
            Featuring personalities for their outstanding performance and
            contribution to the community.
          </h3>
        </div>
        <div className="content">
          {data.map((item, index) => (
            <SiliconValleyCard
              key={item._id}
              data={item}
              color={colors[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );

  // return (
  //   <div className="mainContainer">
  //     <div
  //       className="container"
  //       style={{
  //         backgroundImage: `url(${SiliconValley})`,
  //         backgroundRepeat: "no-repeat",
  //         backgroundPosition: "center",
  //         backgroundSize: "100% 100%",
  //         padding: "20px",
  //         minHeight: "100vh",
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //       }}
  //     >
  //       {getWindowWidth() > 980 ? (
  //         <div style={{ ...centeringStyles, flexWrap: "wrap" }}>
  //           {cards.slice(1, 3).map((card, i) => (
  //             <NewSiliconValley key={i} {...card} />
  //           ))}
  //         </div>
  //       ) : (
  //         <div
  //           style={{
  //             ...centeringStyles,
  //             ...(getWindowWidth() > 600 && mobileStyles),
  //           }}
  //         >
  //           <AutoPlaySwipeableViews
  //             style={{ width: "100%" }}
  //             interval={5000}
  //             index={index}
  //             onChangeIndex={handleChangeIndex}
  //           >
  //             {cards.slice(1, 3).map((card, i) => (
  //               <NewSiliconValley key={i} {...card} />
  //             ))}
  //           </AutoPlaySwipeableViews>
  //         </div>
  //       )}
  //       <div className="row">
  //       {getWindowWidth() <= 800 && (
  //         <div
  //         className="col-4"
  //           style={{
  //             ...centeringStyles,
  //             overflowX: "scroll",
  //             whiteSpace: "nowrap",
  //             marginTop: "20px",
  //           }}
  //         >
  //           {cards.slice(1, 3).map((card, i) => (
  //             <NewSiliconValley key={i} {...card} />
  //           ))}
  //         </div>
  //       )}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default NewSiliconValley;
