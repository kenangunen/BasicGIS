import EventEmitter from 'eventemitter3'

class Request extends EventEmitter {
    constructor() {
        super()
        this.data = null
    }
    getCapability(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.text())
                .then(data => resolve(data))
                .catch(err => reject(err));
        })
    }

    handleObject(data) {
        this.data = data
    }

    getLayers() {
        return this.data.Capability.Layer.Layer
    }
}



export default (new Request())