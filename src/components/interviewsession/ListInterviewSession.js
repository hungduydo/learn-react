import React, { Component } from 'react';
import { Well, PageHeader, Button, Label } from 'react-bootstrap';
import update from 'react-addons-update';

const ReactDataGrid = require('react-data-grid');
var loremIpsum = require('lorem-ipsum');

var columns = [
        {
            key: 'id',
            name: 'ID',
            locked: true,
            width: 50,
            sortable: true
        },{
            key: 'date',
            name: 'Date Time',
            width: 100,
            sortable: true
        },{
            key: 'place',
            name: 'Place',
            width: 100,
            sortable: true
        },{
            key: 'position',
            name: 'Position',
            width: 100,
            sortable: true
        },{
            key: 'candidates',
            name: 'Candidates',
            sortable: true
        },{
            key: 'interviewers',
            name: 'Interviewers',
            sortable: true
        },{
            key: 'status',
            name: 'Status',
            width: 75,
            sortable: true
        },{
            key: 'action',
            name: 'Action',
            width: 125,
        }
        ];

var listCandidates = [{'id':'CD01','name':'Nguyen Van A'},
                        {'id':'CD02','name':'Tran Van D'},
                        {'id':'CD03','name':'Pham Van B'},
                        {'id':'CD04','name':'Hoang Van C'},
                        {'id':'CD05','name':'Tran Van X'},
                        {'id':'CD06','name':'Nguyen Van Y'},
                        {'id':'CD07','name':'Tran Van Z'},
                        {'id':'CD08','name':'Le Van U'},
                        {'id':'CD09','name':'Pham Van K'},
                        {'id':'CD010','name':'Le Van A'},
                        {'id':'CD011','name':'Nguyen Van E'},
                        {'id':'CD012','name':'Le Van M'},
                        {'id':'CD013','name':'Tran Van N'},
                        {'id':'CD014','name':'Pham Van S'}
];

var listInterViewer = [{'id':'hoanghn','name':'Nguyen Huy Hoang'},
                        {'id':'loitn','name':'Nguyen Tan Loi'},
                        {'id':'vuhtt','name':'Trinh Hoang Vu'},
                        {'id':'quantn','name':'Nguyen Thanh Quan'}
];

class ListInterviewSession extends React.Component {

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
        return <div><Button href={"/interviewsession/" + id}>Edit</Button> <Button onClick={this.onDeleteBtClick}>Delete</Button></div>
    }

    randomDate(start, end) {
      var date = new Date(start + Math.random() * (end - start));
      var hour = 1 + Math.random() * 23 ;
      date.setHours(hour);
      return date;
    }


    formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var dateString = day + '/' + month + '/' + year;
        var timeString = date.getHours()+ ':' + date.getMinutes();
        return (<div className="iw-date">{dateString} <br/> {timeString} </div>);
    }
    
    getRandomCandidates() {
        var numCan = Math.floor(Math.random() * 5) + 1;
        var count = 0;
        var candidateFormat = listCandidates.map((candidate)=>{
            var ran = Math.floor(Math.random() * listCandidates.length);
            if (ran <= numCan && count < numCan) {
                count ++;
                return <a href={"/candidates/" + candidate.id} key={candidate.id} className="name-tag" title={"Some info about candidate " + candidate.name}><Label bsStyle="primary">{candidate.name}</Label>&nbsp;</a>;
            } else {
                return null;
            }
            
        });

        return (<div className="candidates-holder">{candidateFormat}</div>);
    }

    getListInterviewer() {
        var iwIndex = Math.floor(Math.random() * listInterViewer.length);
        var interviewer = listInterViewer[iwIndex];

        return (<div className="candidates-holder"><a href={"/user/" + interviewer.id} key={interviewer.id} className="name-tag" title={"Some info about candidate " + interviewer.name}><Label bsStyle="info">{interviewer.name}</Label></a></div>);
    }

    createRows() {
        let rows = [];
        for (let i = 0; i < 100; i++) {
            rows.push({
                id: "IS0" + i,
                date: this.formatDate(this.randomDate(1495260419106, 1500530819106)),
                place: (<div height="200">Room 303</div>),
                position: ["Front-End","Back-End","Full-Stack","Mobile","QA","QC","Embedded"][Math.floor((Math.random() * 7))],
                candidates: this.getRandomCandidates(),
                interviewers: this.getListInterviewer(),
                status: ['Ready','Accept','Finished'][Math.floor((Math.random() * 3))],
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
                <Button bsSize="small" onClick={this.onDeleteBtClick}>Delete</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button bsSize="small" href="/interviewsession/new" >Add</Button>
                <ReactDataGrid
                    rowKey="id"
                    onGridSort={this.handleGridSort}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.rows.length}
                    rowHeight={60}
                    minHeight={700}
                    />  
                </div>
            )
    }
}

ListInterviewSession.propTypes = {
  rowKey: React.PropTypes.string.isRequired
};

ListInterviewSession.defaultProps = {
  rowKey:'id'
};

export default ListInterviewSession;