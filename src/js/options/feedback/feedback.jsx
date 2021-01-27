import React, { Component } from 'react'
import emailjs from 'emailjs-com';
import Spinner from 'react-bootstrap/Spinner'

export default class Feedback extends Component {
    state = {
        feedback: '',
        submitted: false,
        loading: false,
    }

    onClick = () => {
        if (this.state.submitted === false && this.state.feedback !== '') {
            this.setState({
                loading: true,
            })
            emailjs.send('gmail',
                'template_t92tl44',
                {
                    message: this.state.feedback
                },
                'user_mCKAX6PKNGeCEB913LlKJ')
            .then((result) => {
                console.log(result.text);
                this.setState({
                    loading: false,
                    submitted: true,
                })
            });
        }
    }

    onChange = (e) => {
        this.setState({
            feedback: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Feedback</h1>
                    <p className="lead">
                        Any feedbacks, questions, potential features you would like to see?
                    </p>
                    {this.state.loading ? <Spinner className='m-4'
                        animation="border" variant="primary" /> : 
                    this.state.submitted === false ?
                        <div>
                            <div className="input-group mb-4">
                                <textarea className="form-control"
                                    value={this.state.feedback}
                                    onChange={this.onChange}
                                    style={{ height: '200px' }} />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.onClick}>Submit</button>
                        </div> :
                        <div>
                            <i className="fa fa-check mt-4 mb-2" style={{
                                color: '#4caf50',
                                fontSize: '70px',
                            }}></i>
                            <p className="lead">
                                Your feedback was successfully submitted. Thank you!
                            </p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
