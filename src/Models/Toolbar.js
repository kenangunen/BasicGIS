import EventEmitter from 'eventemitter3'

class ToolbarModel extends EventEmitter {
    handleDrawType(type) {
        this.emit('onDrawType', type)
    }

    handleInteraction(effect) {
        this.emit('onInteraction', effect)
    }

    handleSnapStatus(isChecked) {
        this.emit('onSnap', isChecked)
    }

    handleModifyStatus(isChecked) {
        this.emit('onModify', isChecked)
    }
    handleTranslateStatus(isChecked) {
        this.emit('onTranslate', isChecked)
    }

    handleCoordinateWinStatus(isVisible) {
        console.log(isVisible);

        this.emit('onCoordinateWin', isVisible)
    }
}

export default (new ToolbarModel())