import React from 'react';
import { FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';

class PersonalInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            editable: props.editable
        };
    }

    render() {
        return (
                <FormGroup className="interviewer">
                    <ControlLabel>
                        <img width="32" height="32" src={this.state.data.img}/>
                    </ControlLabel>
                    <FormControl.Static>{this.state.data.name}</FormControl.Static>
                    {this.state.editable ? <Button bsSize="xsmall" onClick={this.props.onClick}>-</Button>:null}
                </FormGroup>
            )
    }
}

export default PersonalInfo;