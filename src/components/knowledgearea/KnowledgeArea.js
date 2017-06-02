import React, { Component } from 'react';
import { Well, PageHeader, Button, Breadcrumb } from 'react-bootstrap';
import './KnowledgeArea.css';
import ListKnowledgeArea from './ListKnowledgeArea';
import EditKnowledgeArea from './EditKnowledgeArea';
class KnowledgeArea extends React.Component {
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
            return <ListKnowledgeArea />;
        } else if (id=="new") {
            return <EditKnowledgeArea ></EditKnowledgeArea>
        } else {
            return <EditKnowledgeArea id={id}></EditKnowledgeArea>
        }
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/knowledge" active={this.props.params.id == null ? true:false}>
                      Knowledge Area
                    </Breadcrumb.Item>
                    {this.getBreadcrumb(this.props.params.id)}
                </Breadcrumb>

                {this.getChild(this.props.params.id)}
            </div>
        )
    }
}

export default KnowledgeArea;