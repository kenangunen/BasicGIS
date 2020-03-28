import React from "react";
import PropTypes from 'prop-types';
import LayerContextMenuModel from "../../../Models/LayerContextMenu";
import "../style/style.scss";
const RemoveLayer = props => {
  const { cm, selectedLayer, map} = props;  
    
  const onClick = () => {      
    LayerContextMenuModel.handleAction("remove");    
    map.removeLayer(selectedLayer);
    cm.current.style.display = "none";
  };

  return (
    <div onClick={() => onClick()} className="custom-cm__item" id="remove">
      <i className="far fa-trash-alt"></i>
      <p>sil</p>
    </div>
  );
};

export default RemoveLayer;

RemoveLayer.propTypes ={
  cm: PropTypes.object.isRequired,  
}