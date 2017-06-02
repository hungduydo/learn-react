import React, { Component } from 'react';
import { Well, PageHeader, Button } from 'react-bootstrap';
import update from 'react-addons-update';
import BaseComponent from '../BaseComponent';
import UserDataProvider from '../../data_provider/UserDataProvider';

const ReactDataGrid = require('react-data-grid');
var loremIpsum = require('lorem-ipsum');

var columns = [
        {
            key: 'gcsid',
            name: 'GCSID',
            locked: true,
            width: 100,
            sortable: true
        },
        {
            key: 'name',
            name: 'Name',
            sortable: true
        },
        {
            key: 'email',
            name: 'Email',
            sortable: true
        },
        {
            key: 'role',
            name: 'Role',
            width: 150,
            sortable: true
        },
        {
            key: 'action',
            name: 'Action',
            width: 150,
        }
    ];

class ListUser extends BaseComponent {

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
    	let userProvider = new UserDataProvider();
    	self.confirmDialog.showConfirmDialog('Are you sure?', 'Delete User',
    		function() {
				userProvider.delete(id)
				.then(function(res) {
					self.createRows();
					self.notifyDialog.show('Success', 'success', 5000);
					self.confirmDialog.closeDialog();
				});
    		});
    }

    getActions(id) {
        return (
        	<div><Button href={"/user/" + id}>Edit</Button> <Button onClick={this.onDeleteRow.bind(this, id)}>Delete</Button></div>
    	);
    }

    createRows() {
    	let self = this;
        let userProvider = new UserDataProvider();

        userProvider.getList()
        .then(function(rowDataUser) {
        	// Add action for each rows data
        	rowDataUser = userProvider.addListActionTable("id", rowDataUser,
					self.getActions.bind(self));

			let originalRows = rowDataUser;;
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
                <Button bsSize="small" onClick={this.onDeleteBtClick}>Delete</Button> <Button bsSize="small" href="/user/new" >Add</Button>
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
                {this.renderConfirmDialog()}
                {this.renderNotify()}
                </div>
            )
    }
}

ListUser.propTypes = {
  rowKey: React.PropTypes.string.isRequired
};

ListUser.defaultProps = {
  rowKey:'id'
};

export default ListUser;
