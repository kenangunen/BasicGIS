import React, { Fragment } from "react";
import "./App.css";
import MapProvider from "./component/Map/MapContext";
import Toolbar from "./component/ToolBar";
import LayerManagement from "./component/LayerManagement";
import Overlay from "./component/Overlay/Overlay";
import Interactions from "./component/Interaction";
import Services from "./component/Services/index"

function App() {
  console.log("App=>Render");
  return (
    <Fragment>
      <Toolbar />
      <MapProvider>        
        <LayerManagement />
        <Services />
        <Overlay />
        <Interactions />      
      </MapProvider>
    </Fragment>
  );
}

export default App;
