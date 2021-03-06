import React, { Fragment } from "react";
import "./App.scss";
import MapProvider from "./component/Map/MapContext";
import Toolbar from "./component/ToolBar";
import LayerManagement from "./component/LayerManagement";
import Interactions from "./component/Interaction";
import Services from "./component/Services/index";
import Tools from "./component/Tools/index";

function App() {
  console.log("Basic GIS");
  return (
    <Fragment>
      <Toolbar />
      <MapProvider>
        <LayerManagement />
        <Services />
        <Interactions />
        <Tools />
      </MapProvider>
    </Fragment>
  );
}

export default App;
