import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContext } from "../Map/MapContext";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { DragAndDrop } from "ol/interaction";
import { v1 as uuidv1 } from "uuid";
import AddDataModel from "../../Models/AddData";
import LayerContextMenuModel from "../../Models/LayerContextMenu";
//import { add } from "ol/coordinate";

const DragDropVector = () => {
  const { map } = useContext(MapContext);

  const [addedLayers, setAddedLayers] = useState([]);
  const [visibility, setVisibility] = useState(
    AddDataModel.getLayerVisibility()
  );
  const [action, setAction] = useState(LayerContextMenuModel.getAction());

  const interaction = new DragAndDrop({
    formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON]
  });

  useEffect(() => {
    map.addInteraction(interaction);
  }, [map]);

  const temp = [];
  interaction.on("addfeatures", event => {
    const features = event.features;
    const source = new VectorSource({
      features
    });
    const dropLayer = new VectorLayer({
      source,
      visible: true
    });
    map.addLayer(dropLayer);
    map.getView().fit(source.getExtent(), { duration: 1000 });

    //const geom = features[0].getGeometry();
    // const coordinate = geom.getCoordinates();
    // const geoType = geom.getType();

    const layerid = uuidv1();

    if (features.length === 1) {
      const layersName = [features[0].get("name")];
      const layerInfo = 
        {
          id: layerid,
          layersName,
          name: event.file.name,
          visibility: dropLayer.getVisible(),
          layer: dropLayer,
          dataSource: "DragDropVector"
        }
      
        AddDataModel.handleLayerInfo([layerInfo]);

      temp.push(layerInfo);
    } else {
      const layersName = [];
      features.map(feature => {
        layersName.push(feature.get("name"));
      });
      const layerInfo = {
        id: layerid,
        layersName,
        name: event.file.name,
        visibility: dropLayer.getVisible(),
        layer: dropLayer,
        dataSource: "DragDropVector"
      }
      AddDataModel.handleLayerInfo([layerInfo]);

      temp.push(layerInfo);
    }
    setAddedLayers([...addedLayers, ...temp]);
  });

  
  //Layer görünürlüğü ayarlanıyor.
  useEffect(() => {
    const changeVisibility = layerVisibility => {
      setVisibility(layerVisibility);
    };
    AddDataModel.on("changeLayerVisibility", changeVisibility);
    if (visibility.length > 0) {
      const id = visibility[0].id;
      const isVisib = visibility[0].visibility;
      const result = addedLayers.filter(lyr => lyr.id === id);
      const myLayer = result[0].layer;
      myLayer.setVisible(isVisib);
    }
  }, [visibility]);

  //LayerContextMenu'den seçilen actionların işlemleri yapılıyor.
  useEffect(() => {
    const handlerAction = act => {
      setAction(act);
    };
    LayerContextMenuModel.on("handleAction", handlerAction);
    if (action.length > 0) {
      const id = action[0].id;
      const actionType = action[0].actionType;
      const result = addedLayers.filter(lyr => lyr.id === id);
      if (actionType === "remove") {
        const myLayer = result[0].layer;
        myLayer.getSource().clear();
      }
      if (actionType === "zoom") {
        const myLayer = result[0].layer;
        const mySource = myLayer.getSource();
        const extent = mySource.getExtent();
        map.getView().fit(extent, { duration: 1000 });
      }
    }
  });
  return null;
};

export default DragDropVector;

DragAndDrop.propTypes = {
  map: PropTypes.object.isRequired
};
