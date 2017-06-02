import React, { Component, PropTypes } from 'react';
import Notifications, {notify} from 'react-notify-toast';
import ConfirmDialog from './common/ConfirmDialog';
import FieldGroup from './common/FieldGroup';

class BaseComponent extends Component {
	constructor(props) {
        super(props);
        this.notifyDialog = notify;

        ['onChangeControl', 'buildOptionSelect'].map(fn => this[fn] = this[fn].bind(this));
    }

    onChangeControl(keyDataState, keyData, ...args) {
    	let  updateData = arguments[arguments.length -1].target.value;
    	let currentObjectData = this.state[keyDataState];
    	currentObjectData[keyData] = updateData;

    	let objUpdate = {};
    	objUpdate[keyDataState] = currentObjectData;
    	this.setState(objUpdate);
    }

    /**
     * [generateTextFieldGroup description]
     * @param  {Object} props Object setting Text Field
     *                        - label
     *                        - id
     *                        - type
     *                        - keyData
     *                        - componentClass
     *                        - options: {
     *                        	sizeLabel,
     *                         	sizeField
     *                        }
     *                        - generateOption
     * @return {FieldGroup}
     */
    generateFieldGroup(props) {
    	let listOption = [];
    	if (props.type === 'select') {
    		let keyValue = props.generateOption.keyValue;
    		let keyText = props.generateOption.keyText;
    		let dataOption = props.generateOption.data;
    		listOption = this.buildOptionSelect(keyValue, keyText, dataOption);
    	}

    	return (
    		<FieldGroup label={props.label} id={props.id} type={props.type}
    			componentClass={props.componentClass}
    			value={this.state[this.keyDataState][props.keyData]}
				cbOnChange={this.onChangeControl.bind(this, this.keyDataState, props.keyData)}
				listOption={listOption}
				options={props.options}/>
		)
    }

    buildOptionSelect(keyValue, keyText, objData) {
		let listOption = [];
		objData.forEach(function(obj, idx) {
			listOption.push(<option key={idx} value={obj[keyValue]}>{obj[keyText]}</option>);
		});

		return listOption;
	}

	renderConfirmDialog() {
		return <ConfirmDialog ref={confirmDialog => {this.confirmDialog = confirmDialog;}}/>
	}

	renderNotify() {
		return <Notifications />
	}
}

export default BaseComponent;
