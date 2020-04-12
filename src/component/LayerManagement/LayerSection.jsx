import React, { Fragment, useState, useEffect, useRef } from "react";
import AddDataModel from "../../Models/AddData";
import LayerContextMenuModel from "../../Models/LayerContextMenu";
import ContextMenu from "./LayerContexMenu";
import "./style/layerSectionStyle.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const LayerSection = (props) => {
  const { layerVisib } = props;
  const [addedLayer, setAddedLayer] = useState([]);

  const [removeElement, setRemoveElement] = useState("");
  const [action, setAction] = useState("");
  const [clientXY, setClientXY] = useState([]);
  const [vis, setVis] = useState(false);
  const layerContent = useRef();
  const [, setVal] = useState(100);
  const [selectedLyr, updateLyr] = useState(); //Context menu için seçilen layer'ı tutuyor.

  //satellite bölmesine geçip tekrar döndüğümüzde checkboxların durumlarını korumak için yaptım.
  if (addedLayer.length > 0) {
    layerVisib
      ? (layerContent.current.style.display = "block")
      : (layerContent.current.style.display = "none");
  }

  const temp = addedLayer;
  //eklenen katmanları alıyoruz.
  useEffect(() => {
    const onLayerInfo = (layerInfo) => {
      temp.unshift(layerInfo[0]);
      updateLayerList(temp);
    };
    AddDataModel.on("onLayerInfo", onLayerInfo);
    return () => {
      AddDataModel.off("onLayerInfo", onLayerInfo);
    };
  });

  const updateLayerList = (arr) => {
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const lyr = arr[i];
        lyr.index = i;
      }
      setAddedLayer([...arr]);
    }
  };

  // eklenen layer'lara index veriyor.
  useEffect(() => {
    if (addedLayer.length > 0) {
      let zIndex = 200;
      addedLayer.map((lyr) => {
        lyr.layer.setZIndex(zIndex);
        zIndex = zIndex - 1;
        return null;
      });
    }
  });

  const onDragEnd = (e) => {
    const sourceIndex = e.source.index;
    if (e.destination !== null) {
      const destinationIndex = e.destination.index;
      reorder(sourceIndex, destinationIndex);
    }
  };

  const reorder = (startIndex, endIndex) => {
    const removed = addedLayer.splice(startIndex, 1);
    addedLayer.splice(endIndex, 0, removed[0]);
    let zIndex = 200;
    for (let i = 0; i < addedLayer.length; i++) {
      const lyr = addedLayer[i];
      lyr.index = i;
      lyr.layer.setZIndex(zIndex - i);
    }
  };

  const setLayerVisibilty = (id) => {
    const selectedLayer = getSelectedLayer(id);
    const isVisible = selectedLayer.getVisible();
    isVisible
      ? selectedLayer.setVisible(false)
      : selectedLayer.setVisible(true);
  };

  const updateOpacity = (e, id) => {
    const sliderValue = e.target.value;
    setVal(sliderValue);

    const selectedLayer = getSelectedLayer(id);
    selectedLayer.setOpacity(parseFloat(sliderValue));
  };

  const showOpacityBar = (e) => {
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

  const onContextMenu = (e, id) => {
    setRemoveElement(id);
    const selectedLayer = getSelectedLayer(id);
    updateLyr(selectedLayer);
    e.preventDefault();
    const y = e.screenX;
    const x = e.screenY;
    setClientXY([x, y]);
    setVis(true);
  };

  //action type'ı güncelliyor.
  useEffect(() => {
    const actionHandler = (actionType) => {
      setAction(actionType);
    };
    LayerContextMenuModel.on("handleAction", actionHandler);
  }, [action]);

  useEffect(() => {
    if (action === "remove") {
      const id = removeElement;
      const filterLayer = addedLayer.filter((lyr) => lyr.id !== id);
      setAddedLayer(filterLayer);
      setAction("");
    }
  }, [action, removeElement, addedLayer]);

  //id'sini gönderdiğim layerı dönüyor.
  const getSelectedLayer = (id) => {
    const selectedLayer = addedLayer.filter((lyr) => lyr.id === id);

    return selectedLayer[0].layer;
  };

  window.addEventListener("click", (e) => {
    setVis(false);
  });

  return (
    <Fragment>
      {/* {vis && (
        <ContextMenu
          clientXY={clientXY}
          visibility={vis}
          selectedLayer={selectedLyr}
        />
      )} */}
      <div ref={layerContent} className="layer-content">
        {addedLayer.length > 0 && (
          <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  className="layer-list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {addedLayer.map((layer) => {
                    return (
                      <Draggable
                        key={layer.id}
                        draggableId={layer.id}
                        index={layer.index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={layer.id}
                            value={layer.id}
                            className="layer-section"
                          >
                            <div
                              onContextMenu={(e) => onContextMenu(e, layer.id)}
                              className="layer-item"
                            >
                              <button
                                type="button"
                                className="show-detail"
                                onClick={(e) => showOpacityBar(e)}
                              >
                                <i className="fas fa-caret-right"></i>
                              </button>
                              <span>{layer.name}</span>
                              <div className="eye pretty p-toggle p-plain">
                                <input
                                  type="checkbox"
                                  defaultChecked={layer.layer.getVisible()}
                                  onChange={(e) => setLayerVisibilty(layer.id)}
                                />
                                <div className="eyeOn state p-on">
                                  <i className=" far fa-eye"></i>
                                </div>
                                <div className="eyeOff state p-off">
                                  <i className="far fa-eye-slash"></i>
                                </div>
                              </div>
                            </div>
                            <div className="opacity-bar">
                              <img src={layer.legendURL} alt="" />
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={layer.layer.getOpacity()}
                                onChange={(e) => updateOpacity(e, layer.id)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </Fragment>
  );
};

export default LayerSection;

// const layersUp = (id) => {
//   const layer = addedLayer.find((lyr) => lyr.id === id);
//   const layerIndex = addedLayer.findIndex((lyr) => lyr.id === id);
//   const newArray = addedLayer.filter((lyr) => lyr.id !== id);
//   if (layerIndex === 0) {
//     newArray.splice(newArray.length, 0, layer);
//   } else {
//     newArray.splice(layerIndex - 1, 0, layer);
//   }
//   setAddedLayer(newArray);
// };

// const layersDown = (id) => {
//   const layer = addedLayer.find((lyr) => lyr.id === id);
//   const layerIndex = addedLayer.findIndex((lyr) => lyr.id === id);
//   const newArray = addedLayer.filter((lyr) => lyr.id !== id);
//   if (layerIndex === newArray.length) {
//     newArray.splice(0, 0, layer);
//   } else {
//     newArray.splice(layerIndex + 1, 0, layer);
//   }
//   setAddedLayer(newArray);
// };
