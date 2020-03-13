import React, { Fragment, useState, useContext, useEffect } from "react";
import TileJSON from "ol/source/TileJSON";
import hybrid from "../../img/hybrid.png";
import darkmatter from "../../img/darkmatter.png";
import basic from "../../img/basic.png";
import pastel from "../../img/pastel.png";
import streets from "../../img/streets.png";
import topo from "../../img/topo.png";
import { MapContext } from "../Map/MapContext";
import { Group as LayerGroup, Tile as TileLayer } from "ol/layer";
import SatelliteModel from "../../Models/Satellite";
import "./style/satelliteSectionStyle.scss";

const SatelliteSection = () => {
  //console.log("SatelliteSection");

  const [rasterCollection] = useState([
    {
      img: hybrid,
      name: "Satallite",
      id: "satallite",
      url:
        "https://api.maptiler.com/maps/hybrid/tiles.json?key=xNVFvtsPnyMUypMEqzGI",
      visible: false
    },
    {
      img: basic,
      name: "Basic Map",
      id: "basicMap",
      url:
        "https://api.maptiler.com/maps/basic/tiles.json?key=xNVFvtsPnyMUypMEqzGI",
      visible: false
    },
    {
      img: darkmatter,
      name: "Dark Matter",
      id: "darkMatter",
      url:
        "https://api.maptiler.com/maps/darkmatter/tiles.json?key=xNVFvtsPnyMUypMEqzGI",
      visible: false
    },
    {
      img: pastel,
      name: "Pastel",
      id: "pastel",
      url:
        "https://api.maptiler.com/maps/pastel/tiles.json?key=xNVFvtsPnyMUypMEqzGI",
      visible: false
    },
    {
      img: streets,
      name: "Streets",
      id: "streets",
      url:
        "https://api.maptiler.com/maps/topo/tiles.json?key=xNVFvtsPnyMUypMEqzGI",
      visible: false
    },
    {
      img: topo,
      name: "Topo",
      id: "topo",
      url:
        "https://api.maptiler.com/maps/topo/tiles.json?key=xNVFvtsPnyMUypMEqzGI",
      visible: false
    }
  ]);

  const { map } = useContext(MapContext);

  const [lyrCollect, setLayerCollect] = useState([]); //oluşuturlan TileLayer'ları tutuyor.

  const [layerGroup, setLayerGroup] = useState([]);

  useEffect(() => {
    let groups = [];
    for (let raster of rasterCollection) {
      const baseLayer = new TileLayer({
        source: new TileJSON({
          url: raster.url,
          tileSize: 512,
          crossOrigin: "anonymous"
        }),
        visible: false,
        title: raster.id,
        zIndex: -10
      });
      groups.push(baseLayer);
    }
    setLayerCollect([...lyrCollect, ...groups]);
  }, []);

  useEffect(() => {
    if (lyrCollect.length > 0) {
      const rasterLayerGroup = new LayerGroup({
        layers: lyrCollect
      });
      setLayerGroup(rasterLayerGroup);
    }
  }, [lyrCollect]);

  useEffect(() => {    
    if (layerGroup.length !== 0) {
      map.addLayer(layerGroup);
    }
  }, [layerGroup]);

  const onClick = id => {
    SatelliteModel.handleVisibLayer();
    for (let lyr of lyrCollect) {
      let baseLayerName = lyr.get("title");
      lyr.setVisible(false);
      lyr.setVisible(baseLayerName === id);
    }
  };

  return (
    <Fragment>
      <div className="raster-list">
        {rasterCollection.map(raster => {
          return (
            <div key={raster.id} className="raster" id={raster.id}>
              <div onClick={() => onClick(raster.id)} className="raster-img">
                <img src={raster.img} alt="" />
              </div>
              <p>{raster.name}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default SatelliteSection;
