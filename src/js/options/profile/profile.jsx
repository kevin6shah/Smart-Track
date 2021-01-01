import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';

import './profile.css';
import ProfileImg from '../../../img/profile.png';
import SubmitButton from '../submitButton/submitButton';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            fetchState: 'idle'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ fetchState: 'loading' });
        firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
            .then((user) => {
                console.log('user', user, user.user.uid);
                localStorage.setItem('uid', user.user.uid);
                this.setState({ fetchState: 'success' });

                let role = user.role;
                if (!user.role) role = 'basic'

                this.props.onLoginStateChange(user.email, role, user.uid);

                // //if we want to route back to previous page
                // let history = this.props.history;
                // let location = this.props.location;
                // let { from } = location.state || { from: { pathname: "/" } };
                // history.replace(from);

            })
            .catch((error) => {
                console.log(error)
                this.setState({ fetchState: 'failure' });
            });
    }

    handleLogout(event) {
        event.preventDefault();
        this.setState({ fetchState: 'loading' });
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('uid');
                // this.setState({ fetchState: 'success' });
                this.props.onLoginStateChange('ANON', 'ROLE_ANON', null);

            })
            .catch(error => {
                console.log(error);
                // this.setState({ fetchState: 'failure' });
            });
    }

    render() {
        const profile = this.props.profile

        return (
            <div className="container w-75 mt-4 emp-profile">
                <form>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={ProfileImg} className="img-fluid rounded-pill h-50 w-50" alt="" />

                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                                <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {profile.displayName}
                                </h5>
                                <h6>
                                    {profile.uid}
                                    </h6>
                                <p className="proile-rating">ACCOUNT TYPE : <span>{profile.role.charAt(0).toUpperCase() +
                                        profile.role.toLowerCase().slice(1) + ' User'}</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn mb-2" name="btnAddMore" value="Edit Profile" />
                            <button type="btn"
                                className="btn btn-warning rounded-pill w-75"
                                name="log-out"
                                onClick={this.handleLogout} >
                                Log Out
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="">Website Link</a><br />
                                <a href="">Bootsnipp Profile</a><br />
                                <a href="">Bootply Profile</a>
                                <p>SKILLS</p>
                                <a href="">Web Designer</a><br />
                                <a href="">Web Developer</a><br />
                                <a href="">WordPress</a><br />
                                <a href="">WooCommerce</a><br />
                                <a href="">PHP, .Net</a><br />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile.username}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile.displayName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Hourly Rate</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>10$/hr</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Total Projects</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>230</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>English Level</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Availability</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>6 months</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Your Bio</label><br />
                                            <p>Your detail description</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;
