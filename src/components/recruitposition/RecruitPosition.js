import React from 'react';
import './RecruitPosition.css';
import { Well, PageHeader, Button, Breadcrumb } from 'react-bootstrap';
import ListPosition from './ListPosition';
import EditPosition from './EditPosition';

class RecruitPosition extends React.Component {
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
            return <ListPosition />;
        } else if (id=="new") {
            return <EditPosition ></EditPosition>
        } else {
            return <EditPosition id={id}></EditPosition>
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/position" active={this.props.params.id == null ? true:false}>
                      Recruit Position
                    </Breadcrumb.Item>
                    {this.getBreadcrumb(this.props.params.id)}
                </Breadcrumb>

                {this.getChild(this.props.params.id)}
            </div>
        )
    }
}

export default RecruitPosition;