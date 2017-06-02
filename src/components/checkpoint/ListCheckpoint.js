import React, { Component } from 'react';
import { Well, PageHeader, Button } from 'react-bootstrap';
import update from 'react-addons-update';
import BaseComponent from '../BaseComponent';
import CheckpointDataProvider from '../../data_provider/CheckpointDataProvider';

const ReactDataGrid = require('react-data-grid');
var loremIpsum = require('lorem-ipsum');

var columns = [
        {
            key: 'knowledgeArea',
            name: 'Knowledge Area',
            locked: true,
            width: 250,
            sortable: true
        },{
            key: 'title',
            name: 'Title',
            sortable: true
        },
        {
            key: 'action',
            name: 'Action',
            width: 150,
        }
    ];

class ListCheckpoint extends BaseComponent {

    constructor(props) {
        super(props);
        this.createRows();

        this.state = {
          columns: columns,
          originalRows: [],
          rows: [],
          selectedIds:[]
        };

        ['createRows','handleGridSort','rowGetter','onRowsSelected','onRowsDeselected','handleGridRowsUpdated','onDeleteBtClick'].map(fn => this[fn] = this[fn].bind(this));
    }

    onDeleteRow(id) {
    	let self = this;
    	let checkpointProvider = new CheckpointDataProvider();
    	self.confirmDialog.showConfirmDialog('Are you sure?', 'Delete checkpoint',
    		function() {
				checkpointProvider.delete(id)
				.then(function(res) {
					self.createRows();
					self.notifyDialog.show('Success', 'success', 3000);
					self.confirmDialog.closeDialog();
				});
    		});
    }

    getActions(id) {
        return <div><Button href={"/checkpoints/" + id}>Edit</Button> <Button onClick={this.onDeleteRow.bind(this, id)}>Delete</Button></div>
    }

    createRows() {
        let rows = [];
        let self = this;
        let checkpointProvider = new CheckpointDataProvider();

        checkpointProvider.getList()
        .then(function(rowData) {
        	// Add action for each rows data
        	rowData = checkpointProvider.addListActionTable("id", rowData,
					self.getActions.bind(self));

			let originalRows = rowData;;
			let rows = originalRows.slice(0);

			self.setState({
				originalRows: originalRows,
				rows: rows,
			});
        });
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

    onRowsSelected(rows) {
        this.setState({selectedIds: this.state.selectedIds.concat(rows.map(r => r.row[this.props.rowKey]))});
    }

    onRowsDeselected(rows) {
        let rowIds = rows.map(r =>  r.row[this.props.rowKey]);
        this.setState({selectedIds: this.state.selectedIds.filter(i => rowIds.indexOf(i) === -1 )});
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

    render() {
        return (
            <div>
                <Button bsSize="small" onClick={this.onDeleteBtClick}>Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button bsSize="small" href="/checkpoints/new" >Add</Button>
                <ReactDataGrid
                    rowKey="id"
                    onGridSort={this.handleGridSort}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.rows.length}
                    minHeight={500}
                    enableCellSelect={true}
                    onGridRowsUpdated={this.handleGridRowsUpdated}
                    rowSelection={{
                        showCheckbox: true,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy: {
                          keys: {rowKey: this.props.rowKey, values: this.state.selectedIds}
                        }
                    }}/>
                </div>
            )
    }
}

ListCheckpoint.propTypes = {
  rowKey: React.PropTypes.string.isRequired
};

ListCheckpoint.defaultProps = {
  rowKey:'id'
};

export default ListCheckpoint;