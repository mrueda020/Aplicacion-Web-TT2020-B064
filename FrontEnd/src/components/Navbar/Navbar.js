import React from "react";

function Navbar() {
  function openMenu() {
    var mySidebar = document.getElementById("mySidebar");
    var overlayBg = document.getElementById("myOverlay");

    if (mySidebar && overlayBg) {
      if (mySidebar.style.display === "block") {
        mySidebar.style.display = "none";
        overlayBg.style.display = "none";
      } else {
        mySidebar.style.display = "block";
        overlayBg.style.display = "block";
      }
    }
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        className="w3-bar w3-top w3-black w3-large"
        style={{ zIndex: 4, height: "55px" }}
      >
        <button
          className="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey"
          onClick={openMenu}
        >
          <i style={{ marginTop: "5px" }} className="fa fa-bars w3-xlarge"></i>
        </button>
        <span className="w3-bar-item w3-right">
          <span className="w3-xlarge">TT-B064</span>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
