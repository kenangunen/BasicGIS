import React, { useEffect, useState, useContext } from 'react'
import brush_2 from "../../img/icon/brush_2.svg"
import close from "../../img//icon/close.svg";
import { MapContext } from "../Map/MapContext";
import { Select } from "ol/interaction";
// import ControlModel from "../../Models/Control"
import "./addToLejant.scss"
import EditorModel from "../../Models/Editor";
import Legend from 'ol-ext/control/Legend'
import { Fill, Stroke, Style } from "ol/style";
import Shadow from 'ol-ext/style/Shadow'
import FontSymbol from 'ol-ext/style/FontSymbol'
const AddToLegend = () => {
  EditorModel.handleDrawType("None");
  const { map } = useContext(MapContext)
  const closeWindow = () => {

  }

  function getFeatureStyle(feature) {
    const st = [];
    // Shadow style
    st.push(new Style({
      image: new Shadow({
        radius: 15
      })
    }));
    const st1 = [];
    // Font style
    st.push(new Style({
      image: new FontSymbol({
        form: "marker",
        glyph: 'fa-car',
        radius: 15,
        offsetY: -15,
        fontSize: .7,
        color: '#fff',
        fill: new Fill({
          color: 'blue'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        })
      }),
      stroke: new Stroke({
        width: 5,
        color: '#f00'
      }),
      fill: new Fill({
        color: [255, 0, 0, 0.6]
      })
    }));
    return st;
  }

  const legend = new Legend({
    title: 'Legend',
    style: getFeatureStyle,
    collapsed: false
  });
  map.addControl(legend);
  legend.on('select', e => {
    if (e.index >= 0) console.log('You click on row: ' + e.title + ' (' + e.index + ')');
    else console.log('You click on the title: ' + e.title);
  });

  const addToLegend = (e) => {
    e.preventDefault()
  }

  const select = new Select({ hitTolerance: 3 });
  map.addInteraction(select);
  // select.on('select', function (e) {
  //   const f = e.selected[0];
  //   select.getFeatures().remove(f);
  //   if (f) {
  //     const img = legend.getStyleImage({
  //       /* given a style  and a geom type
  //       style: f.getStyle() || getFeatureStyle(f),
  //       typeGeom: f.getGeometry().getType()
  //       */
  //       /* or given a feature */
  //       feature: f
  //     });
  //     document.querySelector(".img").appendChild(img);
  //     // $('.options .row').show();

  //   } else {
  //     // $('.options .row').hide();
  //   }
  //   select.getFeatures().push(f);
  // });

  return (
    <div className="window-sym">
      <div className="win-header">
        <img src={brush_2} alt="Header Logo" />
        <span className="header-text-lg">Lejant Oluştur</span>
        <img
          className="closeIMG"
          src={close}
          alt="Close Window"
          onClick={() => closeWindow()}
        />
      </div>
      <div className="win-container">
        <div className="options">
          <p>
            Title:
      <input type="text" placeholder="Legend title" />
            <br /><br />
            <i>Select an object on the map and add it to the legend...</i>
          </p>
          <form className="row">
            <div className="img"></div>
            <input type="text" placeholder="title" />
            <br />
            <button type="submit" onClick={(e) => addToLegend(e)}>Lejanta Ekle</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddToLegend

