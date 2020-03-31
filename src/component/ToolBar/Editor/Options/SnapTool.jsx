import React from "react";
import ToolbarModel from "../../../../Models/Toolbar";

const SnapTool = () => {
  const onSnap = e => {
    const isChecked = e.target.checked;
    ToolbarModel.handleSnapStatus(isChecked);
  };
  return (
    <div>
      <input type="checkbox" id="snap" onChange={e => onSnap(e)} />
      <label htmlFor="snap">
        <span></span>Snap
      </label>
    </div>
  );
};

export default SnapTool;
