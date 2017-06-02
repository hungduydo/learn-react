import React from 'react';
import './User.css';
import { Well, PageHeader, Button, Breadcrumb } from 'react-bootstrap';
import BaseComponent from '../BaseComponent';
import ListUser from './ListUser';
import EditUser from './EditUser';

class User extends BaseComponent {

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
            return <ListUser />;
        } else if (id=="new") {
            return <EditUser ></EditUser>
        } else {
            return <EditUser id={id}></EditUser>
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

export default User;
