import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types'

import './css/form.css'

export const Input = styled.input`
  width: 120px;
  height: 25px;
  border: ${props => props.border || '1px solid #ccc'};
  background-color: #fff;
`;

export const Button = styled.button`
  width: 100px;
  height: 29px;
  background-color: white;
  color: black;
  border-style: solid;
  border-width: 3px;
  border-color: black;
  border-radius: 3px;
`;

function AlphaForm(mySubmit) {
    const [alpha, setAlpha] = useState(0.05)
    
    return (
    <div className="alpha-form">
        <Formik
            initialValues={{ alpha: "" }}
            validate={values => {
                const errors = {};
                if (!/^(?:0*(?:\.\d+)?|1(\.0*)?)$/.test(values.alpha)) {
                    errors.alpha = "Must be a value between 0 and 1";
                }
                return errors;
            }}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                setAlpha(values.alpha);
                console.log(alpha);
                mySubmit.mySubmit(alpha);
                setTimeout(() => {
                    actions.setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <Field 
                        type="alpha" 
                        name="alpha" 
                        placeholder="Optional alpha value" 
                    />
                    <ErrorMessage name="alpha" component="div" />
                    <Button type="submit" disabled={isSubmitting}>
                        Submit 
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
    )
};

AlphaForm.propTypes = {
    mySubmit: PropTypes.func
}

export default AlphaForm; 