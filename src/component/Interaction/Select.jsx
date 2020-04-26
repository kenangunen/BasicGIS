import { useContext, useState, useEffect } from "react";
import { MapContext } from "../Map/MapContext";
import ToolbarModel from "../../Models/Toolbar";
import { Select } from "ol/interaction";

const SelectConfig = () => {
  const { map } = useContext(MapContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const statusSelect = (isChecked) => {
      setActive(isChecked);
    };
    ToolbarModel.on("onSelectStatus", statusSelect);
    return () => {
      ToolbarModel.off("onSelectStatus", statusSelect);
    };
  }, []);

  const select = new Select();
  if (active === true) {
    ToolbarModel.handleSelect(select);
    select.on("select", (e) => {
      const selectedFeature = e.selected;
      ToolbarModel.handleSelectEvent(selectedFeature[0]);
      if (selectedFeature.lengt === 0) {
        map.removeInteraction(select);
      }
    });
    map.addInteraction(select);
  } else {  
    map.removeInteraction(select);
  }

  return null;
};
export default SelectConfig;
