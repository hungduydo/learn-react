import React, { PropTypes } from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel, HelpBlock, Well } from 'react-bootstrap';
import RichTextEditor from 'react-rte';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class EditPosition extends React.Component {
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
                      id="positionName"
                      type="text"
                      label="Name"
                      placeholder="Position name"
                    />

                    <FormGroup controlId="positionNote">
                      <ControlLabel>Note</ControlLabel>
                      <RichTextEditor
                        value={this.state.value}
                        onChange={this.onChange}
                      />
                    </FormGroup>

                    <FormGroup controlId="exerciseHint">
                        <Button type="submit" href="/position">
                          Cancel
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button type="submit">
                          Save
                        </Button>
                    </FormGroup>

                    
                </Form>
            </Well>
            )
    }
}

export default EditPosition;