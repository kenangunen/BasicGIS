import React, { useRef, useState, useEffect, useContext } from "react";
import "../../style/window.scss";
import "./wmsWStyle.scss";
import Request from "../../Models/Request";
import AddDataModel from "../../Models/AddData";
import ServicesModel from "../../Models/Services";
import LayerContextMenuModel from "../../Models/LayerContextMenu";
import WMSCapabilities from "ol/format/WMSCapabilities";
import { MapContext } from "../Map/MapContext";
import { Tile as TileLayer } from "ol/layer";
import TileWMS from "ol/source/TileWMS";
import { TileArcGISRest } from "ol/source";
import { v1 as uuidv1 } from "uuid";
import close from "../../img/icon/close.svg";
import download from "../../img/icon/download.svg";
import link from "../../img/icon/link.svg";

const WMSService = (props) => {
  const { visib } = props;
  const { map } = useContext(MapContext);
  const win = useRef();
  const urlValue = useRef();
  const [selectedLyr, setSelectedLyr] = useState();
  const [layerData, updateLyrData] = useState([]); //datanın name, id, serviceType bilgilerini tutuyor.
  const [layerCollect, setLayerCollect] = useState([]);
  const [addedLayers, setAddedLayers] = useState([]);
  const [action, setAction] = useState([]);
  const [serviceType, updateType] = useState("");
  const select = useRef();
  const loader = useRef();

  useEffect(() => {
    visib
      ? (win.current.style.display = "block")
      : (win.current.style.display = "none");
  });

  const closeWindow = () => {
    urlValue.current.value = "";
    ServicesModel.handleWMSWindowVisib(false);
    updateLyrData([]);
  };

  const getLayers = (e) => {
    select.current.style.height = "460px";
    loader.current.style.display = "inherit";

    if (layerData.length === 0 && serviceType !== "") {
      e.preventDefault();
      const url = urlValue.current.value;
      const datasInfo = [];
      if (serviceType === "geoserver") {
        const parser = new WMSCapabilities();
        let WMSData;
        const request = "?&request=GetCapabilities";
        const servicesURL = url.concat(request).trim();
        Request.getCapability(servicesURL)
          .then((data) => {
            console.log(data);

            WMSData = parser.read(data);
            Request.handleObject(WMSData, serviceType);
            const layers = Request.getLayers();
            for (let layer of layers) {
              const layerid = uuidv1();
              datasInfo.push({
                name: layer.Name,
                id: layerid,
                serviceType: "geoserver",
              });
            }
            updateLyrData([...datasInfo]);
          })
          .catch((err) => console.log(err));
      } else if (serviceType === "mapserver") {
        const allLyrInfo = [];
        const request = "?f=pjson";
        const servicesURL = url.concat(request).trim();
        Request.getCapability(servicesURL)
          .then((data) => {
            const WMSData = JSON.parse(data);

            Request.handleObject(WMSData, serviceType);
            const layers = Request.getLayers();
            for (let layer of layers) {
              const layerid = uuidv1();
              datasInfo.push({
                name: layer.name,
                id: layerid,
                serviceType: "mapserver",
              });
            }
          })
          .then(async () => {
            for (let dInfo of datasInfo) {
              const featureLayers = [];
              const subLyrName = dInfo.name;
              const layerid = uuidv1();

              const urlType = url.slice(url.length - 8); // url'nin sonu service ile mi bitiyor ?
              let subURL;
              if (urlType === "services") {
                subURL = `${url}/${subLyrName}/MapServer${request}`;
              } else {
                const indexService = url.indexOf("services");
                const newURL = url.slice(0, indexService + 8);
                subURL = `${newURL}/${subLyrName}/MapServer${request}`;
              }

              const subData = await Request.getCapability(subURL);
              const parsedData = JSON.parse(subData);

              if (parsedData.layers.length > 0) {
                for (let lyr of parsedData.layers) {
                  const lyrid = uuidv1();
                  if (lyr.subLayerIds === null) {
                    featureLayers.push({
                      layerID: lyr.id,
                      id: lyrid,
                      name: lyr.name,
                    });
                  }
                }
              }
              allLyrInfo.push({
                name: subLyrName,
                id: layerid,
                serviceType: "mapserver",
                subLayers: featureLayers,
              });
            }
            updateLyrData([...allLyrInfo]);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    if (layerData.length > 0) {
      loader.current.style.display = "none";
    }
  });

  const addServices = (e) => {
    e.preventDefault();

    const temp = [];
    for (let lyr of layerData) {
      for (let ftr of lyr.subLayers) {
        temp.push({
          parrentLayer: lyr.name,
          layerID: ftr.layerID,
          id: ftr.id,
          name: ftr.name,
          serviceType: lyr.serviceType,
        });
      }
    }

    //listenen tıklanan layerların value'si 1 oluyor. Burada onların idsini alarak filtreleme işlemi yapıyorum.
    const fltrLyr = [];
    const subLayers = document.getElementsByClassName("sub-option");
    for (let sLayer of subLayers) {
      if (sLayer.value === 1) {
        const id = sLayer.title;
        const filtered = temp.filter((lyr) => lyr.id === id);
        fltrLyr.push(filtered);
        sLayer.value = 0;
        sLayer.style.backgroundColor = "#3b945f63";
      }
    }
    setSelectedLyr([urlValue.current.value, fltrLyr]);
  };

  useEffect(() => {
    if (typeof selectedLyr !== "undefined") {
      let [url, l_Info] = selectedLyr;
      const temp = [];

      for (let lyr of l_Info) {
        if (lyr[0].serviceType === "geoserver") {
          const layer = new TileLayer({
            source: new TileWMS({
              url: url,
              params: {
                LAYERS: lyr[0].name,
              },
              serverType: "geoserver",
            }),
            title: lyr[0].name,
            zIndex: 10,
            opacity: 1,
          });

          const layerid = uuidv1();
          const layerDetail = {
            name: lyr[0].name,
            id: layerid,
            dataSource: "WMSLayer",
            layer: layer,
            index: 0,
            // legendURL: lyr[0].legendURL
          };
          temp.push(layerDetail);

          map.addLayer(layer);
        } else if (lyr[0].serviceType === "mapserver") {
          const parrent = lyr[0].parrentLayer;
          const layerURL = `${url}/${parrent.slice(
            parrent.indexOf("/") + 1
          )}/MapServer/`;
          const lyrID = `show:${lyr[0].layerID}`;

          const tileArcGISLayer = new TileLayer({
            source: new TileArcGISRest({
              url: layerURL,
              params: { Layers: lyrID },
            }),
            visible: true,
            zIndex: 800,
          });
          const layerid = uuidv1();
          const layerDetail = {
            name: lyr[0].name,
            id: layerid,
            dataSource: "WMSLayer",
            layer: tileArcGISLayer,
            index: 0,
          };
          temp.push(layerDetail);
          map.addLayer(tileArcGISLayer);
        }
      }
      setLayerCollect([...layerCollect, ...temp]);
      setAddedLayers([...addedLayers, ...temp]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLyr]);

  useEffect(() => {
    if (layerCollect.length > 0) {
      AddDataModel.handleLayerInfo(layerCollect);
      setLayerCollect([]);
    }
  }, [layerCollect]);

  useEffect(() => {
    const handlerAction = (act) => {
      setAction(act);
    };
    LayerContextMenuModel.on("handleServiceAction", handlerAction);

    if (action.length > 0) {
      const id = action[0].id;
      const actionType = action[0].actionType;
      const result = addedLayers.filter((lyr) => lyr.id === id);
      if (actionType === "remove") {
        const myLayer = result[0].layer;
        map.removeLayer(myLayer);
      }
    }
    return () => {
      LayerContextMenuModel.off("handleServiceAction", handlerAction);
    };
  });

  const selectSubLayer = (e) => {
    if (e.target.className === "parrent-option") {
      const parrentLayer = e.target;
      const subLayers = e.target.parentElement.nextSibling.children;
      if (parrentLayer.style.backgroundColor !== "lightgray") {
        parrentLayer.style.backgroundColor = "lightgray";
        for (let subLyr of subLayers) {
          subLyr.value = "1";
          subLyr.style.backgroundColor = "rgba(220, 20, 60, 0.45)";
        }
      } else {
        parrentLayer.style.backgroundColor = "initial";
        for (let subLyr of subLayers) {
          subLyr.value = "0";
          subLyr.style.backgroundColor = "initial";
        }
      }
    } else {
      const subLayer = e.target;
      if (subLayer.style.backgroundColor !== "rgba(220, 20, 60, 0.45)") {
        subLayer.value = "1";
        subLayer.style.backgroundColor = "rgba(220, 20, 60, 0.45)";
      } else {
        subLayer.value = "0";
        subLayer.style.backgroundColor = "initial";
      }
    }
  };

  const showSubLayer = (e) => {
    const iElement = e.target.firstChild;
    const subLayers = e.target.parentElement.parentElement.lastElementChild;

    if (iElement.className === "fas fa-plus") {
      iElement.className = "fas fa-minus";
      subLayers.style.display = "inherit";
    } else {
      iElement.className = "fas fa-plus";
      subLayers.style.display = "none";
    }
  };

  return (
    <div className="window" ref={win}>
      <div className="win-header">
        <img src={download} alt="Header Logo" />
        <span className="header-text-lg">WMS Servis Ekleme Paneli</span>
        <img
          className="closeIMG"
          src={close}
          alt="Close Window"
          onClick={() => closeWindow()}
        />
      </div>
      <div className="win-container">
        <div className="form-group">
          <button className="UrlIcon">
            <img src={link} alt="URL" />
          </button>
          <input
            className="UrlInput"
            ref={urlValue}
            type="text"
            id="WMSurl"
            placeholder="URL"
          />
        </div>
        <div className="form-group">
          <div className="pretty p-default p-curve p-thick p-smooth">
            <input
              type="radio"
              name="service"
              id="geoserver"
              onClick={(e) => updateType("geoserver")}
            />
            <div className="state p-info-o">
              <label>Geo Server</label>
            </div>
          </div>
          <div className="pretty p-default p-curve p-thick p-smooth">
            <input
              type="radio"
              name="service"
              id="mapserver"
              onClick={(e) => updateType("mapserver")}
            />
            <div className="state p-info-o">
              <label>Map Server</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            className="wms-btn"
            onClick={(e) => getLayers(e)}
            type="button"
            value="Katmanları Getir"
          ></input>{" "}
        </div>

        <div className="form-group">
          <div className="layerList" ref={select} multiple="multiple">
            <div ref={loader} className="loader">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>

            {layerData.length > 0 &&
              layerData.map((lyr) => (
                <div key={lyr.id}>
                  <div className="parrentLayer">
                    <button
                      className="btn-showLayer"
                      type="button"
                      onClick={(e) => showSubLayer(e)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    <li
                      className="parrent-option"
                      title={lyr.id}
                      onClick={(e) => selectSubLayer(e)}
                    >
                      {lyr.name}
                    </li>
                  </div>
                  <div className="subLayer">
                    {lyr.serviceType === "mapserver" &&
                      lyr.subLayers.map((sub) => (
                        <li
                          className="sub-option"
                          key={sub.id}
                          title={sub.id}
                          onClick={(e) => selectSubLayer(e)}
                        >
                          <span>__</span>
                          {sub.name}
                        </li>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="form-group">
          <input
            className="wms-btn"
            onClick={(e) => addServices(e)}
            type="button"
            value="Servisi Ekle"
          ></input>
        </div>
      </div>
    </div>
  );
};
export default WMSService;
