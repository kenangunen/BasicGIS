import EventEmitter from 'eventemitter3'

class ServicesModel extends EventEmitter {
    constructor() {
        super()
        this.isVisib = null
    }
    handleWMSWindowVisib(isVisib) {
        this.isVisib = isVisib
        this.emit('setVisib', this.isVisib)
    }
}

export default (new ServicesModel())