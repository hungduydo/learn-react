import React from 'react';
import './InterviewSession.css';

import { Well, PageHeader, Button, Breadcrumb } from 'react-bootstrap';
import ListInterviewSession from './ListInterviewSession';
import EditInterviewSession from './EditInterviewSession';

class InterviewSession extends React.Component {
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
            return <ListInterviewSession />;
        } else if (id=="new") {
            return <EditInterviewSession ></EditInterviewSession>
        } else {
            return <EditInterviewSession id={id}></EditInterviewSession>
        }
    }

    render() {
        return (
            <div className="interview-session">
                <Breadcrumb>
                    <Breadcrumb.Item href="/interviewsession" active={this.props.params.id == null ? true:false}>
                      Interview Session
                    </Breadcrumb.Item>
                    {this.getBreadcrumb(this.props.params.id)}
                </Breadcrumb>

                {this.getChild(this.props.params.id)}
            </div>
        )
    }
}

export default InterviewSession;