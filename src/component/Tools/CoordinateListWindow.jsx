import React, { useState, useEffect, useRef } from "react";
import ToolbarModel from "../../Models/Toolbar";
import proj4 from "proj4";
import { transform } from "ol/proj";
import { register } from "ol/proj/proj4";
import { getArea, getLength } from "ol/sphere";
import { createStringXY } from "ol/coordinate";
import * as XLSX from "xlsx";
import "./style.scss";

proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
proj4.defs(
  "EPSG:23035",
  "+proj=utm +zone=35 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:23036",
  "+proj=utm +zone=36 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:23037",
  "+proj=utm +zone=37 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:23038",
  "+proj=utm +zone=38 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:5253",
  "+proj=tmerc +lat_0=0 +lon_0=27 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:5254",
  "+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:5255",
  "+proj=tmerc +lat_0=0 +lon_0=33 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:5256",
  "+proj=tmerc +lat_0=0 +lon_0=36 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:5257",
  "+proj=tmerc +lat_0=0 +lon_0=39 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:5258",
  "+proj=tmerc +lat_0=0 +lon_0=42 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
proj4.defs(
  "EPSG:5259",
  "+proj=tmerc +lat_0=0 +lon_0=45 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);
register(proj4);

const CoordinateListWindow = () => {
  const crsList = useRef();
  const [tableData, updateTable] = useState([]);
  const [selected, updateSelected] = useState();
  const [currentCRS, updateCRS] = useState("EPSG:3857"); //mevcur crs'yi tutuyor
  const [measure, setMeasure] = useState();
  const table = useRef();

  ToolbarModel.handleDrawType("None");
  useEffect(() => {
    ToolbarModel.handleSelectStatus(true);
    const selectEvent = (sel) => {
      updateSelected(sel);
    };
    ToolbarModel.on("onSelectEvent", selectEvent);
    return () => {
      ToolbarModel.off("onSelectEvent", selectEvent);
    };
  }, []);
  const stringifyFunc = createStringXY(2);
  useEffect(() => {
    if (typeof selected !== "undefined") {
      const geometry = selected.getGeometry();
      const coordinates = geometry.getCoordinates();
      const geoType = geometry.getType();
      let pointName;
      if (typeof selected.getProperties().name !== "undefined") {
        pointName = selected.getProperties().name.charAt(0);
      } else {
        geoType === "LineString" ? (pointName = "L") : (pointName = "P");
      }
      const datas = [];
      if (geoType === "LineString") {
        for (let i = 0; i < coordinates.length; i++) {
          const vertices = coordinates[i];
          const length = getLength(geometry);
          //uzunluk ölçümünde sıkıntı var
          const output = Math.round(((length / 1000) * 100) / 100);
          setMeasure([{ label: "Uzunluk:", val: output, unit: "km" }]);
          datas.push({
            name: pointName + (i + 1),
            x: vertices[0],
            y: vertices[1],
          });
        }
      } else if (geoType === "Polygon") {
        for (let i = 0; i < coordinates[0].length; i++) {
          const vertices = coordinates[0][i];
          const area = getArea(geometry);
          const output = Math.round((area / 1000000) * 100) / 1000;
          setMeasure([{ label: "Alan:", val: output, unit: "ha" }]);
          datas.push({
            name: pointName + (i + 1),
            x: vertices[0],
            y: vertices[1],
          });
        }
      }
      updateTable([...datas]);
    }else{
      updateTable([]);      
      setMeasure([{ label: "", val: "", unit: "" }]);
    }
  }, [selected]);

  const showCRSList = (e) => {
    if (crsList.current.style.display !== "inherit") {
      crsList.current.style.display = "inherit";
    } else {
      crsList.current.style.display = "none";
    }
  };

  const selectCRS = (e) => {
    const ctsText = e.target.textContent;
    e.target.parentElement.previousSibling.innerHTML = ctsText;
    crsList.current.style.display = "none";

    const wkid = e.target.value;
    const destination = "EPSG:" + wkid;
    const transfromedCoor = [];
    for (let data of tableData) {
      const vertices = [data.x, data.y];
      var tsf = transform(vertices, currentCRS, destination);

      transfromedCoor.push({ name: data.name, x: tsf[0], y: tsf[1] });
    }
    updateCRS(destination);
    updateTable(transfromedCoor);
  };

  const exportCoor = (e) => {    
    const workbook = XLSX.utils.book_new();
    const worksheet_data = table.current;
    const worksheet = XLSX.utils.table_to_sheet(worksheet_data);
    workbook.SheetNames.push("KoordinatListesi");
    workbook.Sheets["KoordinatListesi"] = worksheet;
    XLSX.writeFile(workbook, "KoordinatListesi.xlsx");
  };

  const closeWindow = () => {
    ToolbarModel.handleCoordinateWinStatus(false);
  };
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
            <button className="selectCRS" onClick={(e) => showCRSList(e)}>
              WGS 84 / Pseudo-Mercator (epsg:3857)
            </button>
            <div
              className="set-crs-content"
              ref={crsList}
              onClick={(e) => selectCRS(e)}
            >
              <li value="23035">ED 1950 UTM Zone-35N (epsg:23035)</li>
              <li value="23036">ED 1950 UTM Zone-36N (epsg:23036)</li>
              <li value="23037">ED 1950 UTM Zone-37N (epsg:23037)</li>
              <li value="23038">ED 1950 UTM Zone-38N (epsg:23038)</li>
              <hr />
              <li value="5253">TUREF TM27 (epsg:5253)</li>
              <li value="5254">TUREF TM30 (epsg:5254)</li>
              <li value="5255">TUREF TM33 (epsg:5255)</li>
              <li value="5256">TUREF TM36 (epsg:5256)</li>
              <li value="5257">TUREF TM39 (epsg:5257)</li>
              <li value="5258">TUREF TM42 (epsg:5258)</li>
              <li value="5259">TUREF TM45 (epsg:5259)</li>
              <hr />
              <li value="4326">WGS 84 (epsg:4326)</li>
              <li value="3857">WGS 84 / Pseudo-Mercator (epsg:3857)</li>
            </div>
          </div>
          <div className="exportCoor" onClick={(e) => exportCoor()}>
            <li>
              <i className="fas fa-file-excel"></i>
            </li>
          </div>
        </div>
        <div className="coor-table-section">
          <table className="coor-table" ref={table}>
            <thead>
              <tr>
                <th>Nokta Adı</th>
                <th>X</th>
                <th>Y</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data) => {
                const coor = stringifyFunc([data.x, data.y]).split(",");
                return (
                  <tr key={data.name}>
                    <td>{data.name}</td>
                    <td>{coor[0]}</td>
                    <td>{coor[1]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {typeof measure !== "undefined" && (
          <div className="geoarea">
            <span>{measure[0].label}</span>
            <p>
              {measure[0].val} {measure[0].unit}{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinateListWindow;
