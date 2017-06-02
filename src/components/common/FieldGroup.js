import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Button, Col, Checkbox, FormControl, ControlLabel, HelpBlock, Grid, Row,Thumbnail } from 'react-bootstrap';

function FieldGroup({ id, label, type, cbOnChange, listOption, componentClass, help, options, ...props }) {
	options = options|| {};

	let disabled = options.disabled || false;
	let sizeLabel = options.sizeLabel || 2;
	let sizeField = options.sizeField || 10;

	let formControl = disabled ?
	        		(<FormControl type={type} {...props} componentClass={componentClass} onChange={cbOnChange} disabled></FormControl>):
        			(<FormControl type={type} {...props} componentClass={componentClass} onChange={cbOnChange}></FormControl>);

	if (type === "select") {
		formControl = disabled ?
	        		(<FormControl type={type} componentClass="select" placeholder="select"  {...props} onChange={cbOnChange} disabled>
        				{listOption}
        			</FormControl>)
        			:
        			(<FormControl type={type} componentClass="select" placeholder="select" {...props} onChange={cbOnChange}>
        				{listOption}
    				 </FormControl>);
	}

    return (
        <FormGroup controlId={id}>
	        <Col md={sizeLabel}>
	        	<ControlLabel>{label}</ControlLabel>
	        </Col>
	        <Col md={sizeField}>
	        	{formControl}
	            {help && <HelpBlock>{help}</HelpBlock>}
	        </Col>
        </FormGroup>
    );
}

export default FieldGroup;
