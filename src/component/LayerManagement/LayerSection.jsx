import React, { Fragment, useState, useEffect } from "react";
import AddDataModel from "../../Models/AddData";
import LayerContextMenuModel from "../../Models/LayerContextMenu";
import ContextMenu from "./LayerContexMenu";
import "./style/layerSectionStyle.scss";

const LayerSection = (props) => { 
  const {layerVisib}=props
  const [addedLayer, setAddedLayer] = useState([]);
  const [removeElement, setRemoveElement] = useState(""); 
  const [action, setAction] = useState(""); //layer'a sağ tık yaptıktan sonra seçilen eylemi ve layer id'sini tutuyor.
  const [clientXY, setClientXY] = useState([]); 
  const [visibility, setVisibility] = useState(false); 

  useEffect(() => {
    const onLayerInfo = layerInfo => {        
      setAddedLayer([...addedLayer, ...layerInfo]);      
    };
    AddDataModel.on("onLayerInfo", onLayerInfo);
    return () => {
      AddDataModel.off("onLayerInfo", onLayerInfo);
    };
  });

  const setLayerVisibilty = (e, id,dataSource) => {
    const checkbox = e.target;
    if (dataSource === "DragDropVector") {      
      checkbox.checked
        ? AddDataModel.handleLayerVisibility(id, true)
        : AddDataModel.handleLayerVisibility(id, false);
    }else if(dataSource === "WMSLayer"){
        console.log("wms katmanı kapatılıyor");        
    }    
  };

  const onContextMenu = (e, layer) => {
    setAction(LayerContextMenuModel.getAction());
    const item = e.target.parentNode.parentNode;
    setRemoveElement(item);
    LayerContextMenuModel.SelectedLayer(layer);
    e.preventDefault();
    const y = e.screenX;
    const x = e.screenY;
    setClientXY([x, y]);
    setVisibility(true);
  };

  useEffect(() => {   
    const actionHandler = action => {
      setAction(action);
    };
    LayerContextMenuModel.on("handleAction", actionHandler);
    return () => {
      LayerContextMenuModel.off("handleAction", actionHandler);
    };
  }, [action]);

  useEffect(() => {
    if (action.length > 0) {
      const actionType = action[0].actionType;
      if (actionType === "remove") {
        removeElement.remove();
      }
    }
  }, [action]);

  window.addEventListener("click", e => {
    setVisibility(false);
  })

if(layerVisib) {
  return (
    <Fragment>
      {visibility && (
        <ContextMenu
          clientXY={clientXY}
          visibility={visibility}
          addedLayer={addedLayer}
        />
      )}
      <div className="layer-content">
        {addedLayer.length > 0 && (
          <div className="layer-list">
            {addedLayer.map(layer => {
              return (
                <div key={layer.id} className="layer-section">
                  <div
                    onContextMenu={e => onContextMenu(e, layer)}
                    className="layer-item"
                  >
                    <button type="button">
                      <i className="fas fa-caret-right"></i>
                    </button>
                    <p>{layer.name}</p>
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      onChange={e =>
                        setLayerVisibilty(e, layer.id, layer.dataSource)
                      }
                    ></input>{" "}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
}else{
  return null
}
  
};

export default LayerSection;
