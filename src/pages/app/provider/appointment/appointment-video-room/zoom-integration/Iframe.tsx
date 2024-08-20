import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import React from "react";

function OpenIframe() {
  const { uuid, appointmentUuid, roomName } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = localStorage?.getItem("isAuth");

  useEffect(() => {
    const redirectToWaitingRoom = () => {
      localStorage.setItem("isInvite", "true");
      const someDiv = document.getElementById("iFrame");
      const parent = document.getElementById("parent");
      if (someDiv && parent) {
        someDiv.style.display = "block";
        someDiv.style.width = "100%";
        someDiv.style.height = "100%";
        someDiv.style.zIndex = "10000";
        parent.style.display = "block";
        parent.style.width = "100%";
        parent.style.height = "100vh";
        parent.style.zIndex = "10000";
        const uRl = `/join-room/1b22b4bc-cfd5-4b28-9b2e-ded6afd5c0fd`;
        someDiv.setAttribute("src", uRl);
      }
    };

    if (isLoggedIn) {
      redirectToWaitingRoom();
    } else {
      localStorage.setItem("redirectURL", `/invite/${appointmentUuid}/${uuid}/${roomName}`);
      navigate("/auth/login");
    }
  }, []);

  return <Navigate to={"/dashboard"} />;
}

export default OpenIframe;