import React, { useContext, useState, useEffect } from "react";
// import { Snap } from "ol/interaction";
// import { MapContext } from "../../Map/MapContext";
// import ToolbarModel from "../../../Models/Toolbar"

const SnapConfig = () => {
//   const [isActive, setActive] = useState(false);
//   const { map, vectorSource } = useContext(MapContext);


//   const snap = new Snap({ source: vectorSource }); 
//   const change = e => {    
    
//     const checkbox = e.target; 
//     if(checkbox.checked){
//         map.addInteraction(snap)
//         console.log("snap eklendi");  
//     } else{
//         map.removeInteraction(snap)
//         console.log("snap silindi");  
//     }
//     //setActive(checkbox.checked);
//   };

//   useEffect(() => {
//     const snap = new Snap({ source: vectorSource });
//     console.log(isActive);
    
//     isActive ? map.addInteraction(snap) : map.removeInteraction(snap);
//   }, [isActive]);

  return (
    <div className="snap">      
      <input type="checkbox" id="snap" onChange={e => change(e)} />
      <label htmlFor="snap">
        <span></span>Snap
      </label>
    </div>
  );
};
export default SnapConfig;
