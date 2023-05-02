import React from "react";
import { Card, CardImg, Col, Row } from "react-bootstrap";
import EventCard from "../EventCard/EventCard";

function CardGrid( {cardData} ) {
    return (
        <div>
            <Row xs={3}>
            {cardData.map((i) => {
              const currParticipants = i.participants;
              let currCap;
              if (currParticipants) {
                currCap = currParticipants.length;
              } else {
                currCap = 0;
              }
                return (
                  <Col>
                    <EventCard title={i.title} image={i.image} author={i.owner.$oid} authorPic={i.authorPic} maxCap={i.max_participants} currCap={currCap} location={i.location} time={i.time.$date} description={i.description} eventID={i._id.$oid}></EventCard>
                  </Col>
                )
            })}
            </Row>
        </div>
    )
}

export default CardGrid;