import React from "react";
import {
  MdSettingsInputComponent,
  MdComputer,
  MdHome,
  MdPowerSettingsNew,
  MdClose,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { logOut } from "../../../api/auth";
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
        className="sidebar w3-sidebar w3-collapse w3-white w3-animate-left w3-card"
        id="mySidebar"
      >
        <br />
        <div className="sidebar__title w3-container w3-row w3-center">
          <h2>Sistema de Examenes</h2>
        </div>

        <div className="w3-container"></div>
        <div className="w3-bar-block">
          <a
            href="#"
            className="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-hover-black w3-round-xxlarge w3-margin-bottom"
            onClick={closeMenu}
            title="close menu"
          >
            <div className="sidebar__item">
              <MdClose
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              Cerrar
            </div>
          </a>
          <NavLink
            to="/user/groups"
            className="w3-bar-item w3-button w3-padding w3-round-xxlarge w3-margin-bottom"
          >
            <div className="sidebar__item">
              <MdHome
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              <span className="sidebar__span-text">Grupos</span>
            </div>
          </NavLink>

          <NavLink
            to="/user/results"
            className="w3-bar-item w3-button w3-padding w3-round-xxlarge w3-margin-bottom"
          >
            <div className="sidebar__item">
              <MdComputer
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              <span className="sidebar__span-text">Resultados</span>
            </div>
          </NavLink>

          <NavLink
            to="/user/settings"
            className="w3-bar-item w3-button w3-padding w3-round-xxlarge w3-margin-bottom"
          >
            <div className="sidebar__item">
              <MdSettingsInputComponent
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              <span className="sidebar__span-text">Configuracion</span>
            </div>
          </NavLink>
          <div className="w3-bar-item w3-button w3-padding w3-round-xxlarge w3-margin-bottom">
            <div
              className="sidebar__item"
              onClick={() => {
                logOut();
                window.location.reload();
              }}
            >
              <MdPowerSettingsNew
                fontSize={30}
                alignmentBaseline="middle"
                className="w3-margin-right"
              />
              <span className="sidebar__span-text">Salir</span>
            </div>
          </div>
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
