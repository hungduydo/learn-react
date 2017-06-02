import React, { Component } from 'react';
import { Well, PageHeader, Button } from 'react-bootstrap';
import BaseComponent from '../BaseComponent';
import './Question.css';
import update from 'react-addons-update';

const ReactDataGrid = require('react-data-grid');
var loremIpsum = require('lorem-ipsum')
const { Editors, Formatters } = require('react-data-grid-addons');

const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters;

const difficulLevel = [
  { id: '1', value: '1', text: '1', title: '1' },
  { id: '2', value: '2', text: '2', title: '2' },
  { id: '3', value: '3', text: '3', title: '3' },
  { id: '4', value: '4', text: '4', title: '4' },
  { id: '5', value: '5', text: '5', title: '5' }
];
const IssueTypesEditor = <DropDownEditor options={difficulLevel}/>;

const IssueTypesFormatter = <DropDownFormatter options={difficulLevel} value="diff"/>;
var columns = [
        {
            key: 'id',
            name: 'ID',
            locked: true,
            width: 50
        },
        {
            key: 'quest',
            name: 'Question',
            editable: true,
            sortable: true
        },
        {
            key: 'note',
            name: 'Note',
            editable: true,
            sortable: true
        },
        {
            key: 'diff',
            name: 'Difficulity',
            width: 100,
            sortable: true,
            editor: IssueTypesEditor,
            formatter: IssueTypesFormatter
        }
        ];

class Question extends BaseComponent {

    constructor(props) {
        super(props);
        let originalRows = this.createRows(1000);
        let rows = originalRows.slice(0);

        this.state = {
          columns: columns,
          originalRows: originalRows,
          rows: rows,
          selectedIds:[]
        };

        ['getRandomDate','createRows','handleGridSort','rowGetter','onRowsSelected','onRowsDeselected','handleGridRowsUpdated','onDeleteBtClick'].map(fn => this[fn] = this[fn].bind(this));
    }

    getRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
    }

    createRows() {
        let rows = [];
        for (let i = 0; i < 10; i++) {
            rows.push({
                id: i,
                quest: 'Question' + i,
                note: loremIpsum(),
                diff: ['1','2','3','4','5'][Math.floor((Math.random() * 5))]
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
                <PageHeader>Sample Questions <br/><small>Question we suggergest using in checkpoint </small></PageHeader>
                <Button bsSize="small" onClick={this.onDeleteBtClick}>Delete</Button>
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

Question.propTypes = {
  rowKey: React.PropTypes.string.isRequired
};

Question.defaultProps = {
  rowKey:'id'
};

export default Question;