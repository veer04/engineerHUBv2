import React from "react";
import "./BlogWindow.css";
import { RxCross1 } from "react-icons/rx";

export default function BlogWindow({ setIsProjectOpen }) {
  return (
    <div className="project__window">
      <div className="project__window__title blog__window__title">
        <div className="detail">
          <div className="title">Weather App Project</div>
        </div>
        <div onClick={() => setIsProjectOpen(false)} className="link">
          <RxCross1 />
        </div>
      </div>
      <div
        style={{
          //   backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "15rem",
          backgroundColor: "var(--main-background-color)",
          border: "1px solid lightgrey",
          borderRadius: ".5rem",
        }}
        className="project_window__poster"
      ></div>
      <div className="project__window__description">
        {/* <div className="heading">Description</div> */}
        <div className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          quibusdam iusto nam, est veniam ab id, repellendus nulla rerum
          perspiciatis impedit minus porro reprehenderit illum autem deleniti
          fugit ducimus nihil amet? Dolore corrupti atque eius ullam distinctio
          aspernatur magnam adipisci inventore aut, consequuntur deleniti quae
          voluptatibus laborum blanditiis cum et dolores laudantium modi,
          excepturi dolorem quas voluptatum. Neque qui quibusdam dolorum
          explicabo perspiciatis nostrum quasi autem enim, ea illo at natus sunt
          eligendi, commodi eos dolor, consectetur beatae incidunt unde nihil?
          Quaerat, blanditiis et? Consequuntur consectetur commodi quam
          molestias praesentium rerum, animi perspiciatis ea nostrum. Nulla
          eligendi cumque ipsum similique doloribus alias delectus dolorem et
          est reiciendis dolorum tenetur sapiente dolores deserunt, perferendis
          minus unde, necessitatibus quam eaque! Incidunt reprehenderit vel quia
          praesentium soluta fugit nobis, consequuntur sint quos aspernatur,
          iste assumenda quidem suscipit repudiandae exercitationem, eum cum ut
          impedit tempora. Sint laudantium perferendis, minus laborum iure
          delectus qui numquam magnam incidunt! Voluptatibus ea dolore hic
          excepturi! Porro aut mollitia ad delectus, veniam fugit nesciunt
          ducimus dolores earum! Minima quos atque id, corrupti cumque velit
          eveniet magni aliquid placeat ea quis, eos ipsam harum hic, neque
          quidem sit non natus praesentium? Aliquid fugiat beatae ex voluptate
          amet mollitia ut veniam!
        </div>
      </div>
      <div className="blog__window__details">
        <div className="author">by engineerHUB</div>
        <div className="date">November 23, 2023</div>
      </div>
    </div>
  );
}
