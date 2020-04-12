import React, { Fragment, useState, useRef } from "react";
import SatelliteSection from "./SatelliteSection";
import LayerSection from "./LayerSection";
import "./style/style.scss";
import layer from "../../img/icon/layer.svg";
import close from "../../img/icon/close.svg";
import base from "../../img/icon/base.svg";
import layerController from "../../img/icon/layerController.svg";

const LayerManagement = () => {
  const btn = useRef();
  const [layerVisib, setLayerSecVisib] = useState(true);
  const [satelliteVisib, setSatelliteVisib] = useState(false);
  const lyrSection = useRef();

  const showLayerSection = () => {
    const wi = lyrSection.current.style.width;
    wi === "220px"
      ? (lyrSection.current.style.width = "0px")
      : (lyrSection.current.style.width = "220px");
  };
  const setVisibility = (e) => {
    const id = e.target.id;
    const activeBtn = e.target;
    const buttonList = e.target.parentElement.childNodes;
    for (let btn of buttonList) {
      btn.style.backgroundColor = "#C8C8C8";
    }
    activeBtn.style.backgroundColor = "#f3f3f3";

    if (id === "layer") {
      setLayerSecVisib(true);
      setSatelliteVisib(false);
    } else {
      setLayerSecVisib(false);
      setSatelliteVisib(true);
    }
  };
  return (
    <Fragment>
      <button
        ref={btn}
        onClick={() => showLayerSection()}
        className="layer-btn"
        type="button"
      >
        <img src={layer} alt="Layer" />
      </button>
      <div className="pop-window" ref={lyrSection}>
        <div className="header">
          <img className="header-logo" src={layer} alt="Layer" />
          <span>Katman Kontrol</span>
          <img
            className="closeIMG"
            src={close}
            alt="Add Service"
            id="true"
            onClick={() => showLayerSection()}
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
        <LayerSection layerVisib={layerVisib} />
        {satelliteVisib && <SatelliteSection />}
      </div>
    </Fragment>
  );
};
export default LayerManagement;
