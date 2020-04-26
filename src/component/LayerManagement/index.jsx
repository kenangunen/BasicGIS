import React, { Fragment, useRef } from "react";
import SatelliteSection from "./SatelliteSection";
import LayerSection from "./LayerSection";
import "./style/style.scss";
import layer from "../../img/icon/layer.svg";
import close from "../../img/icon/close.svg";


const LayerManagement = () => {
  const btn = useRef(); 
  const popupWin = useRef();

  const setWinVisibilty = () => {
    const wi = popupWin.current.style;
    if (wi.width === "220px") {
      wi.width = "0px";
      wi.overflow = "hidden";
    } else {
      wi.width = "220px";
      // wi.overflow = "visible"
    }
  };

  const setVisibility = (e) => {   

    const id = e.target.id;
    const activeBtn = e.target;
    const buttonList = e.target.parentElement.childNodes;
    for (let btn of buttonList) {
      btn.style.backgroundColor = "#C8C8C8";
    }
    activeBtn.style.backgroundColor = "#f3f3f3";
    const baseLyrSection = document.querySelector(".baseLyr-content");
    const lyrSection = document.querySelector(".lyr-content");
    
    if (id === "layer") {
      baseLyrSection.style.display = "none";
      lyrSection.style.display = "block";
    } else {
      baseLyrSection.style.display = "block";
      lyrSection.style.display = "none";
    }
  };
  return (
    <Fragment>
      <button
        ref={btn}
        onClick={() => setWinVisibilty()}
        className="layer-btn"
        type="button"
      >
        <img src={layer} alt="Layer" />
      </button>
      <div className="pop-window" ref={popupWin}>
        <div className="win-header">
          <img className="header-logo" src={layer} alt="Layer" />
          <span className="header-text-sm">Katman Kontrol</span>
          <img
            className="closeIMG"
            src={close}
            alt="Add Service"
            onClick={() => setWinVisibilty()}
          />
        </div>
        <div className="layer-source">
          <button
            className="layer-tab"
            id="layer"
            onClick={(e) => setVisibility(e)}
          >
            Katmanlar
          </button>
          <button
            className="layer-tab"
            id="satellite"
            onClick={(e) => setVisibility(e)}
          >
            Altlıklar
          </button>
        </div>
        <LayerSection />
        <SatelliteSection />
      </div>
    </Fragment>
  );
};
export default LayerManagement;
