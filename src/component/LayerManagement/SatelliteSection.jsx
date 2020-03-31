import React, { Fragment, useState, useContext, useEffect } from "react";
import TileJSON from "ol/source/TileJSON";
import hybrid from "../../img/hybrid.png";
import darkmatter from "../../img/darkmatter.png";
import basic from "../../img/basic.png";
import pastel from "../../img/pastel.png";
import streets from "../../img/streets.png";
import topo from "../../img/topo.png";
import topographique from "../../img/topographique.png";
import positron from "../../img/positron.png";
import hillshade from "../../img/hillshade.png";
import { MapContext } from "../Map/MapContext";
import { Group as LayerGroup, Tile as TileLayer } from "ol/layer";
import AddDataModel from "../../Models/AddData";
import { v1 as uuidv1 } from "uuid";
import "./style/satelliteSectionStyle.scss";

const SatelliteSection = () => {
 
  const [rasterCollection] = useState([
    {
      img: hybrid,
      name: "Satallite",
      id: "satallite",
      url:
        "https://api.maptiler.com/maps/hybrid/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    },
    {
      img: basic,
      name: "Basic Map",
      id: "basicMap",
      url:
        "https://api.maptiler.com/maps/basic/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    },
    {
      img: darkmatter,
      name: "Dark Matter",
      id: "darkMatter",
      url:
        "https://api.maptiler.com/maps/darkmatter/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    },
    {
      img: pastel,
      name: "Pastel",
      id: "pastel",
      url:
        "https://api.maptiler.com/maps/pastel/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    },
    {
      img: streets,
      name: "Streets",
      id: "streets",
      url:
        "https://api.maptiler.com/maps/topo/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    },
    {
      img: topo,
      name: "Topo",
      id: "topo",
      url:
        "https://api.maptiler.com/maps/topo/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    },
    {
      img: hillshade,
      name: "Hillshades",
      id: "hillshade",
      url:
        "https://api.maptiler.com/tiles/hillshades/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    },
    {
      img: positron,
      name: "Poistron",
      id: "positron",
      url:"https://api.maptiler.com/maps/positron/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    },
    {
      img: topographique,
      name: "Topographique",
      id: "topographique",
      url:"https://api.maptiler.com/maps/topographique/tiles.json?key=xNVFvtsPnyMUypMEqzGI"
    }
  ]);
  const { map } = useContext(MapContext);
  let groups = [];
  useEffect(() => {
    for (let raster of rasterCollection) {
      const baseLayer = new TileLayer({
        source: new TileJSON({
          url: raster.url,
          tileSize: 512,
          crossOrigin: "anonymous"
        }),
        title: raster.id,
        opacity: 1,
        visible: false
      });
      groups.push(baseLayer);
    }
    const rasterLayerGroup = new LayerGroup({
      layers: groups
    });
    map.addLayer(rasterLayerGroup);
  }, [groups, map, rasterCollection]);

  const addIMG = (id, name) => {
    const selectedLayer = groups.filter(lyr => lyr.get("title") === id);
    const layerid = uuidv1();
    //temp.push({ id: layerid, name, layer: selectedLayer[0] });
    const layerInfo = [
      {
        id: layerid,
        name,
        layer: selectedLayer[0]
      }
    ];

    //SatelliteModel.handleVisibLayer();
    AddDataModel.handleLayerInfo(layerInfo);
  };

  return (
    <Fragment>
      <div className="raster-list">
        {rasterCollection.map(raster => {
          return (
            <div key={raster.id} className="raster" id={raster.id}>
              <div className="raster-img">
                <img src={raster.img} alt="" />
              </div>
              <i
                className="fas fa-plus"
                onClick={e => addIMG(raster.id, raster.name)}
              ></i>
              <p>{raster.name}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default SatelliteSection;
