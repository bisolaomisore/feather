import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./view.css"

function VerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img className="avatar" src={props.userdata.avatar_url} alt="github user avatar"/>
          <span className="username">
            @{props.userdata.login}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Bio</h4>
        <p>
          {props.userdata.bio ? props.userdata.bio : "This user has no bio"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function View(props) {
  const [modalShow, setModalShow] = useState(false);
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    if (props.url) {
      fetch(props.url)
        .then(res => res.json())
        .then(data => setUserData(data))
    } else {
        setUserData(props.userdata);
    }
  }, [props.url, props.userdata]);
  
  return (
    <span>
      <Button variant="primary" className="btn-large" onClick={() => setModalShow(true)}>
        View
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        userdata={userData}
      />
    </span>
  );
}


export default View;