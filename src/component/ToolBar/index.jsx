import React, { useState } from "react";
import Tools from "./Tools/index";
import Datas from "./Datas/index";
import Editor from "./Editor/index";
import edit from "../../img/icon/edit.svg";
import tools from "../../img/icon/tools.svg";
import datas from "../../img/icon/datas.svg";
import "./toolbarStyle.scss";

const Toolbar = () => {
  const [editorVisib, setEditorVisib] = useState(true);
  const [datasVisib, setDatasVisib] = useState(false);
  const [toolsVisib, setToolsVisib] = useState(false);

  const selectItem = (e) => {
    const node = e.target.nodeName;
    let buttonTitle = e.target.title;
    let buttonList = e.target.parentElement.childNodes;
    let clickedButton =  e.target

    if (node === "SPAN") {
      buttonTitle = e.target.parentElement.title;
      buttonList = e.target.parentElement.parentElement.childNodes;
      clickedButton = e.target.parentElement
    } else if (node === "IMG") {
      buttonTitle = e.target.parentElement.title;
      buttonList = e.target.parentElement.parentElement.childNodes;
      clickedButton = e.target.parentElement
    }

    if (buttonTitle === "editor") {
      setEditorVisib(true);
      setDatasVisib(false);
      setToolsVisib(false);
    } else if (buttonTitle === "tools") {
      setEditorVisib(false);
      setDatasVisib(false);
      setToolsVisib(true);
    } else if (buttonTitle === "datas") {
      setEditorVisib(false);
      setDatasVisib(true);
      setToolsVisib(false);
    }

    for (let btn of buttonList) {
      btn.style.color = "#eee2dc";
      btn.style.backgroundColor = "#314455";
      btn.firstChild.style.filter="invert(0%)";
         
    }
    clickedButton.style.backgroundColor = "#f3f3f3";
    clickedButton.style.color = "#1a1a1d";
    clickedButton.firstChild.style.filter="invert(100%)";
  };

  return (
    <div className="tool-bar-container">
      <div className="menu-header">
        <button
          className="default"
          onClick={(e) => selectItem(e)}
          title="editor"
        >
          <img src={edit} alt="Edit Logo" />
          <span>Editor</span>
        </button>
        <button onClick={(e) => selectItem(e)} title="tools" >
          <img src={tools} alt="Tools Logo" />
          <span>Araçlar</span>
        </button>
        <button onClick={(e) => selectItem(e)} title="datas">
          <img src={datas} alt="Datas Logo" />
          <span>Veriler</span>
        </button>
      </div>
      <div className="menu-context">
        {editorVisib && <Editor />}
        {toolsVisib && <Tools />}
        {datasVisib && <Datas />}
      </div>
    </div>
  );
};

export default Toolbar;
