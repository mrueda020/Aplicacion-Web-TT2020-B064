import React from "react";
import {
  MdSettingsInputComponent,
  MdComputer,
  MdHome,
  MdPowerSettingsNew,
  MdClose,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./Siderbar.scss";
function Sidebar() {
  function closeMenu() {
    var mySidebar = document.getElementById("mySidebar");
    var overlayBg = document.getElementById("myOverlay");
    if (mySidebar && overlayBg) {
      mySidebar.style.display = "none";
      overlayBg.style.display = "none";
    }
  }

  return (
    <div>
      <nav
        className="w3-sidebar w3-collapse w3-white w3-animate-left"
        style={{ zIndex: 3, width: "300px" }}
        id="mySidebar"
      >
        <br />
        <div
          className="w3-container w3-row w3-center"
          style={{ alignItems: "center", marginTop: "40px" }}
        >
          <h1 className="w3-xxxlarge">LinkEx</h1>
        </div>

        <div className="w3-container"></div>
        <div className="w3-bar-block">
          <a
            href="#"
            className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-hover-black w3-round-xxlarge w3-margin-bottom"
            onClick={closeMenu}
            title="close menu"
          >
            <div
              className="w3-center"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "3.5em",
              }}
            >
              <MdClose
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
                Cerrar
            </div>
          </a>
          <NavLink
            to="/user/overview"
            className="w3-bar-item w3-button w3-padding w3-round-xxlarge w3-margin-bottom"
          >
            <div
              className="w3-center"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "3.5em",
              }}
            >
              <MdHome
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              <span style={{ fontSize: "1.25em" }}>Vista general</span>
            </div>
          </NavLink>

          <NavLink
            to="/user/evaluations"
            className="w3-bar-item w3-button w3-padding w3-round-xxlarge w3-margin-bottom"
          >
            <div
              className="w3-center"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "3.5em",
              }}
            >
              <MdComputer
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              <span style={{ fontSize: "1.25em" }}>Examenes</span>
            </div>
          </NavLink>
          <NavLink
            to="/user/settings"
            className="w3-bar-item w3-button w3-padding w3-round-xxlarge w3-margin-bottom"
          >
            <div
              className="w3-center"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "3.5em",
              }}
            >
              <MdSettingsInputComponent
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              <span style={{ fontSize: "1.25em" }}>Configuracion</span>
            </div>
          </NavLink>
          <NavLink
            to="/user/login"
            className="w3-bar-item w3-button w3-padding w3-round-xxlarge w3-margin-bottom"
          >
            <div
              className="w3-center"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "3.5em",
              }}
            >
              <MdPowerSettingsNew
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              <span style={{ fontSize: "1.25em" }}>Salir</span>
            </div>
          </NavLink>
        </div>
      </nav>

      <div
        className="w3-overlay w3-hide-large w3-animate-opacity"
        onClick={closeMenu}
        style={{ cursor: PointerEvent }}
        title="close side menu"
        id="myOverlay"
      ></div>
    </div>
  );
}

export default Sidebar;
