import React from "react";
import PropTypes from 'prop-types';
import LayerContextMenuModel from "../../../Models/LayerContextMenu";
import "../style/style.scss";
const RemoveLayer = props => {
  const { cm } = props;  
    
  const onClick = () => {    
    LayerContextMenuModel.handleAction("remove");
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