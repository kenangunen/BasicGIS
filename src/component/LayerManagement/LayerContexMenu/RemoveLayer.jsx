import React from "react";
import PropTypes from 'prop-types';
import LayerContextMenuModel from "../../../Models/LayerContextMenu";
import "../style/style.scss";
import removeLyr from "../../../img/icon/removeLyr.svg"
const RemoveLayer = props => {
  const { cm, selectedLayer, map} = props;  
    
  const onClick = () => {      
    LayerContextMenuModel.handleAction("remove");    
    map.removeLayer(selectedLayer);
    cm.current.style.display = "none";
  };

  return (
    <div onClick={() => onClick()} className="custom-cm__item" id="remove">
     <img src={removeLyr} alt="Remove Layer"/>
      <p>sil</p>
    </div>
  );
};

export default RemoveLayer;

RemoveLayer.propTypes ={
  cm: PropTypes.object.isRequired,  
}