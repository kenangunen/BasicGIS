import React from "react";
import ToolbarModel from "../../../../Models/Toolbar";


const ModifyTool = (props) => {
  const {isChecked} = props
  const onModify = (e) => {
    const isChecked = e.target.checked;
    ToolbarModel.handleModifyStatus(isChecked);
    ToolbarModel.handleSnapStatus(isChecked);
  };
  return (
    <div className="check-tool">
      <div className="pretty p-default p-curve p-thick p-smooth">
        {isChecked ? (
          <input type="checkbox" onChange={(e) => onModify(e)} />
        ) : (
          <input type="checkbox" disabled onChange={(e) => onModify(e)} />
        )}

        <div className="state p-info-o">
          <label>Modify</label>
        </div>
      </div>
    </div>
  );
};

export default ModifyTool;
