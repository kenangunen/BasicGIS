import { useState, useEffect, useContext } from "react";
//import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import ToolbarModel from "../../Models/Toolbar";
import OverlayModel from "../../Models/Overlay"
import { MapContext } from "../Map/MapContext";
import { Draw, Snap } from "ol/interaction";
import { v1 as uuidv1 } from "uuid";

const DrawInteraction = () => { 
  const { map, vectorSource } = useContext(MapContext);
  const [type, setType] = useState(ToolbarModel.getDrawType());
  const [interaction, setInteraction] = useState();

  const overlayID = uuidv1();
  useEffect(() => {
    ToolbarModel.on("onDrawType", _type => {
      setType(_type);
    });
  }, [type]);

  const addDraw = () => {
    if (type) {
      if (type !== "None") {          
        const draw = new Draw({
          source: vectorSource,
          type: type
        });
        ToolbarModel.handleInteraction(draw)
        map.addInteraction(draw);
        setInteraction(draw);
        
        draw.on("drawstart", e => {     
          const sketch = e.feature

          const listener = sketch.getGeometry().on('change', evt => {
            const geom = evt.target
            const tooltipCoord = geom.getLastCoordinate();

            // console.log("tooltipCoordinate: ", tooltipCoord);

            OverlayModel.handleOverlayItems(overlayID, [30,40], "bottom-center", tooltipCoord)
          
        })
          
        })
        return draw;
      } else if (type === "None") {
        map.removeInteraction(interaction);
      }
    }
  };

  useEffect(() => {  
    if (interaction !== undefined) {
      map.removeInteraction(interaction);
    }
    addDraw();
  }, [type]); 

  return null;
};
export default DrawInteraction;
