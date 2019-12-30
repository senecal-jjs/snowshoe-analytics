import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import Accordion from "./Accordion"
import AlphaForm from "./AlphaForm"

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

function EventList ({ events, alpha }) {
    const items = events || []
    return (
      <div style={{height: '100px'}}>
            {items.map((event, key) => (
                <div key={key}>
                    {event.data.map((data, index) => (
                        <Accordion
                            key={index}
                            title={data.teams[0] + " vs. " + data.teams[1]}
                            content="Average Odds (across surveyed betting houses): "
                            teams={data.teams}
                            sites={data.sites}
                            alpha={alpha}
                            commenceTime={data.commence_time}
                        />
                        // <div key={index}>
                        //     <h5>{data.teams[0]} {"vs."} {data.teams[1]}</h5>
                        //     <h6>{data.commence_time}</h6>
                        //     <p>{data.sites[0].site_nice}</p>
                        // </div>
                    ))}
                </div>
            ))}
        
      </div>
    )
  };

export default class SportingEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            response: [],
            alpha: 0.01,
            selectedSport: 'NBA'
        }

        this.updateAlpha = this.updateAlpha.bind(this)
        this.endpoint = ((process.env.NODE_ENV === 'production') ? 'http://localhost:5000' : 'http://localhost:5000')
    }

    updateAlpha(alpha) {
        this.setState({
            response: this.state.response,
            alpha: alpha
        })
    }

    componentDidMount() {
        if (this.props.selectedSport === 'NBA') {
            fetch(`${this.endpoint}/odds-machine/api/v1/nba`, {
                method: 'get',
                headers: new Headers({
                    'Access-Control-Allow-Origin': '*'
                })
            })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    response: [data], 
                    alpha: this.state.alpha,
                    selectedSport: this.props.selectedSport
                });
            })
            .catch(console.log)
        }
    }

    componentDidUpdate() {
        console.log(`${this.endpoint}/odds-machine`)
        if (this.state.selectedSport !== this.props.selectedSport) { 
            if (this.props.selectedSport === 'Premier League') {
                fetch(`${this.endpoint}/odds-machine/api/v1/premier-league`, {
                    method: 'get',
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*'
                    })
                })
                .then(res => res.json())
                .then((data) => {
                    this.setState({
                        response: [data], 
                        alpha: this.state.alpha,
                        selectedSport: this.props.selectedSport
                    });
                    
                })
                .catch(console.log)
            } else if (this.props.selectedSport === 'NFL') {
                fetch(`${this.endpoint}/odds-machine/api/v1/nfl`, {
                    method: 'get',
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*'
                    })
                })
                .then(res => res.json())
                .then((data) => {
                    this.setState({
                        response: [data], 
                        alpha: this.state.alpha,
                        selectedSport: this.props.selectedSport
                    });
                })
                .catch(console.log)
            } else if (this.props.selectedSport === 'NBA') {
                fetch(`${this.endpoint}/odds-machine/api/v1/nba`, {
                    method: 'get',
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*'
                    })
                })
                .then(res => res.json())
                .then((data) => {
                    this.setState({
                        response: [data], 
                        alpha: this.state.alpha,
                        selectedSport: this.props.selectedSport
                    });
                })
                .catch(console.log)
            } 
        }   
    }

    render() {
        return (
            <React.Fragment>
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
                            this.updateAlpha(values.alpha)
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
                <EventList events={this.state.response} alpha={this.state.alpha} />
            </React.Fragment>
        )
    }
}