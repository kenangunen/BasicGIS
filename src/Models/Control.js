import EventEmitter from 'eventemitter3'
import Swipe from 'ol-ext/control/Swipe'
import TileJSON from "ol/source/TileJSON";
import { Tile as TileLayer } from "ol/layer";

class ControlModel extends EventEmitter {
    constructor() {
        super()
        this.swp = new Swipe();
        this.satallite = new TileLayer({
            source: new TileJSON({
                url: "https://api.maptiler.com/maps/hybrid/tiles.json?key=xNVFvtsPnyMUypMEqzGI",
                tileSize: 512,
                crossOrigin: "anonymous",
            }),
            opacity: 1,
            visible: true,
            zIndex: 999
        });
        this.topographique = new TileLayer({
            source: new TileJSON({
                url: "https://api.maptiler.com/maps/topographique/tiles.json?key=xNVFvtsPnyMUypMEqzGI",
                tileSize: 512,
                crossOrigin: "anonymous",
            }),
            opacity: 1,
            visible: true,
            zIndex: 999
        });
    }

    //#region swipe
    AddSwpControl(map) {
        map.addControl(this.swp)
        map.addLayer(this.satallite);
        map.addLayer(this.topographique);
        this.swp.addLayer(this.satallite);
        this.swp.addLayer(this.topographique, true);
    }
    RemoveSwpControl(map) {
        map.removeControl(this.swp)
        map.removeLayer(this.satallite);
        map.removeLayer(this.topographique);
    }
    //#endregio




}

export default (new ControlModel())