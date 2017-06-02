import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Button, Col, Row, PageHeader, FormControl, ControlLabel, HelpBlock, Well, Table, Label } from 'react-bootstrap';
import update from 'react-addons-update';
import RichTextEditor from 'react-rte';
import CheckForm from '../CheckForm/CheckForm';
import PersonalInfo from '../common/PersonalInfo'

var DateTimeField = require('react-bootstrap-datetimepicker');

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

var interviewers = [{'id':'1','img':'https://yt3.ggpht.com/-FGgAW7BwvQQ/AAAAAAAAAAI/AAAAAAAAAAA/UQxDqsaNDyo/s88-c-k-no-mo-rj-c0xffffff/photo.jpg','name':"Quang Le"},
                    {'id':'2','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Le Quyen"},
                    {'id':'3','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"My Tam"},
                    {'id':'4','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Nhu Quynh"},
                    {'id':'5','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Dan Truong"}];

var candidates = [{'id':'1','img':'https://yt3.ggpht.com/-FGgAW7BwvQQ/AAAAAAAAAAI/AAAAAAAAAAA/UQxDqsaNDyo/s88-c-k-no-mo-rj-c0xffffff/photo.jpg','name':"Do Duy Hung"},
                    {'id':'2','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Trinh Hoang Vu"},
                    {'id':'3','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Nguyen Huy Hoang"},
                    {'id':'4','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Le Van Tri"},
                    {'id':'5','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Le Trung Thao"},
                    {'id':'6','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Nguyen Thanh Quan"},
                    {'id':'7','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Tran Thanh Phong"},
                    {'id':'8','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Nguyen Tan Loi"},
                    {'id':'9','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Phan Van Tai"},
                    {'id':'10','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Nguyen Trung Hieu"},
                    {'id':'11','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Luong Kiem Minh"},
                    {'id':'12','img':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlEet1lYtmJCP-gx_NYFOX2kpaSgIrPsQtkjHlRDoOH7vXAMVD','name':"Le Truong"}]

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class EditInterviewSession extends React.Component {
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
            interviewers:[],
            candidates:[],
            originalRows: originalRows,
            rootChecklist: baseStruct,
            interviewEditting: false,
            candidateEditting: false
        };

        
    }

    componentDidMount() {
        // Load interview session detail
        // save it to state
        var cloneIWS = this.state.interviewers.slice();
        cloneIWS.push(interviewers[0]);
        this.setState({interviewers:cloneIWS});

        var cloneCans = this.state.candidates.slice();
        cloneCans.push(candidates[0]);
        cloneCans.push(candidates[1]);
        this.setState({candidates:cloneCans});
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

    onSaveBtnClick() {
        // Save all data
    }

    onAddInterviewerClick() {
        if (this.state.interviewEditting) {
            this.setState({interviewEditting:false});
        } else {
            this.setState({interviewEditting:true});
        }
    }

    onRemoveInterviewerClick(interviewer) {
        var cloneIWS = this.state.interviewers.slice();

        cloneIWS.map((iwObj, index)=>{
            if (iwObj.id !== interviewer.id) {
                cloneIWS.splice(index, 1);
            }
        });

        this.setState({interviewers:cloneIWS});
    }

    onAddCandidateClick() {
        if (this.state.candidateEditting) {
            this.setState({candidateEditting:false});
        } else {
            this.setState({candidateEditting:true});
        }
    }

    onRemoveCandidateClick(candidate) {
        var cloneCans = this.state.candidates.slice();

        cloneCans.map((canObj, index)=>{
            if (canObj.id !== candidate.id) {
                cloneCans.splice(index, 1);
            }
        });

        this.setState({candidates:cloneCans});
    }

    onSelectInterviewer (evet) {
        var id = evet.target.value;
        var selectedIW;
        interviewers.map((canObj)=>{
            if (canObj.id == id) {
                selectedIW = canObj;
            }
        });

        if (selectedIW != null) {
            var cloneCans = this.state.interviewers.slice();
            cloneCans.push(selectedIW);
            this.setState({interviewers:cloneCans});
        }

        this.setState({interviewEditting:false});
    }

    onSelectCandidate( event) {
        var id = event.target.value;
        var selectCan;
        candidates.map((canObj)=>{
            if (canObj.id == id) {
                selectCan = canObj;
            }
        });

        if (selectCan != null) {
            var cloneCans = this.state.candidates.slice();
            cloneCans.push(selectCan);
            this.setState({candidates:cloneCans});
        }

        this.setState({candidateEditting:false});
        
    }

    render() {
        return (
            <Well>  
                <h3>Infomation</h3>
                <Form inline>
                    <Row className="show-grid">
                        <Col xs={3} md={3}>
                            <FormGroup controlId="checklist-position">
                                <ControlLabel>Date</ControlLabel>
                                {' '}
                                <div className="iw-datepick">
                                    <DateTimeField widgetClasses="date-pick"/>
                                </div>
                                
                            </FormGroup>
                        </Col>
                        <Col xs={3} md={3}>
                            <FormGroup controlId="formInlinePlace">
                                <ControlLabel>Place</ControlLabel>
                                {' '}
                                <FormControl type="text" type="email" placeholder="Arangge Room" value="Room 303"/>
                            </FormGroup>
                        </Col>
                        
                        <Col xs={3} md={3}>
                            <FormGroup controlId="checklist-position">
                                <ControlLabel>Position</ControlLabel>
                                {' '}
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
                        </Col>

                        <Col xs={3} md={3}>
                            <FormGroup controlId="formInlinePosition">
                                <ControlLabel>Place</ControlLabel>
                                {' '}
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="PS1">Schedule</option>
                                    <option value="PS1">Accept</option>
                                    <option value="PS2">Finish</option>
                                    <option value="PS3">Cancel</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        
                    </Row>
                </Form>
                   
                <h3>Interviewers</h3>

                <Form inline>
                    {this.state.interviewers.map((interviewer, index)=>{
                        return <PersonalInfo data={interviewer} editable onClick={()=>this.onRemoveInterviewerClick(interviewer)} key={index}/>
                    })}
                    
                    <FormGroup className="new-interviewer">
                        <ControlLabel>
                            <Button width="32" onClick={()=>this.onAddInterviewerClick()}>+</Button>
                        </ControlLabel>
                        {' '}
                        {this.state.interviewEditting ? (
                            <FormControl componentClass="select" placeholder="select" onChange={(event)=>this.onSelectInterviewer(event)}>
                            {interviewers.map((inwObj)=>{
                                return <option value={inwObj.id}>{inwObj.name}</option>
                            })}
                        </FormControl>) : null}
                    </FormGroup>
                </Form>

                <h3>Candidates</h3>

                <Form inline>
                    {this.state.candidates.map((candidate, index)=>{
                        return <PersonalInfo data={candidate} editable  onClick={()=>this.onRemoveCandidateClick(candidate)} key={index}/>
                    })}
                    
                    <FormGroup className="new-interviewer">
                        <ControlLabel>
                            <Button width="32" onClick={()=>this.onAddCandidateClick()}>+</Button>
                        </ControlLabel>
                        {' '}
                        {this.state.candidateEditting ? (
                            <FormControl componentClass="select" placeholder="select" onChange={(event)=>this.onSelectCandidate(event)}>
                            {candidates.map((inwObj)=>{
                                return <option value={inwObj.id}>{inwObj.name}</option>
                            })}
                        </FormControl>) : null}
                    </FormGroup>
                </Form>

                <h3>Checklist</h3>
                <FormGroup controlId="checklist-position">
                    <CheckForm data={this.state.rootChecklist} editable={false}></CheckForm>
                </FormGroup>

                <FormGroup controlId="checklist-position">
                    <Button href="/interviewsession">Cancel</Button>&emsp;<Button onClick={this.onSaveBtnClick()}>Save</Button>
                </FormGroup>
            </Well>)
    }
}

export default EditInterviewSession;