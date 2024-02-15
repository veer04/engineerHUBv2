import "./SiliconValleyCard.css";

export default function SiliconValleyCard({ data, color }) {
  return (
    <article style={{ backgroundColor: color }} className="silicon-valley-card">
      <div className="image">
        <img src={data.image} alt="" />
      </div>
      <div className="details-container">
        <div className="user-image">
          <img src={data.logo} alt="" />
        </div>
        <div className="details">
          <p className="text-crop-1">{data.name}</p>
          <p
            title={data.title}
            style={{
              wordBreak: "break-all",
            }}
            className="text-crop-1"
          >
            {data.title}
          </p>
        </div>
      </div>
    </article>
  );
}
