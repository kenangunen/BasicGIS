import EventEmitter from 'eventemitter3'

class Request extends EventEmitter {
    constructor() {
        super()
        this.data = null
        this.type = null
    }
    getCapability(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.text())
                .then(data => resolve(data))
                .catch(err => reject(err));
        })
    }

    handleObject(data, type) {
        this.data = data
        this.type = type
    }

    getLayers() {
        if (this.type === "geoserver") {
            return this.data.Capability.Layer.Layer
        } else if (this.type === "mapserver") {
            const layersName = []
            for (let service of this.data.services) {
                layersName.push(service)
            }
            return layersName
        }

    }

}



export default (new Request())