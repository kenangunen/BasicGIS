import React, { createContext, useEffect, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control";
import { OSM } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { defaults as defaultInteractions } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer"
import SatelliteModel from "../../Models/Satellite"
//import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import "ol/ol.css";
import "./style.scss";

export const MapContext = createContext();

const MapProvider = props => {  
  const vectorSource = new VectorSource();
  const view = new View({
    center: [44110148, 4729099],
    zoom: 6.9
  });

  const baseLayer = new TileLayer({
    source: new OSM()
  });

  const vectorLyr = new VectorLayer({
    source: vectorSource,
    zIndex: 100
  });

  const map = new Map({
    layers: [baseLayer, vectorLyr],
    interaction: defaultInteractions(),
    target: null,
    view,
    controls: defaultControls({
      attribution: false,
      zoom: false,
      rotate: false
    })
  }); 

  useEffect(() => {  
    const setVisibilty = () =>{     
      baseLayer.setVisible(false)
    }  
    SatelliteModel.on("setVisib", setVisibilty)

    return () =>{
      SatelliteModel.off("setVisib", setVisibilty)
    }
  })

  useEffect(() => {
    map.setTarget("ol-map");    
  }, []);

  return (
    <div className="map" id="ol-map">
      <MapContext.Provider value={{ map, vectorSource }}>
        {props.children}
      </MapContext.Provider>
    </div>
  );
};

export default MapProvider;
