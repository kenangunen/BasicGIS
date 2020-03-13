import React, { useState } from "react";
import Tools from "./Tools/index";
import Datas from "./Datas/index";
import Editor from "./Editor/index";
import "./toolbarStyle.scss"

const Toolbar = () => {
  const [editorVisib, setEditorVisib] = useState(true);
  const [datasVisib, setDatasVisib] = useState(false);
  const [toolsVisib, setToolsVisib] = useState(false);

  const selectItem = e => {
    if (e.target.id === "editor") {
      setEditorVisib(true);
      setDatasVisib(false);
      setToolsVisib(false);
    } else if (e.target.id === "tools") {
      setEditorVisib(false);
      setDatasVisib(false);
      setToolsVisib(true);
    } else if (e.target.id === "datas") {
      setEditorVisib(false);
      setDatasVisib(true);
      setToolsVisib(false);
    }
    const buttonList = e.target.parentElement.childNodes;
    for (let btn of buttonList) {
      btn.style.color = "var(--mainGrey)";
      btn.style.backgroundColor = "var(--mainBlue)";
    }
    e.target.style.color = "var(--mainBlue)";
    e.target.style.backgroundColor = "var(--mainGrey)";
  };

  return (
    <div className="tool-bar-container">
      <div className="menu-header">
        <button
          className="default"
          onClick={e => selectItem(e)}
          type="button"
          id="editor"
        >
          Editor
        </button>
        <button onClick={e => selectItem(e)} type="button" id="tools">
          Araçlar
        </button>
        <button onClick={e => selectItem(e)} type="button" id="datas">
          Veriler
        </button>
      </div>
      {editorVisib && <Editor />}
      {toolsVisib && <Tools />}
      {datasVisib && <Datas />}
    </div>
  );
};

export default Toolbar;
