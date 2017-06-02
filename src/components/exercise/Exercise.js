import React, { Component } from 'react';
import './Exercise.css';
import { Well, PageHeader, Button, Breadcrumb } from 'react-bootstrap';
import BaseComponent from '../BaseComponent';
import ListExercise from './ListExercise';
import EditExercise from './EditExercise';


class Exercise extends BaseComponent {

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
            return <ListExercise />;
        } else if (id=="new") {
            return <EditExercise ></EditExercise>
        } else {
            return <EditExercise id={id}></EditExercise>
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/exercises" active={this.props.params.id == null ? true:false}>
                      Sample Exercise
                    </Breadcrumb.Item>
                    {this.getBreadcrumb(this.props.params.id)}
                </Breadcrumb>

                {this.getChild(this.props.params.id)}
            </div>
        )
    }
}

export default Exercise;