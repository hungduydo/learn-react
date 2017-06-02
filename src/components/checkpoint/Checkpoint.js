import React, { Component } from 'react';
import BaseComponent from '../BaseComponent';
import './Checkpoint.css';
import { Well, PageHeader, Button, Breadcrumb } from 'react-bootstrap';
import ListCheckpoint from './ListCheckpoint';
import EditCheckpoint from './EditCheckpoint';

class Checkpoint extends BaseComponent {
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
            return <ListCheckpoint />;
        } else if (id=="new") {
            return <EditCheckpoint ></EditCheckpoint>
        } else {
            return <EditCheckpoint id={id}></EditCheckpoint>
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/checkpoints" active={this.props.params.id == null ? true:false}>
                      Checkpoint
                    </Breadcrumb.Item>
                    {this.getBreadcrumb(this.props.params.id)}
                </Breadcrumb>

                {this.getChild(this.props.params.id)}
            </div>
        )
    }
}

export default Checkpoint;