import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import {Bucket_URL} from "../../services/APIUtils";
const Dropdown = ({ domainArr }) => {
  const history = useNavigate();
  return (
    <div
      style={{
        maxWidth: "320px",
      }}
    >
      <Accordion defaultActiveKey="0" flush>
        {domainArr.map((s, i) => {
          return (
            <Accordion.Item
              eventKey={`${i}.toString()`}
              key={i}
              style={{ margin: "10px" }}
            >
              <Accordion.Header>{s}</Accordion.Header>
              <Accordion.Body href={`${Bucket_URL}image/handbooks/pdf/${s}.pdf`} target="_blank"
                style={{ display: "flex", gap: "20px", cursor: "pointer" }}
              >
                HandBook
              </Accordion.Body>
              <Accordion.Body
                style={{ display: "flex", gap: "20px", cursor: "pointer" }}
                onClick={() => {
                  history(`/resources/${s}`);
                }}
              >
                Resources
              </Accordion.Body>
              <Accordion.Body
                style={{ display: "flex", gap: "20px", cursor: "pointer" }}
                onClick={() => {
                  history(`/mentors/${s}`);
                }}
              >
                Mentor
              </Accordion.Body>
              <Link to={"https://discord.gg/ZMZAEZ5NfA"}>
              <Accordion.Body 
                style={{ display: "flex", gap: "20px", cursor: "pointer" }}
                // onClick={() => {
                //   history("https://discord.gg/ZMZAEZ5NfA")
                // }}
              >
                Ask your Query
              </Accordion.Body>
              </Link>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Dropdown;
