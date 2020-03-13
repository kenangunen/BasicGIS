import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useContext
} from "react";
import "../../style/window.scss";
import Request from "../../Models/Request";
import WMSCapabilities from "ol/format/WMSCapabilities";
import AddDataModel from "../../Models/AddData";
import { MapContext } from "../Map/MapContext";
import { Tile as TileLayer } from "ol/layer";
import TileWMS from "ol/source/TileWMS";
import { v1 as uuidv1 } from "uuid";
import ServicesModel from "../../Models/Services";

const WMSService = () => {
  const { map } = useContext(MapContext);
  const close = useRef();
  const urlValue = useRef();
  const [services, setServices] = useState();
  const [layerName, setLayerName] = useState([]);
  const [addedLayer, setAddedLayer] = useState([]);

  const select = useRef();

  const closeWindow = () => {
    ServicesModel.handleWMSWindowVisib(false);
  };

  const getLayers = e => {
    if (layerName.length === 0) {
      e.preventDefault();
      const parser = new WMSCapabilities();
      let WMSData;
      const url = urlValue.current.value;
      const request = "?&request=GetCapabilities";
      const servicesURL = url.concat(request).trim();
      const layerNameList = [];
      Request.getCapability(servicesURL)
        .then(data => {
          WMSData = parser.read(data);
          Request.handleObject(WMSData);
          const layers = Request.getLayers();
          for (let layer of layers) {
            const layerid = uuidv1();
            layerNameList.push({ name: layer.Name, id: layerid });
          }
          setLayerName([...layerName, ...layerNameList]);
        })
        .catch(err => console.log(err));
    }
  };

  const addServices = e => {
    e.preventDefault();
    const optionsLayers = select.current.options;
    const layerNames = [];
    for (let option of optionsLayers) {
      if (option.selected === true) {
        layerNames.push(option.value);
      }
    }
    setServices([urlValue.current.value, layerNames]);
  };

  useEffect(() => {
    if (typeof services !== "undefined") {
      const optionsLayers = select.current.options;
      const [url, layerNames] = services;
      const temp = [];
      for (let layerName of layerNames) {
        for (let option of optionsLayers) {
          if (option.value === layerName) {
            option.remove();
          }
        }
        const layerid = uuidv1();
        const layerDetail = {
          name: layerName,
          id: layerid,
          dataSource: "WMSLayer"
        };
        temp.push(layerDetail);
        const layer = new TileLayer({
          source: new TileWMS({
            url: url,
            params: {
              LAYERS: layerName
            },
            serverType: "geoserver"
          }),
          title: layerName,
          zIndex: 10
        });
        map.addLayer(layer);
      }
      setAddedLayer([...addedLayer, ...temp]);
    }
  }, [services]);

  useEffect(() => {
    if (addedLayer.length > 0) {
      console.log(addedLayer);
      AddDataModel.handleLayerInfo(addedLayer);
      setAddedLayer([]);
    }
  }, [addedLayer]);

  return (
    <Fragment>
      <div className="window" ref={close}>
        <div className="win-header">
          <i className="connect fas fa-plug"></i>
          <h5>WMS Servis Ekleme Paneli</h5>
          <i className="close fas fa-times" onClick={() => closeWindow()}></i>
        </div>
        <div className="win-container">
          <form className="__servicesForm">
            <div className="form-group">
              <label className="__label">URL:</label>
              <input
                className="__input"
                ref={urlValue}
                type="text"
                id="WMSurl"
                placeholder="http://..."
              />
            </div>
            <div className="form-group">
              <input
                className="__button"
                onClick={e => getLayers(e)}
                type="button"
                value="Katmanları Getir"
              ></input>{" "}
            </div>

            <div className="form-group">
              <select className="__select" ref={select} multiple="multiple">
                {layerName.length > 0 &&
                  layerName.map(lyr => {
                    return (
                      <option className="__option" key={lyr.id} value={lyr.name}>
                        {lyr.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group">
              <input
                className="__button"
                onClick={e => addServices(e)}
                type="button"
                value="Servisi Ekle"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default WMSService;
