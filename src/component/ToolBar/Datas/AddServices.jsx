import React, { useState, useRef, useEffect } from "react";
import ServicesModel from "../../../Models/Services";
import addService from "../../../img/icon/addService.svg";
import downArrow from "../../../img/icon/downArrow.svg";

const AddServices = () => {
  const dropdownContent = useRef();
  const dArrow = useRef();
  const [visib, setVisib] = useState(false);

  useEffect(() => {
    const handleVisib = (isVisib) => {
      setVisib(isVisib);
    };
    ServicesModel.on("setVisib", handleVisib);
    return () => {
      ServicesModel.off("setVisib", handleVisib);
    };
  }, [visib]);

  const showPopUp = (e) => {   
    if (dropdownContent.current.style.display === "block") {
      dropdownContent.current.style.display = "none";
    } else {
      dropdownContent.current.style.display = "block";
    }

    if (dArrow.current.className === "down-arrow") {
      dArrow.current.className = "up-arrow";
    } else {
      dArrow.current.className = "down-arrow";
    }
  };

  const selectServiceType = (e) => {
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

  window.addEventListener("click", (e) => {
    const val = e.target.id;  
    if (!val) {
      if (dropdownContent.current !== null) {
        dropdownContent.current.style.display = "none";
        dArrow.current.className = "down-arrow";
      }
    }
  });

  return (
    <div className="dropdown">
      <button onClick={(e) => showPopUp(e)} className="big-btn" id="true">
        <span id="true">
          <img src={addService} alt="Add Service" id="true" />
          <img
            className="down-arrow"
            src={downArrow}
            ref={dArrow}
            alt="Down Arrow"
            id="true"
          />
        </span>
        <span className="main-caption" id="true">
          Servis Ekle
        </span>
      </button>
      <div
        ref={dropdownContent}
        className="dropdown-content"
        onClick={(e) => selectServiceType(e)}
      >
        <li id="WMS">WMS Servisi Ekle</li>
        <li id="WFS">WFS Servisi Ekle</li>
        <li id="WFS-T">WFS-T Servisi Ekle</li>
        <li id="WMTS">WMTS Servisi Ekle</li>
      </div>
    </div>
  );
};

export default AddServices;
