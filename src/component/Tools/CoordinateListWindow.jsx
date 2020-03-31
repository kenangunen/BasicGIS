import React, { useState, useEffect, useContext, useRef } from "react";
import ToolbarModel from "../../Models/Toolbar";
import { MapContext } from "../Map/MapContext";
// import proj4 from "proj4";
// import { register } from "ol/proj/proj4";
import { Select } from "ol/interaction";
import { createStringXY } from "ol/coordinate";
import "./style.scss";

const CoordinateListWindow = () => {
  const crsList = useRef();
  const { map } = useContext(MapContext);
  const [tableData, updateTable] = useState([]);
  //const [selectedFeature, updateSelected] = useState();

  const closeWindow = () => {
    ToolbarModel.handleCoordinateWinStatus(false);
  };
  ToolbarModel.handleDrawType("None");

  const select = new Select();
  map.addInteraction(select);

  select.on("select", e => {
    console.log("çalıştım");

    const selectedFeature = e.selected;
    if (typeof selectedFeature !== "undefined" && selectedFeature.length > 0) {
      const selected = selectedFeature[0];
      const geometry = selected.getGeometry();
      const stringifyFunc = createStringXY(2);
      const coordinates = geometry.getCoordinates();
      const geoType = geometry.getType();

      let pointName = "";
      let coorFinalVer = "";
      const datas = [];
      if (geoType === "LineString") {
        const verticesName = "L";

        for (let i = 0; i < coordinates.length; i++) {
          pointName = verticesName + (i + 1);
          const vertices = coordinates[i];
          coorFinalVer = stringifyFunc(vertices).split(",");
          datas.push({
            name: pointName,
            x: coorFinalVer[0],
            y: coorFinalVer[1]
          });
        }
      } else if (geoType === "Polygon") {
        const verticesName = "P";
        for (let i = 0; i < coordinates[0].length; i++) {
          pointName = verticesName + (i + 1);
          const vertices = coordinates[0][i];
          coorFinalVer = stringifyFunc(vertices).split(",");
          datas.push({
            name: pointName,
            x: coorFinalVer[0],
            y: coorFinalVer[1]
          });
        }
      }
      updateTable([...datas]);
    } else if (selectedFeature === 0) {
      closeWindow();
      updateTable([]);
    }
  });

  // useEffect(() => {
  //   if (typeof selectedFeature !== "undefined") {
  //     console.log(selectedFeature);
  //     const selected = selectedFeature[0];
  //     const geometry = selected.getGeometry();
  //     const stringifyFunc = createStringXY(2);
  //     const coordinates = geometry.getCoordinates();
  //     const geoType = geometry.getType();

  //     let pointName = "";
  //     let coorFinalVer = "";
  //     if (geoType === "LineString") {
  //       const verticesName = "L";
  //       const datas = [];
  //       for (let i = 0; i < coordinates.length; i++) {
  //         pointName = verticesName + (i + 1);
  //         const vertices = coordinates[i];
  //         coorFinalVer = stringifyFunc(vertices).split(",");
  //         datas.push({
  //           name: pointName,
  //           x: coorFinalVer[0],
  //           y: coorFinalVer[1]
  //         });
  //       }
  //     }
  //     if (geoType === "Polygon") {
  //       const verticesName = "P";
  //       const datas = [];
  //       for (let i = 0; i < coordinates[0].length; i++) {
  //         pointName = verticesName + (i + 1);
  //         const vertices = coordinates[0][i];
  //         coorFinalVer = stringifyFunc(vertices).split(",");
  //         datas.push({
  //           name: pointName,
  //           x: coorFinalVer[0],
  //           y: coorFinalVer[1]
  //         });
  //       }
  //       updateTable([...datas]);
  //       updateSelected("");
  //     }
  //   }
  // }, [selectedFeature]);

  const showCRSList = () => {
    // crsList.current.style.display = "inherit";
  };

  // window.addEventListener("click", e => {
  //   crsList.current.style.display = "none";
  // });
  return (
    <div className="window">
      <div className="win-header">
        <i className="connect fas fa-plug"></i>
        <h5>Koordinat Listesi</h5>
        <i className="close fas fa-times" onClick={() => closeWindow()}></i>
      </div>
      <div className="win-container">
        <div className="coordinate-tool">
          <div className="set-crs">
            <button className="selectCRS" onClick={() => showCRSList()}>
              WGS 84 / Pseudo-Mercator
            </button>
            <div className="set-crs-content" ref={crsList}>
              <li value="23035">ED 1950 UTM Zone-35N</li>
              <li value="23036">ED 1950 UTM Zone-36N</li>
              <li value="23037">ED 1950 UTM Zone-37N</li>
              <li value="23038">ED 1950 UTM Zone-38N</li>
              <hr />
              <li value="5253">TUREF TM27</li>
              <li value="5254">TUREF TM30</li>
              <li value="5255">TUREF TM33</li>
              <li value="5256">TUREF TM36</li>
              <li value="5257">TUREF TM39</li>
              <li value="5258">TUREF TM42</li>
              <li value="5259">TUREF TM45</li>
              <hr />
              <li value="4326">WGS 84</li>
              <li value="3857">WGS 84 / Pseudo-Mercator</li>
            </div>
          </div>
        </div>
        <div className="coor-table-section">
          <table className="coor-table ">
            <thead>
              <tr>
                <th>Nokta Adı</th>
                <th>X</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(data => {
                return (
                  <tr key={data.name}>
                    <td>{data.name}</td>
                    <td>{data.x}</td>
                    <td>{data.y}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoordinateListWindow;
