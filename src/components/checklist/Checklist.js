import React, { Component } from 'react';
import './Checklist.css';
import { Well, PageHeader, Button, Breadcrumb } from 'react-bootstrap';
import BaseComponent from '../BaseComponent';
import ListChecklist from './ListChecklist';
import EditChecklist from './EditChecklist';

class Checklist extends BaseComponent {
   constructor(props) {
        super(props);
    }

    getBreadcrumb(id) {
        if (id == null) {
            return null;
        } else if (id=="new") {
            return <Breadcrumb.Item active>New </Breadcrumb.Item>
        } else {
            return <Breadcrumb.Item active>Edit </Breadcrumb.Item>
        }
    }

    getChild(id) {
        if (id == null) {
            return <ListChecklist />;
        } else if (id=="new") {
            return <EditChecklist ></EditChecklist>
        } else {
            return <EditChecklist id={id}></EditChecklist>
        }
    }

    render() {
        return (
            <div className="checklist">
                <Breadcrumb>
                    <Breadcrumb.Item href="/checklists" active={this.props.params.id == null ? true:false}>
                      Checklist
                    </Breadcrumb.Item>
                    {this.getBreadcrumb(this.props.params.id)}
                </Breadcrumb>

                {this.getChild(this.props.params.id)}
            </div>
        )
    }
}

export default Checklist;