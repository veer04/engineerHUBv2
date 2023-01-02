import React from "react";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
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
              key={s}
              style={{ margin: "10px" }}
            >
              <Accordion.Header>{s}</Accordion.Header>
              <Accordion.Body
                style={{ display: "flex", gap: "20px", cursor: "pointer" }}
                onClick={() => {
                  history(`/resources/${s}`);
                }}
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
              <Accordion.Body
                style={{ display: "flex", gap: "20px", cursor: "pointer" }}
                onClick={() => {
                  history("https://discord.gg/ZMZAEZ5NfA")
                }}
              >
                Ask your Query
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Dropdown;
