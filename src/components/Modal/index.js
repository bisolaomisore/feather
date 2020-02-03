import React, { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import octokit from "../../octokit";
import "./style.css"


function VerticallyCenteredModal(props) {
  const [userBio, setUserBio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    octokit.users.updateAuthenticated({
      bio: userBio
    })
    props.onHide();
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
          {props.userdata.bio ? userBio : `@${props.userdata.login} has no bio`}
        </p>
        {props.isauthenticated &&
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBioText">
              <Form.Control
                as="textarea"
                rows="2"
                value={userBio}
                onChange={e => setUserBio(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">
              Update Bio
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

export default VerticallyCenteredModal;