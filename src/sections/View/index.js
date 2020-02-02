import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import VerticallyCenteredModal from "../../components/Modal";


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