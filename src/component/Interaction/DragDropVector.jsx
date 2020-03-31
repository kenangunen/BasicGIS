import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContext } from "../Map/MapContext";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { DragAndDrop } from "ol/interaction";
import { v1 as uuidv1 } from "uuid";
import AddDataModel from "../../Models/AddData";

const DragDropVector = () => {
  const { map } = useContext(MapContext);
  const [addedLayers, setAddedLayers] = useState([]);
  const interaction = new DragAndDrop({
    formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON]
  });

  useEffect(() => {
    map.addInteraction(interaction);
  }, [interaction, map]);

  const temp = [];
  interaction.on("addfeatures", event => {
    const features = event.features;
    const source = new VectorSource({
      features
    });
    const dropLayer = new VectorLayer({
      source,
      opacity: 1,
      visible: true
    });

    map.addLayer(dropLayer);
    map.getView().fit(source.getExtent(), { duration: 1000 });

    //const geom = features[0].getGeometry();
    // const coordinate = geom.getCoordinates();
    // const geoType = geom.getType();

    const layerid = uuidv1();

    // const featStyle = features[0].getStyleFunction()(
    //   features[0],
    //   map.getView().getResolution()
    // );
    // const strokeWidth = featStyle[0].getStroke().getWidth();
    // const strokeColor = featStyle[0].getStroke().getColor();
    // const fillColor = featStyle[0].getFill().getColor();
    // const fillOpacity = Math.round(fillColor[3] * 100);

    if (features.length === 1) {
      const layersName = [features[0].get("name")];
      const layerInfo = {
        id: layerid,
        layersName,
        name: event.file.name,
        visibility: dropLayer.getVisible(),
        layer: dropLayer,
        dataSource: "DragDropVector"
        // strokeWidth,
        // strokeColor,
        // fillColor,
        // fillOpacity
      };

      AddDataModel.handleLayerInfo([layerInfo]);

      temp.push(layerInfo);
    } else {
      const layersName = [];
      features.map(feature => {
        layersName.push(feature.get("name"));
        return null
      });
      const layerInfo = {
        id: layerid,
        layersName,
        name: event.file.name,
        visibility: dropLayer.getVisible(),
        layer: dropLayer,
        dataSource: "DragDropVector"
      };
      AddDataModel.handleLayerInfo([layerInfo]);

      temp.push(layerInfo);
    }
    setAddedLayers([...addedLayers, ...temp]);
  });

  return null;
};

export default DragDropVector;

DragAndDrop.propTypes = {
  map: PropTypes.object.isRequired
};
