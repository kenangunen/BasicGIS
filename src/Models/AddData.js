import EventEmitter from 'eventemitter3'

class AddDataModel extends EventEmitter {
    constructor() {
        super()
        this._layerInfo = []
        this.layerVisibility = []
    }

    handleLayerInfo(layerInfo) {
        this._layerInfo = layerInfo
        this.emit('onLayerInfo', layerInfo)
    }

    getAddedLayer() {
        return this._layerInfo
    }

    handleLayerVisibility(id, isVisib) {
        this.layerVisibility = [{ id, visibility: isVisib }]
        this.emit('changeLayerVisibility', this.layerVisibility)
    }

    getLayerVisibility() {
        return this.layerVisibility
    }
}

export default (new AddDataModel())