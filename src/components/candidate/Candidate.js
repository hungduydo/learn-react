import React, { Component } from 'react';
import BaseComponent from '../BaseComponent';
import './Candidate.css';
import { Well, PageHeader, Button, Breadcrumb } from 'react-bootstrap';
import ListCandidate from './ListCandidate';
import EditCandidate from './EditCandidate';

class Candidate extends BaseComponent {

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
            return <ListCandidate />;
        } else if (id=="new") {
            return <EditCandidate ></EditCandidate>
        } else {
            return <EditCandidate id={id}></EditCandidate>
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/user" active={this.props.params.id == null ? true:false}>
                      User
                    </Breadcrumb.Item>
                    {this.getBreadcrumb(this.props.params.id)}
                </Breadcrumb>

                {this.getChild(this.props.params.id)}
            </div>
        )
    }
}

export default Candidate;