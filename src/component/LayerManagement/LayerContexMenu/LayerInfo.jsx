import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import InfoWindow from "./InfoWindow";
// import LayerContextMenuModel from "../../../Models/LayerContextMenu";
// import LayerInfoWindow from "./LayerInfoWindow";
import "../style/style.scss";

const LayerInfo = props => {
  const [visib, setVisib] = useState(false);

  const onClick = () =>{
    setVisib(true)
  }
  return (
    <Fragment>
      <div onClick={() => onClick()} className="custom-cm__item" id="info">
        <i className="far fa-question-circle"></i>
        <p>katman detaylarını göster</p>
      </div>
      
      {visib && (<InfoWindow />)}
    </Fragment>
  );
};

export default LayerInfo;

LayerInfo.propTypes = {
  cm: PropTypes.object.isRequired
};
