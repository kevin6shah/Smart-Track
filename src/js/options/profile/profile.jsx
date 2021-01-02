import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import './profile.css';
import ProfileImg from '../../../img/profile.png';
import TrackedList from './TrackedList'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.init !== undefined ?
                this.props.init : 'about',
            fetchState: 'idle'
        };
        this.handleLogout = this.handleLogout.bind(this);
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

    onTabClick = (tab) => {
        this.setState({
            selected: tab
        })
    }

    render() {
        const profile = this.props.profile
        console.log(this.state.selected)

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
                                    {profile.username}
                                    </h6>
                                <p className="proile-rating">ACCOUNT TYPE : <span>{(profile.role !== undefined) ?
                                    profile.role.charAt(0).toUpperCase() +
                                        profile.role.toLowerCase().slice(1) + ' User' : 'User'}</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className={"nav-link" + ((this.state.selected === 'about') ? ' active' : '')}
                                            id="about-tab" data-toggle="tab" onClick={this.onTabClick.bind(this, 'about')} role="tab" aria-controls="about" aria-selected="true" style={{ cursor: 'pointer' }}>About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={"nav-link" + ((this.state.selected === 'tracklist') ? ' active' : '')}
                                            id="tracklist-tab" data-toggle="tab" onClick={this.onTabClick.bind(this, 'tracklist')} role="tab" aria-controls="tracklist" aria-selected="false" style={{ cursor: 'pointer' }}>Tracking List</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button type="btn"
                                className="profile-edit-btn mb-2 p-1"
                                name="btnAddMore" >
                                Edit
                            </button>
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
                                <div className={"tab-pane fade" + ((this.state.selected === 'about') ? ' show active' : '')}
                                    id="about" role="tabpanel" aria-labelledby="about-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{profile.uid}</p>
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
                                <div className={"tab-pane fade" + ((this.state.selected === 'tracklist') ? ' show active' : '')}
                                    id="tracklist" role="tabpanel" aria-labelledby="tracklist-tab">
                                    <TrackedList/>
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
