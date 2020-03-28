import React, { Fragment, useState, useEffect, useRef } from "react";
import AddDataModel from "../../Models/AddData";
import LayerContextMenuModel from "../../Models/LayerContextMenu";
import ContextMenu from "./LayerContexMenu";
import "./style/layerSectionStyle.scss";

const LayerSection = props => {
  const { layerVisib } = props;
  const [addedLayer, setAddedLayer] = useState([]);
  const [removeElement, setRemoveElement] = useState("");
  const [action, setAction] = useState("");
  const [clientXY, setClientXY] = useState([]);
  const [vis, setVis] = useState(false);
  const layerContent = useRef();
  const [val, setVal] = useState(100);
  const [selectedLyr, updateLyr] = useState(); //Context menu için seçilen layer'ı tutuyor.

  const updateOpacity = (e, id) => {
    const sliderValue = e.target.value;
    setVal(sliderValue);
    const selectedLayer = getSelectedLayer(id);
    selectedLayer.setOpacity(parseFloat(sliderValue));
  };

  const showOpacityBar = e => {
    const bar = e.target.parentNode.parentNode.parentNode.lastChild;
    let style = getComputedStyle(bar);

    if (style.display === "none") {
      bar.style.display = "initial";
      e.target.style.transform = "rotate(90deg)";
      e.target.style.right = ".1rem";
    } else {
      bar.style.display = "none";
      e.target.style.transform = "rotate(0deg)";
      e.target.style.right = "0";
    }
  };

  //satellite bölmesine geçip tekrar döndüğümüzde checkboxların durumlarını korumak için yaptım.
  if (addedLayer.length > 0) {
    layerVisib
      ? (layerContent.current.style.display = "block")
      : (layerContent.current.style.display = "none");
  }

  //eklenen katmanları alıyoruz.
  useEffect(() => {
    const onLayerInfo = layerInfo => {
      setAddedLayer([...layerInfo, ...addedLayer]);
    };
    AddDataModel.on("onLayerInfo", onLayerInfo);
    return () => {
      AddDataModel.off("onLayerInfo", onLayerInfo);
    };
  });

  //eklenen layer'lara index veriyor.
  useEffect(() => {
    if (addedLayer.length > 0) {
      let zIndex = 200;
      addedLayer.map(lyr => {
        lyr.layer.setZIndex(zIndex);
        zIndex = zIndex - 1;
      });
    }
  });

  const setLayerVisibilty = id => {
    const selectedLayer = getSelectedLayer(id);
    const isVisible = selectedLayer.getVisible();
    isVisible
      ? selectedLayer.setVisible(false)
      : selectedLayer.setVisible(true);
  };

  const onContextMenu = (e, id) => {
    //setAction(LayerContextMenuModel.getAction());
    const item = e.target.parentNode.parentNode;
    setRemoveElement(item);
    const selectedLayer = getSelectedLayer(id);
    updateLyr(selectedLayer);
    e.preventDefault();
    const y = e.screenX;
    const x = e.screenY;
    setClientXY([x, y]);
    setVis(true);
  };

  const layersUp = id => {
    const layer = addedLayer.find(lyr => lyr.id === id);
    const layerIndex = addedLayer.findIndex(lyr => lyr.id === id);
    const newArray = addedLayer.filter(lyr => lyr.id !== id);
    if (layerIndex === 0) {
      newArray.splice(newArray.length, 0, layer);
    } else {
      newArray.splice(layerIndex - 1, 0, layer);
    }
    setAddedLayer(newArray);
  };

  const layersDown = id => {
    const layer = addedLayer.find(lyr => lyr.id === id);
    const layerIndex = addedLayer.findIndex(lyr => lyr.id === id);
    const newArray = addedLayer.filter(lyr => lyr.id !== id);
    if (layerIndex === newArray.length) {
      newArray.splice(0, 0, layer);
    } else {
      newArray.splice(layerIndex + 1, 0, layer);
    }
    setAddedLayer(newArray);
  };

  window.addEventListener("click", e => {
    setVis(false);
  });

  const getSelectedLayer = id => {
    const selectedLayer = addedLayer.filter(lyr => lyr.id === id);
    return selectedLayer[0].layer;
  };

  useEffect(() => {
    const actionHandler = action => {
      setAction(action);
    };
    LayerContextMenuModel.on("handleAction", actionHandler);
  }, [action]);

  useEffect(() => {
    if (action === "remove") {
      removeElement.remove();
      setAction("");
    }
  }, [action]);

  return (
    <Fragment>
      {vis && (
        <ContextMenu
          clientXY={clientXY}
          visibility={vis}
          selectedLayer={selectedLyr}
        />
      )}
      <div ref={layerContent} className="layer-content">
        {addedLayer.length > 0 && (
          <div className="layer-list">
            {addedLayer.map(layer => {
              return (
                <div key={layer.id} className="layer-section">
                  <div
                    onContextMenu={e => onContextMenu(e, layer.id)}
                    className="layer-item"
                  >
                    <button
                      type="button"
                      className="show-detail"
                      onClick={e => showOpacityBar(e)}
                    >
                      <i className="fas fa-caret-right"></i>
                    </button>
                    <p>{layer.name}</p>
                    <div className="layer-translation">
                      <button type="button" onClick={e => layersUp(layer.id)}>
                        <i className="fas fa-angle-up"></i>
                      </button>
                      <button type="button" onClick={e => layersDown(layer.id)}>
                        <i className="fas fa-angle-down"></i>
                      </button>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={layer.layer.getVisible()}
                      onChange={e => setLayerVisibilty(layer.id)}
                    ></input>{" "}
                  </div>
                  <div className="opacity-bar">
                    <img src={layer.legendURL} alt="" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={layer.layer.getOpacity()}
                      onChange={e => updateOpacity(e, layer.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default LayerSection;
