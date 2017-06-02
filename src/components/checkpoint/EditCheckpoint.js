import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Button, Col, Checkbox, FormControl, ControlLabel, HelpBlock, Well } from 'react-bootstrap';
import update from 'react-addons-update';
import RichTextEditor from 'react-rte';
import BaseComponent from '../BaseComponent';
import CheckpointDataProvider from '../../data_provider/CheckpointDataProvider';
import FieldGroup from '../common/FieldGroup';

const { Editors } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor } = Editors;

const ReactDataGrid = require('react-data-grid');
var loremIpsum = require('lorem-ipsum');
const priorities = [{ id: 0, title: 'Question 1' }, { id: 1, title: 'Question 2' }, { id: 2, title: 'Question 3' }, { id: 3, title: 'Question 4'} ];
const PrioritiesEditor = <AutoCompleteEditor options={priorities} />;
var columns = [
        {
            key: 'id',
            name: 'ID',
            locked: true,
            width: 75,
            sortable: true
        },{
            key: 'name',
            name: 'Name',
            sortable: true,
            editable: true,
            editor: PrioritiesEditor
        },{
            key: 'action',
            name: 'Action',
            width: 80
        }];

class EditCheckpoint extends BaseComponent {

    constructor(props) {
        super(props);

        this.keyDataState = 'checkpointData';
        let action = "new";

        if (this.props.hasOwnProperty("id")) {
        	action = "edit";
        	this.getCheckpoint(this.props.id);
        }

        let originalRows = this.createRows(3);
        let rows = originalRows.slice(0);

        this.state = {
    	    action: action,
            value: RichTextEditor.createEmptyValue(),
            checkpointData: {
	            knowledgeArea: '',
				title: ''
            },
            rows: rows,
            columns: columns,
            originalRows: originalRows
        };

        ['onDeleteBtClick','onChange','getActions','createRows','handleGridRowsUpdated','handleGridSort','rowGetter','onAddBtnClick', 'onSubmit'].map(fn => this[fn] = this[fn].bind(this));
    }

    getCheckpoint(id) {
    	let self = this;
    	let checkpointProvider = new CheckpointDataProvider();
    	checkpointProvider.get(id)
    	.then(function(checkpointData) {
    		self.setState({
    			checkpointData: checkpointData
    		});
    	});
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

    getActions(id) {
        return <Button onClick={this.onDeleteBtClick}>Delete</Button>
    }

    createRows(num) {
        if (num == null) {
            num = 0;
        }
        let rows = [];

        // Create empty row

        for (let i = 0; i < num; i++) {
            rows.push({
                id: "000" + i,
                name: 'Question ' + i,
                action: this.getActions(i)
            });
        }

        rows.push({
            id: '',
            name: '',
            action:(<Button onClick={this.onAddBtnClick}>Add</Button>)
        });

        return rows;
    }

    handleGridRowsUpdated({ fromRow, toRow, updated }) {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    }

    handleGridSort(sortColumn, sortDirection) {
        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };

        const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

        this.setState({ rows });
    }

    rowGetter(i) {
        return this.state.rows[i];
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

    onAddBtnClick(){
        let rows = this.state.rows.slice();
        // Send add request
        // Finish add request
        var id = Math.floor(Math.random()*80);
        var lastRow = rows[rows.length -1];
        lastRow.id = "000" +id;
        lastRow.action = this.getActions(id);
        rows.pop();
        rows.push(lastRow);

        rows.push({
            id: '',
            name: '',
            action:(<Button onClick={this.onAddBtnClick}>Add</Button>)
        });

        this.setState({ rows });
    }

    onSubmit() {
    	let self = this;
    	let checkpointProvider = new CheckpointDataProvider();

		let checkpointData = this.state[this.keyDataState];

		let isReverse = true;
		checkpointData =
			checkpointProvider.parseData(checkpointProvider.fieldsTable, checkpointData, isReverse);

		if (this.state.action === "new") {
			checkpointProvider.add(checkpointData)
	    	.then(function(dataRes) {
				self.notifyDialog.show('Success', 'success', 5000);
	    	})
	    	.catch(function(dataRes) {
				self.notifyDialog.show('Error', 'error', 5000);
	    	});
		} else {
			checkpointProvider.update(this.props.id, checkpointData)
	    	.then(function(dataRes) {
				self.notifyDialog.show('Success', 'success', 5000);
	    	})
	    	.catch(function(dataRes) {
				self.notifyDialog.show('Error', 'error', 5000);
	    	});
		}
    }

    render() {
        return (
            <Well>
                <Form horizontal>
                    {this.generateFieldGroup({
                            		label: 'Knowledge Area',
                            		type: 'text',
                            		id: 'formKnowledgeArea',
                            		keyData: 'knowledgeArea',
                            		options: {
                            			disabled: true
                            		}
                	})}

                	{this.generateFieldGroup({
                            		label: 'Title',
                            		id: 'formTitle',
                            		keyData: 'title',
                            		componentClass: 'textarea'
                	})}

                	{this.generateFieldGroup({
                            		label: 'Comment',
                            		id: 'formComment',
                            		keyData: 'comment',
                            		componentClass: 'textarea'
                	})}

                    <FormGroup controlId="checkpointcomment">
                        <ControlLabel>Suggest Questions</ControlLabel>

                        <ReactDataGrid
                        rowKey="id"
                        columns={this.state.columns}
                        rowGetter={this.rowGetter}
                        rowsCount={this.state.rows.length}
                        minHeight={400}
                        enableCellSelect={true}
                        onGridRowsUpdated={this.handleGridRowsUpdated}
                        />
                    </FormGroup>

                    <FormGroup controlId="exerciseHint">
	                	<Button onClick={this.onSubmit}>Submit</Button>
                    </FormGroup>
                </Form>
            </Well>
        )
    }
}

export default EditCheckpoint;