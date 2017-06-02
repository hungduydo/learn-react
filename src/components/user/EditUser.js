import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Button, Col, Checkbox, FormControl, ControlLabel, HelpBlock, Grid, Row,Thumbnail } from 'react-bootstrap';
import update from 'react-addons-update';
import RichTextEditor from 'react-rte';
import BaseComponent from '../BaseComponent';
import UserDataProvider from '../../data_provider/UserDataProvider';
import FieldGroup from '../common/FieldGroup';

class EditUser extends BaseComponent {
    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.keyDataState = 'userData';
        let action = "new";

        if (this.props.hasOwnProperty("id")) {
        	action = "edit";
        	this.getUser(this.props.id);
        }

        this.getRoleList();

        this.state = {
        	roleList: [],
        	action: action,
            value: RichTextEditor.createEmptyValue(),
            userData: {
	            id: '',
				name: '',
				email: '',
				title: '',
				username: '',
				gcsid: '',
				role: '',
				password: ''
            }
        };

        ['onDeleteBtClick','onChange', 'onSubmit'].map(fn => this[fn] = this[fn].bind(this));
    }

    getRoleList() {
    	let self = this;
    	let userProvider = new UserDataProvider();
    	userProvider.getRoleList()
    	.then(function(res) {
    		self.setState({
    			roleList: res.data.hits
    		});
    	});
    }

    getUser(id) {
    	let self = this;
    	let userProvider = new UserDataProvider();
    	userProvider.get(id)
    	.then(function(userData) {
    		self.setState({
    			userData: userData
    		});
    	});
    }

    onDeleteBtClick() {
        let rows = this.state.rows.slice();
        for (let i = 0; i < rows.length; i++) {
            let rowToDelete = rows[i];
            if(this.state.selectedIds.indexOf(rowToDelete.id) > -1) {
               rows.splice(i, 1);
               i--;
            }
        }

        // clear all selected index
        this.setState({ selectedIndexes:[] });
        this.setState({ rows });
    }

    onChange(value) {
        this.setState({value});
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
    }

    onSubmit() {
    	let self = this;
    	let userProvider = new UserDataProvider();

		let userData = this.state[this.keyDataState];

		let isReverse = true;
		userData =
			userProvider.parseData(userProvider.fieldsTable, userData, isReverse);

		if (this.state.action === "new") {
			userProvider.add(userData)
	    	.then(function(userDataRes) {
				self.notifyDialog.show('Success', 'success', 5000);
	    	})
	    	.catch(function(userDataRes) {
				self.notifyDialog.show('Error', 'error', 5000);
	    	});
		} else {
			userProvider.update(this.props.id, userData)
	    	.then(function(userDataRes) {
				self.notifyDialog.show('Success', 'success', 5000);
	    	})
	    	.catch(function(userDataRes) {
				self.notifyDialog.show('Error', 'error', 5000);
	    	});
		}
    }

    render() {
    	let isDisable = this.state.action === "new" ? false : true;

        return (
            <Grid>
            	<Form horizontal>
	                    <Col md={2}>
	                       <Thumbnail src="/img/user2-160x160.jpg" alt="242x200">
	                            <p>
	                              <Button bsStyle="default">Upload Photo</Button>
	                            </p>
	                        </Thumbnail>
	                    </Col>
	                    <Col md={5} mdPush={5}>
	                            {this.generateFieldGroup({
                            		label: 'Username',
                            		id: 'formUsername',
                            		type: 'text',
                            		keyData: 'username',
                            		options: {
                            			disabled: isDisable
                            		}
                            	})}

	                            {this.generateFieldGroup({
                            		label: 'Role',
                            		id: 'selectRole',
                            		type: 'select',
                            		keyData: 'role',
                            		generateOption: {
                            			keyValue: '_id',
                            			keyText: 'name',
                            			data: this.state.roleList
                            		}
                            	})}

	                            {isDisable ? '' : this.generateFieldGroup({
                            		label: 'Password',
                            		id: 'formPassword',
                            		type: 'password',
                            		keyData: 'password'
                            	})}
	                    </Col>
	                    <Col md={5} mdPull={5}>
                            	{this.generateFieldGroup({
                            		label: 'GCSID',
                            		id: 'formGcsid',
                            		type: 'text',
                            		keyData: 'gcsid',
                            		options: {
                            			disabled: isDisable
                            		}
                            	})}

                        		{this.generateFieldGroup({
                            		label: 'Title',
                            		id: 'formTitle',
                            		type: 'text',
                            		keyData: 'title'
                            	})}

                            	{this.generateFieldGroup({
                            		label: 'Name',
                            		id: 'formName',
                            		type: 'text',
                            		keyData: 'name'
                            	})}

                            	{this.generateFieldGroup({
                            		label: 'Email',
                            		id: 'formEmail',
                            		type: 'text',
                            		keyData: 'email'
                            	})}
	                  	</Col>
		                <Col md={12}>
		                	<Button onClick={this.onSubmit}>Submit</Button>
		                </Col>
            	</Form>
            	{this.renderConfirmDialog()}
            	{this.renderNotify()}
              </Grid>
            )
    }


}

export default EditUser;
