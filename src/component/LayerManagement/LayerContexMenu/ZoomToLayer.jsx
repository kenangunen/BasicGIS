import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Vector as VectorSource } from "ol/source";
import { OSM } from "ol/source";
import TileJSON from "ol/source/TileJSON";
//import TileWMS from "ol/source/TileWMS";

import "../style/style.scss";

const ZoomToLayer = props => {
  const { cm, selectedLayer, map } = props;

  useEffect(() => {});

  const onClick = () => {
    const src = selectedLayer.getSource();
    if (src instanceof VectorSource) {
      const extent = src.getExtent();
      map.getView().fit(extent, { duration: 1000 });
    } else if (src instanceof OSM || src instanceof TileJSON) {
      const extent = src.getTileGrid().getExtent();
      map.getView().fit(extent, { duration: 1000 });
    } else {
      console.log("service'den çerçece koordinatlarını alman gerek.");
    }
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

ZoomToLayer.propTypes = {
  cm: PropTypes.object.isRequired
};
