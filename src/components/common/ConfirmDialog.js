import React, { Component, PropTypes } from 'react';
import {Modal, Button} from 'react-bootstrap';

class ConfirmDialog extends Component {
	constructor(props) {
		super(props);

        this.state = {
        	showConfirmDialog: false,
        	title: '',
        	message: '',
        	okFunction: function(){},
        	cancelFunction: function(){}
        };

        ['closeDialog'].map(fn => this[fn] = this[fn].bind(this));
    }

	showConfirmDialog(msg, title, okFnc, cancelFnc) {
		this.setState({
			showConfirmDialog: true,
        	title: title,
        	message: msg,
        	okFunction: okFnc,
        	cancelFunction: cancelFnc || this.closeDialog
		});
	}

	closeDialog() {
		this.setState({
			showConfirmDialog: false
		});
	}

	render() {
		return (
			<div className="static-modal">
			    <Modal show={this.state.showConfirmDialog}>
					<Modal.Header>
					<Modal.Title>{this.state.title}</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						{this.state.message}
					</Modal.Body>

					<Modal.Footer>
						<Button onClick={this.state.cancelFunction}>Close</Button>
						<Button onClick={this.state.okFunction} bsStyle="primary">OK</Button>
					</Modal.Footer>
			    </Modal>
		  	</div>
		);
	}
}

export default ConfirmDialog;
