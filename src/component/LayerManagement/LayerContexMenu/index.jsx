import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { MapContext } from "../../Map/MapContext";
import RemoveLayer from "./RemoveLayer";
import ZoomToLayer from "./ZoomToLayer";
import "./style.scss";


const ContextMenu = props => {
  const { map } = useContext(MapContext);
  const { visibility, clientXY, selectedLayer } = props;

  const cm = useRef();
  useEffect(() => {
    const x = clientXY[0];
    const y = clientXY[1];
    if (visibility === true) {
      cm.current.style.display = "block";
      cm.current.style.top = x + "px";
      cm.current.style.left = y + "px";
    } else {
      cm.current.style.display = "none";
    }
  }, [visibility, clientXY]);

  return (
    <div className="custom-cm" ref={cm}>
      <ZoomToLayer cm={cm} selectedLayer={selectedLayer} map={map} />
      {/* <LayerInfo cm={cm} selectedLayer={selectedLayer} /> */}
      <RemoveLayer cm={cm} selectedLayer={selectedLayer} map={map} />
    </div>
  );
};

export default ContextMenu;

ContextMenu.propTypes = {
  visibility: PropTypes.bool.isRequired,
  clientXY: PropTypes.array.isRequired,
  selectedLayer: PropTypes.object.isRequired
};
