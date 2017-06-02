import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Button, Col, Checkbox, FormControl, ControlLabel, HelpBlock, Well, Table } from 'react-bootstrap';
import update from 'react-addons-update';
import RichTextEditor from 'react-rte';
import './CheckForm.css';


var listCheckpoints = [{'id':'cp0001','name':'Mulththreading/Synchronized, Interface, static'},
                        {'id':'cp0002','name':'String operations (equals, substring), StringBuffer'},
                        {'id':'cp0003','name':'Memory, reference, GC'},
                        {'id':'cp0004','name':'Exception handling'},
                        {'id':'cp0005','name':'Core Data, Properties (setters/getters), Extensions'},
                        {'id':'cp0006','name':'Common object, Categories, Protocols'},
                        {'id':'cp0007','name':'Memory management (ARC)'},
                        {'id':'cp0008','name':'Blocks, Threads'},
                        {'id':'cp0009','name':'Debugging techniques, Garbage Collections'},
                        {'id':'cp0010','name':'heap/stack/data/code'},
                        {'id':'cp0011','name':'Virtual addressing'},
                        {'id':'cp0012','name':'Common mistakes for mem leak'},
                        {'id':'cp0013','name':'Design pattern'},
                        {'id':'cp0014','name':'Using UML'},
                        {'id':'cp0015','name':'Design experience'},
                        {'id':'cp0016','name':'Give coding exercise'},
                        {'id':'cp0017','name':'Thread, process, concurency programing, semaphore, mutex'},
                        {'id':'cp0018','name':'IPC'},
                        {'id':'cp0019','name':'Activity, Service life cycle'},
                        {'id':'cp0020','name':'Layout, Fragment'},
                        {'id':'cp0021','name':'Web Services Interaction'},
                        {'id':'cp0022','name':'UIKit'},
                        {'id':'cp0023','name':'Navigation'},
                        {'id':'cp0024','name':'Application life cycle'},
                        {'id':'cp0025','name':'Muntil-language'},
                        {'id':'cp0026','name':'Application storage'}];

var knowledgeDetail = {'KL001' : {'id':'KL001','name':'Java(Android)', 
            'checkpoints':[{'id':'cp0001','name':'Mulththreading/Synchronized, Interface, static'},
                            {'id':'cp0002','name':'String operations (equals, substring), StringBuffer'},
                            {'id':'cp0003','name':'Memory, reference, GC'},
                            {'id':'cp0004','name':'Exception handling'}]},

            'KL002': {'id':'KL002','name':'Objective-C',
            'checkpoints':[{'id':'cp0001','name':'Core Data, Properties (setters/getters), Extensions'},
                            {'id':'cp0002','name':'Common object, Categories, Protocols'},
                            {'id':'cp0003','name':'Memory management (ARC)'},
                            {'id':'cp0004','name':'Blocks, Threads'},
                            {'id':'cp0005','name':'Debugging techniques, Garbage Collections'}]},

            'KL003': {'id':'KL003','name':'Memory management',
            'checkpoints':[{'id':'cp0001','name':'heap/stack/data/code'},
                            {'id':'cp0002','name':'Virtual addressing'},
                            {'id':'cp0003','name':'Common mistakes for mem leak'}]},

            'KL004': {'id':'KL004','name':'OOP', 'checkpoints':[]},

            'KL005': {'id':'KL005','name':'Algorithm', 'checkpoints':[]},

            'KL006': {'id':'KL006','name':'Design', 
            'checkpoints':[{'id':'cp0001','name':'Design pattern'},
                            {'id':'cp0002','name':'Using UML'},
                            {'id':'cp0003','name':'Design experience'}]},

            'KL007': {'id':'KL007','name':'Coding', 'checkpoints':[{'id':'cp0001','name':'Give coding exercise'}]},

            'KL008': {'id':'KL008','name':'Unit testing', 'checkpoints':[]},

            'KL009': {'id':'KL009','name':'Concurent programing',
            'checkpoints':[{'id':'cp0001','name':'Thread, process, concurency programing, semaphore, mutex'},{'id':'cp0001','name':'IPC'}]},

            'KL010': {'id':'KL010','name':'Android',
            'checkpoints':[{'id':'cp0001','name':'Activity, Service life cycle'},
                            {'id':'cp0002','name':'Layout, Fragment'},
                            {'id':'cp0003','name':'Web Services Interaction'}]},

            'KL011': {'id':'KL011','name':'iOS',
            'checkpoints':[{'id':'cp0001','name':'UIKit'},
                            {'id':'cp0002','name':'Navigation'},
                            {'id':'cp0003','name':'Application life cycle'},
                            {'id':'cp0003','name':'Muntil-language'},
                            {'id':'cp0003','name':'Application storage'}]},
};


