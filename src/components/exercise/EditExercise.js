import React, { Component, PropTypes } from 'react';
import './Exercise.css';
import { Form, FormGroup, Button, Col, Checkbox, FormControl, ControlLabel, HelpBlock, Well } from 'react-bootstrap';
import update from 'react-addons-update';
import RichTextEditor from 'react-rte';
import BaseComponent from '../BaseComponent';

const ReactDataGrid = require('react-data-grid');
var loremIpsum = require('lorem-ipsum');

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class EditExercise extends BaseComponent {
    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            value: RichTextEditor.createEmptyValue()
        };

        ['onDeleteBtClick','onChange'].map(fn => this[fn] = this[fn].bind(this));
    }

    onDeleteBtClick() {
        let rows = this.state.rows.slice();
        for (let i = 0; i < rows.length; i++) {
            let rowToDelete = rows[i];
            if(this.state.selectedIds.indexOf(rowToDelete.id) > -1) {
               rows.splice(i, 1);
               i--;
            }
        }
        // clear all selected index
        this.setState({ selectedIndexes:[] });
        this.setState({ rows });
    }

    onChange(value) {
        this.setState({value});
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
    }

    render() {
        return (
            <Well>
                <Form>
                    <FieldGroup
                      id="exerciseTitle"
                      type="text"
                      label="Title"
                      placeholder="Enter title"
                    />

                    <FormGroup controlId="exerciseContent">
                      <ControlLabel>Content</ControlLabel>
                      <RichTextEditor
                        value={this.state.value}
                        onChange={this.onChange}
                      />
                    </FormGroup>

                    <FormGroup controlId="diffSelect">
                        <ControlLabel>Difficul</ControlLabel>
                        <FormControl componentClass="select" placeholder="select">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup controlId="exerciseHint">
                      <ControlLabel>Hint</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Enter exercise hint here"/>
                    </FormGroup>

                    <Button type="submit">
                      Submit
                    </Button>
                </Form>
            </Well>
            )
    }
}

export default EditExercise;
