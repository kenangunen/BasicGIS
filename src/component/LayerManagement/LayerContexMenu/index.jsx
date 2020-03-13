import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import RemoveLayer from "./RemoveLayer";
import ZoomToLayer from "./ZoomToLayer"
import LayerInfo from "./LayerInfo"
import "./style.scss";

const ContextMenu = props => {  
  const { visibility, clientXY, addedLayer} = props;  
  const cm = useRef();  
  useEffect(() => {
    const x = clientXY[0]-200;
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
      <ZoomToLayer cm={cm} />
      <LayerInfo cm={cm} addedLayer={addedLayer} />
      <RemoveLayer cm={cm} />
    </div>
  );
};

export default ContextMenu;

ContextMenu.propTypes ={
  visibility: PropTypes.bool.isRequired,
  clientXY: PropTypes.array.isRequired,
  addedLayer: PropTypes.array.isRequired
}