var listKnowledge = [{'id':'KL001','name':'Java(Android)'},
                    {'id':'KL002','name':'Objective-C'},{'id':'KL003','name':'Memory management'},{'id':'KL004','name':'OOP'},{'id':'KL005','name':'Algorithm'},
                    {'id':'KL006','name':'Design'},{'id':'KL007','name':'Coding'},{'id':'KL008','name':'Unit testing'},{'id':'KL009','name':'Concurent programing'},
                    {'id':'KL010','name':'Android'},{'id':'KL011','name':'iOS'},{'id':'KL012','name':'Windows Phone'},{'id':'KL013','name':'Teamwork'},
                    {'id':'KL020','name':'Problem solving'},{'id':'KL021','name':'Communication'},{'id':'KL022','name':'Motivation'},{'id':'KL023','name':'Estimation'},
                    {'id':'KL030','name':'Requirement analysis'},{'id':'KL031','name':'Architecture'},{'id':'KL032','name':'Planning'},{'id':'KL033','name':'Presenttation'},{'id':'KL034','name':'Coaching'},{'id':'KL035','name':'Documenting'},{'id':'KL036','name':'Motivation'}];

var baseCheck = [
    {'name':'Fundamental',
    'knowledges':[]},

    {'name':'Advance',
    'knowledges':[]},

    {'name':'Soft skills',
    'knowledges':[]},

    {'name':'Other',
    'knowledges':[]}
]

class CheckRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            removeClick:props.removeCb,
            editable: props.editable
        };
    }

    componentWillReceiveProps(props, state){
        this.setState({data:props.data});
        this.setState({editable:props.editable});
    }

    render() {
        return (
                <tr>
                    <td>&nbsp; {this.state.editable ? <Button bsSize="xsmall" onClick={this.state.removeClick}>-</Button> : " - " } {this.props.data.title}</td>
                    <td width="50" className="cp-type">O</td>
                </tr>

            )
    }
}

class CheckTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            editable: props.editable
        };
    }

    componentWillReceiveProps(props, state){
        this.setState({data:props.data});
        this.setState({editable:props.editable});
    }

    removeCheckpoint(index) {
        var data = this.state.data.slice();
        data.splice(index, 1);
        this.setState({data});
    }

    addCheckpoint(checkpointId) {
        var data = this.state.data.slice();
        var checkpointAdd;
        listCheckpoints.map((checkpoint) => {
            if (checkpoint.id == checkpointId) {
                checkpointAdd = checkpoint;    
            }
        });
        data.push(checkpointAdd);
        this.setState({data});
    }

    getKnowledgeLastRow() {
        if (this.state.editable) {
            return (
                <tr>
                    <td colSpan="2"><AddCheckpoint checkpoints={listCheckpoints} addClick={(checkpointId)=>this.addCheckpoint(checkpointId)}/></td>
                </tr>
                )
        } else {
            if (this.state.data.length == 0) {
                return (<tr>
                    <td> </td>
                    <td width="50" className="cp-type">O</td>
                </tr>)
            } else {
                return null;
            }
        }
    }

    buildCheckRow() {
        if (this.state.data.length == 1 && this.state.data[0].title == "") {
            return (<tbody>
                    {this.getKnowledgeLastRow()}
                    </tbody>);
        } else {
            return (<tbody>
                    {this.state.data.map((checkpoint, i) => <CheckRow data={checkpoint}  removeCb={() => this.removeCheckpoint(i)}  key={i}/>)}
                    {this.getKnowledgeLastRow()}
                </tbody>);
        }
    }

    render() {
        return (
            <Table>
                    {this.buildCheckRow()}

            </Table>
        )
    }
}

class KnowledgeRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            removeClick:props.removeCb,
            editable: props.editable
        };
    }

    componentWillReceiveProps(props, state){
        this.setState({data:props.data});
        this.setState({editable:props.editable});
    }

    render() {
        return (
                <tr>
                    <td width="200">&nbsp; {this.state.editable ? <Button bsSize="xsmall" onClick={this.state.removeClick}>-</Button> : " " } {this.props.data.name}</td>
                    <td><CheckTable data={this.props.data.checkpoints == null ? [] : this.props.data.checkpoints} editable={this.state.editable}/></td>
                </tr>

            )
    }
}


class KnowledgeTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            editable: props.editable
        };
    }

    componentWillReceiveProps(props, state){
        this.setState({data:props.data});
        this.setState({editable:props.editable});
    }

    removeKnowlegdge(index){
        var data = this.state.data.slice();
        data.splice(index, 1);
        this.setState({data});
    }

    addKnowlegdge(knowledgeId){
        // Request server to get knowledge data
        var knowledgeData = knowledgeDetail[knowledgeId];

        if (knowledgeData == null) {
            listKnowledge.map((knowledge, index) => {
                if (knowledge.id == knowledgeId) {
                    knowledgeData = knowledge;    
                }
            });
        }
        var data = this.state.data.slice();
        data.push(knowledgeData);
        this.setState({data});
    }

    getKnowledgeLastRow(){
        if (this.state.editable) {
            return (<tr>
                        <td colSpan="3"><AddKnowledge knowledges={listKnowledge} addClick={(knowledgeId)=>this.addKnowlegdge(knowledgeId)}/></td>
                    </tr>)
        } else {
            return null;
        }
    }

    render() {
        return (
            <Table hover bordered>
                <tbody>
                    {this.state.data.map((knowledge, i) => <KnowledgeRow data={knowledge} removeCb={() => this.removeKnowlegdge(i)} key={i} editable={this.state.editable}/>)}
                    {this.getKnowledgeLastRow()}
                </tbody>
            </Table>
        )
    }
}

class AddCheckpoint extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.checkpoints,
            addClick: props.addClick,
            knowledgeId: '',
            active: false
        };
    }

    componentWillReceiveProps(props, state){
        this.setState({data:props.checkpoints});
    }

    handleChange(e) {
        var knowledgeId = e.target.value;
        this.setState({knowledgeId:knowledgeId});
    }

    addClick(){
        if (this.state.active) {
            this.state.addClick(this.state.knowledgeId);
            this.setState({active:false});
        } else {
            this.setState({active:true});
        }
        
    }

    showCheckpoints() {
        if (this.state.active) {
            return (<FormControl componentClass="select" className="checkpoint-select" placeholder="select" onChange={(event)=>this.handleChange(event)}>
                <option value="0" key="000000">-----------------------------------</option>
                {this.state.data.map((knowledge, index) => <option value={knowledge.id} key={knowledge.id}>{knowledge.name}</option>)}
            </FormControl>)
        } else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <Form inline>
            <FormGroup controlId="checklist-position">
                {this.showCheckpoints()}
                <Button bsSize="xsmall" onClick={()=>this.addClick()}>+</Button>
            </FormGroup>
        </Form>)
    }
}

class AddKnowledge extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.knowledges ? props.knowledges : [],
            addClick: props.addClick,
            knowledgeId: '',
            active: false
        };
    }

    componentWillReceiveProps(props, state){
        this.setState({data:props.knowledges});
    }

    handleChange(e) {
        var knowledgeId = e.target.value;
        this.setState({knowledgeId:knowledgeId});
    }

    addClick(){
        if (this.state.active) {
            this.state.addClick(this.state.knowledgeId);
            this.setState({active:false});
        } else {
            this.setState({active:true});
        }
        
    }

    showKnowledgeList() {
        if (this.state.active) {
            return (<FormControl componentClass="select" placeholder="select" width="200" onChange={(event)=>this.handleChange(event)}>
                <option value="0" key="000000">-----------------------------------</option>
                {this.state.data.map((knowledge, index) => <option value={knowledge.id} key={knowledge.id}>{knowledge.name}</option>)}
            </FormControl>)
        } else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <Form inline>
            <FormGroup controlId="checklist-position" width="200" >
                {this.showKnowledgeList()}
                <Button bsSize="small" onClick={()=>this.addClick()}>+</Button>
            </FormGroup>
        </Form>)
    }
}

class Area extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            editable: props.editable
        };
    }

    componentWillReceiveProps(props, state){
        this.setState({data:props.data});
        this.setState({editable:props.editable});
    }

    render() {
        return (
                <tr>
                    <td width="100">{this.state.data.name}</td>
                    <td colSpan="3"><KnowledgeTable data={this.state.data.knowledges} editable={this.state.editable}/></td>
                </tr>
                
            )
    }
}

class CheckForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            editable: props.editable
        };
    }

    componentWillReceiveProps(props, state){
        this.setState({data:props.data});
        this.setState({editable:props.editable});
    }

    render() {
        return (
            <Table bordered className="check-form">
            <thead>
            <tr><th>Area</th><th width="200">Knowledge</th><th>Checkpoint</th><th width="50">Type</th></tr>
            </thead>
            <tbody>
                {this.state.data.map((area, index) => <Area data={area} editable={this.state.editable} key={index}/>)}
            </tbody>
            </Table>)
    }
}

export default CheckForm;