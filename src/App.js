import React, { Component } from 'react';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash';
 
const nav = () => ([
  <Header.Item href="/some/link" key="1" title="Do Duy Hung" image="/img/user2-160x160.jpg" sidebarMini="true"/>
]);

var menustruct = [{title:"Home", href:"/home", icon:{ className: 'fa-dashboard' }},
                  {title:"Sample Questions", href:"/questions", icon:{ className: 'fa-question' }},
                  {title:"Sample Exercises", href:"/exercises", icon:{ className: 'fa-copy' }},
                  {title:"Checkpoints", href:"/checkpoints", icon:{ className: 'fa-check' }},
                  {title:"Knowledge Area", href:"/knowledge", icon:{ className: 'fa-bullseye' }},
                  {title:"Checklists", href:"/checklists", icon:{ className: 'fa-list' }},
                  {title:"Candidates", href:"/candidates", icon:{ className: 'fa-id-card' }},
                  {title:"Interview Session", href:"/interviewsession", icon:{ className: 'fa-wpexplorer' }},
                  {title:"User Account", href:"/user", icon:{ className: 'fa-user-o' }},
                  {title:"Recruit Position", href:"/position", icon:{ className: 'fa-slack' }}];

class App extends Component {
    constructor(props) {
        super(props);
        var activeMenu = 0;
        for (var i = 0; i < menustruct.length; i++) {
            if(props.location.pathname.indexOf(menustruct[i].href) >= 0){
                activeMenu = i;
                break;
            }
        }
        this.state = {
            accordion: true,
            activeMenu:activeMenu
        };
    
        ['onChange','renderSliderbar','renderMenuItem'].map(fn => this[fn] = this[fn].bind(this));
    }

    renderMenuItem(i){
        return (
            <Sidebar.Menu.Item key={i} title={menustruct[i].title} href={menustruct[i].href} icon={menustruct[i].icon} active={this.state.activeMenu == i ? true:false}/>
        );
    }

    renderSliderbar(){

        var indents = [];
        for (var i = 0; i < menustruct.length; i++) {
            indents.push(this.renderMenuItem(i));
        }
        return (
            <Sidebar.Menu header="NAVIGATION" key="1">
                {indents}
            </Sidebar.Menu>
        );
    }

    onChange(activeKey) {
        this.setState({
            activeKey,
        });
    }

    render() {
        return (
            <Dashboard
                navbarChildren={nav(this)}
                sidebarChildren={this.renderSliderbar()}
                theme="skin-blue">
                {this.props.children}
            </Dashboard>
        );
    }
}

export default App;
