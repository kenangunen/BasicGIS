import React, { Fragment, useState, useRef } from "react";
import posed from "react-pose";
import SatelliteSection from "./SatelliteSection"
import LayerSection from "./LayerSection"
import "./style/style.scss"

const Animation = posed.div({
  visible: {
    opacity: 1,
    transition: { duration: 10 }
  },
  hidden: {
    opacity: 0,
    transition: { duration: 10 }
  }
});

const LayerManagement = () => { 
  const btn = useRef();
  const [visib, setVisib] = useState(false);
  const [layerVisib, setLayerSecVisib] = useState(true); 
  const [satelliteVisib, setSatelliteVisib] = useState(false); 

  const showLayerSection = () => {
    setLayerSecVisib(true)
    setVisib(!visib);
    visib
      ? (btn.current.style.display = "block")
      : (btn.current.style.display = "none");    
  };
const setVisibility = (e) => { 
  const id = e.target.id  
  const buttonList = e.target.parentElement.childNodes
  for(let btn of buttonList){
    btn.style.color = "gray"      
  }
  e.target.style.color= "var(--mainRed)";
  if(id==="layer"){
    setLayerSecVisib(true)
    setSatelliteVisib(false)
  }else{
    setLayerSecVisib(false)
    setSatelliteVisib(true)
  }
}
  return (
    <Fragment>   
      <button
        ref={btn}
        onClick={() => showLayerSection()}
        className="layer-btn"
        type="button"
      >
        <i className="fas fa-layer-group"></i>
      </button>
      <Animation pose={visib ? "visible" : "hidden"}>
        <div
          className="pop-window"         
        >
          <div className="header">
            <i className="fas fa-layer-group"></i>
            <h5>Katman Kontrol</h5>
            <i
              onClick={() => showLayerSection()}
              className="close fas fa-times"
            ></i>
          </div>
          <div className="layer-source">
            <i id="layer"
              onClick={(e) => setVisibility(e)}
              className="default fas fa-layer-group"
            ></i>
            <i id="satellite" onClick={(e) => setVisibility(e)} className="fas fa-globe-americas"></i>
          </div>
          <LayerSection layerVisib={layerVisib}/>          
          {satelliteVisib&& (            
            <SatelliteSection />
          )
          }
        </div>
      </Animation>
    </Fragment>
  );
};

export default LayerManagement;
