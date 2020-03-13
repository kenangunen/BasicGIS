import React, { useState, useContext, useEffect, useRef } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { MapContext } from "../Map/MapContext";
import olOverlay from "ol/Overlay";
import OverlayModel from "../../Models/Overlay";
import "./style.scss";

const Overlay = props => {
  const { map } = useContext(MapContext);
  const [overlayItems, setOverlayItems] = useState(
    OverlayModel.getOverlayItems()
  );
  const [element] = useState(document.getElementById("measureElement"));

  //const element =  useRef()

  useState(() => {
    OverlayModel.on("onOverlay", _overlay => {
      setOverlayItems(_overlay);
    });
  }, [overlayItems]);

  useEffect(() => {
    if (overlayItems.length > 0) {
      const overlay = new olOverlay({
        id: overlayItems[0].id,
        offset: overlayItems[0].offset,
        positioning: overlayItems[0].positioning,
        element: element
      });
      map.addOverlay(overlay);

      //console.log(element);
      
      //element.innerHTML = "Kenan";
    //   console.log(element.current);
    //   element.setPosition = overlayItems[0].tooltipCoord;
    }
  }, [overlayItems]);

  // useEffect(() => {
  //     overlay.setOffset(props.offset);
  // }, [overlay, props.offset]);

  return  null
//   <div ref={element} id="measureElement"></div>;
};

export default Overlay;
