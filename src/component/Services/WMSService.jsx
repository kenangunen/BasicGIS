import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useContext
} from "react";
import "../../style/window.scss";
import Request from "../../Models/Request";
import AddDataModel from "../../Models/AddData";
import ServicesModel from "../../Models/Services";
import LayerContextMenuModel from "../../Models/LayerContextMenu";
import WMSCapabilities from "ol/format/WMSCapabilities";
import { MapContext } from "../Map/MapContext";
import { Tile as TileLayer } from "ol/layer";
import TileWMS from "ol/source/TileWMS";
import { v1 as uuidv1 } from "uuid";

const WMSService = props => {
  const { visib } = props;
  const { map } = useContext(MapContext);
  const win = useRef();
  const urlValue = useRef();
  const [selectedLyr, setSelectedLyr] = useState();
  const [layerInfo, setLayerInfo] = useState([]);
  const [layerCollect, setLayerCollect] = useState([]);
  const [addedLayers, setAddedLayers] = useState([]); 
  const [action, setAction] = useState([]);  
  const select = useRef();

  useEffect(() => {
    visib
      ? (win.current.style.display = "block")
      : (win.current.style.display = "none");
  });

  const closeWindow = () => {
    urlValue.current.value = "";
    ServicesModel.handleWMSWindowVisib(false);
  };

  const getLayers = e => {
    if (layerInfo.length === 0) {
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
            const legendURL = layer.Style[0].LegendURL[0].OnlineResource;
            const layerid = uuidv1();
            layerNameList.push({
              name: layer.Name,
              id: layerid,
              legendURL: legendURL
            });
          }
          setLayerInfo([...layerInfo, ...layerNameList]);
        })
        .catch(err => console.log(err));
    }
  };

  const addServices = e => {
    e.preventDefault();
    const optionsLayers = select.current.options;
    const info = [];

    for (let option of optionsLayers) {
      let val = option.value.split(",");
      if (option.selected === true) {
        info.push([{ name: val[0], legendURL: val[1] }]);
      }
    }
    setSelectedLyr([urlValue.current.value, info]);
  };

  useEffect(() => {
    if (typeof selectedLyr !== "undefined") {
      const optionsLayers = select.current.options;
      const [url, info] = selectedLyr;
      const temp = [];
      for (let lyr of info) {
        for (let option of optionsLayers) {
          if (option.value === layerInfo) {
            option.remove();
          }
        }
        const layer = new TileLayer({
          source: new TileWMS({
            url: url,
            params: {
              LAYERS: lyr[0].name
            },
            serverType: "geoserver"
          }),
          title: lyr[0].name,
          zIndex: 10,
          opacity: 1
        });
        
        const layerid = uuidv1();
        const layerDetail = {
          name: lyr[0].name,
          id: layerid,
          dataSource: "WMSLayer",
          layer: layer,
          legendURL: lyr[0].legendURL
        };
        temp.push(layerDetail);

        map.addLayer(layer);
      }
      setLayerCollect([...layerCollect, ...temp]);
      setAddedLayers([...addedLayers, ...temp]);
    }
  }, [selectedLyr]);

  useEffect(() => {
    if (layerCollect.length > 0) {
      AddDataModel.handleLayerInfo(layerCollect);
      setLayerCollect([]);
    }
  }, [layerCollect]); 
  

  useEffect(() => {
    const handlerAction = act => {
      setAction(act);
    };
    LayerContextMenuModel.on("handleServiceAction", handlerAction);

    if (action.length > 0) {
      const id = action[0].id;
      const actionType = action[0].actionType;
      const result = addedLayers.filter(lyr => lyr.id === id);
      if (actionType === "remove") {
        const myLayer = result[0].layer;
        map.removeLayer(myLayer);
      }
    }
    return () => {
      LayerContextMenuModel.off("handleServiceAction", handlerAction);
    };
  });  

  return (
    <Fragment>
      <div className="window" ref={win}>
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
                {layerInfo.length > 0 &&
                  layerInfo.map(lyr => {
                    const val = [lyr.name, lyr.legendURL];
                    return (
                      <option
                        className="__option"
                        key={lyr.id}
                        value={val.toString()}
                      >
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
