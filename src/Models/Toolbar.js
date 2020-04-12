import EventEmitter from 'eventemitter3'

class ToolbarModel extends EventEmitter {
    handleDrawType(type) {
        this.emit('onDrawType', type)
    }

    handleInteraction(isThereInteraction) {
        this.emit('onInteraction', isThereInteraction)
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
        this.emit('onCoordinateWin', isVisible)
    }
    handleSelectStatus(isSelected) {
        this.emit('onSelectStatus', isSelected)
    }

    handleSelect(select) {
        this.emit('onSelect', select)
    }

    handleSelectEvent(selectedFeature) {
        this.emit('onSelectEvent', selectedFeature)
    }


}

export default (new ToolbarModel())