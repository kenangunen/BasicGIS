import React from "react";
import PropTypes from 'prop-types';
import LayerContextMenuModel from "../../../Models/LayerContextMenu";
import "../style/style.scss";

const ZoomToLayer = props => {  
  const { cm } = props;
    
  const onClick = () => {
    LayerContextMenuModel.handleAction("zoom");
    cm.current.style.display = "none";
  };

  return (
    <div onClick={() => onClick()} className="custom-cm__item" id="zoom">
      <i className="fas fa-search-plus"></i>
      <p>katmanı yakınlaştır</p>
    </div>
  );
};

export default ZoomToLayer;


ZoomToLayer.propTypes ={
  cm: PropTypes.object.isRequired,  
}