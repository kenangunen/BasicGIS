import React, { Fragment, useState, useRef, useEffect } from "react";
import ServicesModel from "../../../Models/Services";

const AddServices = () => {
  const dropdownContent = useRef();
  const downArrow = useRef();
  const [visib, setVisib] = useState(false);

  useEffect(() => {
    const handleVisib = isVisib => {
      setVisib(isVisib);
    };
    ServicesModel.on("setVisib", handleVisib);
    return () => {
      ServicesModel.off("setVisib", handleVisib);
    };
  }, [visib]);

  const showPopUp = () => {
    if (dropdownContent.current.style.display === "block") {
      dropdownContent.current.style.display = "none";
    } else {
      dropdownContent.current.style.display = "block";
    }

    if (downArrow.current.className === "down-arrow fas fa-chevron-down") {
      downArrow.current.className = "up-arrow fas fa-chevron-down";
    } else {
      downArrow.current.className = "down-arrow fas fa-chevron-down";
    }
  };

  const selectServiceType = e => {
    const serviceType = e.target.id;
    if (serviceType === "WMS") {
      setWMSVisibility();
    }
  };

  const setWMSVisibility = () => {
    visib
      ? ServicesModel.handleWMSWindowVisib(false)
      : ServicesModel.handleWMSWindowVisib(true);
  };

  window.addEventListener("click", e => {
    if (e.target.className !== "dropbtn") {
      if (dropdownContent.current !== null) {
        dropdownContent.current.style.display = "none";
        downArrow.current.className = "down-arrow fas fa-chevron-down";
      }
    }
  });

  return (
    <Fragment>
      <div className="dropdown">
        <button onClick={() => showPopUp()} type="button" className="dropbtn">
          <span className="main-icon">
            <i className="connect fas fa-plug"></i>
            <i ref={downArrow} className="down-arrow fas fa-chevron-down"></i>
          </span>
          <span className="main-caption">Servis Ekle</span>
        </button>
        <div
          ref={dropdownContent}
          className="dropdown-content"
          onClick={e => selectServiceType(e)}
        >
          <li id="WMS">WMS Servisi Ekle</li>
          <li id="WFS">WFS Servisi Ekle</li>
          <li id="WFS-T">WFS-T Servisi Ekle</li>
          <li id="WMTS">WMTS Servisi Ekle</li>
        </div>
      </div>
    </Fragment>
  );
};

export default AddServices;
