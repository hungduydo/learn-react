import React, { Component } from 'react';
import { Well, PageHeader, Button } from 'react-bootstrap';
import update from 'react-addons-update';

const ReactDataGrid = require('react-data-grid');
var loremIpsum = require('lorem-ipsum');

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
            sortable: true
        },{
            key: 'action',
            name: 'Action',
            width: 150,
        }];

class ListKnowledgeArea extends React.Component {

    constructor(props) {
        super(props);

        ['createRows','handleGridSort','rowGetter','onRowsSelected','onRowsDeselected','handleGridRowsUpdated','onDeleteBtClick'].map(fn => this[fn] = this[fn].bind(this));
        
        let originalRows = this.createRows(1000);
        let rows = originalRows.slice(0);

        this.state = {
          columns: columns,
          originalRows: originalRows,
          rows: rows,
          selectedIds:[]
        };

        
    }

    getActions(id) {
        return <div><Button href={"/knowledge/" + id}>Edit</Button> <Button onClick={this.onDeleteBtClick}>Delete</Button></div>
    }

    createRows() {
        let rows = [];
        for (let i = 0; i < 100; i++) {
            rows.push({
                id: "000" + i,
                name: 'Knowledge Area ' + i,
                action: this.getActions(i)
            });
        }

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
                <Button bsSize="small" onClick={this.onDeleteBtClick}>Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button bsSize="small" href="/knowledge/new" >Add</Button>
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

ListKnowledgeArea.propTypes = {
  rowKey: React.PropTypes.string.isRequired
};

ListKnowledgeArea.defaultProps = {
  rowKey:'id'
};

export default ListKnowledgeArea;