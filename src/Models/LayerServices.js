import EventEmitter from 'eventemitter3'

class LayerServicesModel extends EventEmitter {
    constructor() {
        super()
        this._serviceWMS = []
    }

    handleWMSServices(services) {
        this._serviceWMS = services
        this.emit('addService', this._serviceWMS)
    }

    getWMSServices() {
        return this._serviceWMS
    }


}

export default (new LayerServicesModel())