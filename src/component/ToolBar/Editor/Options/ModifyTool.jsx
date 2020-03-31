import React from "react";
import ToolbarModel from "../../../../Models/Toolbar";

const ModifyTool = props => {
  const onModify = e => {
    const isChecked = e.target.checked;
    ToolbarModel.handleModifyStatus(isChecked);
    ToolbarModel.handleSnapStatus(isChecked);
  };
  return (
    <div>
      <input type="checkbox" id="modfiy" onChange={e => onModify(e)} />
      <label htmlFor="modfiy">
        <span></span>Modify
      </label>
    </div>
  );
};

export default ModifyTool;
