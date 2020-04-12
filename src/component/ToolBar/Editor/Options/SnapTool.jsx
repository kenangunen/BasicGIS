import React from "react";
import ToolbarModel from "../../../../Models/Toolbar";

const SnapTool = (props) => {
  const {isChecked} = props

  const onSnap = (e) => {
    const isChecked = e.target.checked;
    ToolbarModel.handleSnapStatus(isChecked);
  };

  return (
    <div className="check-tool">
       <div className="pretty p-default p-curve p-thick p-smooth">
         {isChecked ? (<input type="checkbox" onChange={e => onSnap(e)}/>) : <input type="checkbox" disabled onChange={e => onSnap(e)}/>}
        
        <div className="state p-info-o">
            <label>Snap</label>
        </div>
    </div>
    </div>
  );
};

export default SnapTool;
