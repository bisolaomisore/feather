import React, { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./view.css"

const config = require("./config");
const Octokit = require("@octokit/rest");
const octokit = new Octokit({
  auth: config.PERSONAL_ACCESS_TOKEN
});

function VerticallyCenteredModal(props) {
  const [userBio, setUserBio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    octokit.users.updateAuthenticated({
      bio: userBio
    })
  }

  useEffect(() => setUserBio(props.userdata.bio), [props.userdata]);

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
          <Badge variant="success">{props.isauthenticated}</Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Bio</h4>
        <p>
          {props.userdata.bio ? userBio : "This user has no bio"}
        </p>
        {props.isauthenticated &&
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBioText">
              <Form.Control
                type="text"
                value={userBio}
                onChange={e => setUserBio(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
          </Form>
        }
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
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  
  useEffect(() => {
    if (props.url) {
      fetch(props.url)
        .then(res => res.json())
        .then(data => setUserData(data))
    } else {
      setUserData(props.userdata);
      setUserAuthenticated(true);
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
        isauthenticated={userAuthenticated ? 'Authenticated' : ''}
      />
    </span>
  );
}


export default View;