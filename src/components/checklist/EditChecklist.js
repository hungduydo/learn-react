import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Button, Col, Checkbox, FormControl, ControlLabel, HelpBlock, Well, Table } from 'react-bootstrap';
import update from 'react-addons-update';
import ChecklistDataProvider from '../../data_provider/ChecklistDataProvider';
import RichTextEditor from 'react-rte';
import CheckForm from '../CheckForm/CheckForm';

var baseStruct = [
    {'name':'Fundamental',
        'knowledges':[
        {'id':'ka001','name':'Android', 'checkpoints':[
            {'id':'cp0001','title':'Know oop'},
            {'id':'cp0002','title':'Know thread'},
            {'id':'cp0003','title':'Know activities'}
        ]},
        {'id':'ka002','name':'Objective-C', 'checkpoints':[
            {'id':'cp0001','title':'Know oop'},
            {'id':'cp0002','title':'Know class'},
            {'id':'cp0003','title':'Know activities'}
        ]},
        {'id':'ka003','name':'Window Phone', 'checkpoints':[]}
        ]},

        {'name':'Advance',
        'knowledges':[
        {'id':'ka001','name':'MVC', 'checkpoints':[
            {'id':'cp0001','title':'Know oop'},
            {'id':'cp0002','title':'Know thread'},
            {'id':'cp0003','title':'Know activities'}
        ]}]},

        {'name':'Soft skills',
        'knowledges':[
        {'id':'ka001','name':'Communicate', 'checkpoints':[
            {'id':'cp0001','title':'Know oop'},
            {'id':'cp0002','title':'Know thread'},
            {'id':'cp0003','title':'Know activities'}
        ]}]},

        {'name':'Other',
        'knowledges':[
            {'id':'ka001','name':'Manage skill', 'checkpoints':[
                {'id':'cp0001','title':'Have self study'},
                {'id':'cp0002','title':'Have good skill'}
        ]}]}
]

var baseChecklist = [
    {'name':'Fundamental',
    'knowledges':[]},

    {'name':'Advance',
    'knowledges':[]},

    {'name':'Soft skills',
    'knowledges':[]},

    {'name':'Other',
    'knowledges':[]}
]

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class EditChecklist extends React.Component {
    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        
        ['onChange','createRows','handleGridRowsUpdated','handleGridSort','rowGetter'].map(fn => this[fn] = this[fn].bind(this));

        let originalRows = this.createRows(3);
        let rows = originalRows.slice(0);
        this.state = {
            rows: rows,
            originalRows: originalRows,
            checklistData: {},
            position: '',
            rootChecklist: baseChecklist
        };

        
    }

    componentDidMount() {
        var dataGetter = new ChecklistDataProvider();
        var self = this;
        dataGetter.get('592d3f3f6cb8c3146c0e284f').then((res) =>{
            window.console.log(res);
            self.setState({rootChecklist:res.knowledgeAreas});
            self.setState({position:res.position.name + ' ' + res.position.division + ' checklists'});
            // var a = this.state.rootChecklist.slice();
            // a.push({'name':'Other',
            // 'knowledge':[
            //     {'id':'ka001','name':'Manage skill', 'checkpoints':[
            //         {'id':'cp0001','name':'Have self study'},
            //         {'id':'cp0002','name':'Have good skill'}
            // ]}]});
            // this.setState({rootChecklist:a});
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

    createRows(num) {
        if (num == null) {
            num = 0;
        }
        let rows = [];

        rows.push({
            area: 'Fundamental',
            knowledge:'Adroid'
        });
        rows.push({
            area: 'Advance'
        });
        rows.push({
            area: 'Soft Skills'
        });
        rows.push({
            area: 'Others'
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

    onSaveBtnClick(){
        // Save all data
        window.console.log('Save it');
    }

    render() {
        return (
            <Well>
                    <FieldGroup
                      id="checklist-name"
                      type="text"
                      label="Name"
                      placeholder="Checklist name"
                      value={this.state.position}
                    />

                    <FormGroup controlId="checklist-position">
                        <ControlLabel>Position</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="PS1">Front-End</option>
                            <option value="PS2">Back-End</option>
                            <option value="PS3">Full-Stack</option>
                            <option value="PS4">Mobile</option>
                            <option value="PS5">QA</option>
                            <option value="PS6">QC</option>
                            <option value="PS7">Embedded</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="checklist-position">
                        <ControlLabel>Build Checklist</ControlLabel>
                        <CheckForm data={this.state.rootChecklist} editable={true} ></CheckForm>
                    </FormGroup>

                    <FormGroup controlId="checklist-position">
                        <Button href="/checklists">Cancel</Button>&emsp;<Button onClick={this.onSaveBtnClick.bind(this)}>Save</Button>
                    </FormGroup>
            </Well>)
    }
}

export default EditChecklist;