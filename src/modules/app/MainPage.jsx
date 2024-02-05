import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {Button, Row, Col, Toast} from 'react-bootstrap';
import S3 from "../../_legacy/HOC/Communication/AWS/S3";
import Sidebar from "./SideBar";
import Dashboard from "../../_legacy/Components/Dashboard";
import Tickets from "../../_legacy/Components/Tickets";
import Messages from "../../_legacy/Components/Messages";
import Complaints from "../../_legacy/Components/Complaints";
import FacilityRequest from "../../_legacy/Components/FacilityRequest";
import { getToken as getFirebaseToken, onMessageListener } from "../../firebase";
const Main = (props) => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  getFirebaseToken(setTokenFound);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") {
      navigate("/dashboard");
    }
    const S = new S3();
  }, []);
  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));
  return (
    <div className="d-flex overflow-hidden h-100">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
          minWidth: 200
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
        {isTokenFound && <h1> Notification permission enabled </h1>}
        {!isTokenFound && <h1> Need notification permission </h1>}
      <div style={{ width: "60px" }}>
        <Sidebar />
      </div>
      <div className="overflow-auto h-100 w-100">
        <Routes>
          <Route path="dashboard" element={<Dashboard {...props} />} />
          <Route path="tickets" element={<Tickets {...props} />} />
          <Route path="complaints" element={<Complaints {...props} />} />
          <Route path="message" element={<Messages {...props} />} />
          <Route path="facility-requests" element={<FacilityRequest {...props} />} />
          {/*<Route path="*" element={<UnderDevelopment />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Main;
