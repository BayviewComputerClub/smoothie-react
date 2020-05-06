import React, {Component} from "react";
import {isAuth} from "../api/Auth";

export const defaultAuthState = {
    loggedIn: false,
    username: "",
    loginModal: false,

    isContest: false,
    contest: {},

    isError: true,
    errorMsg: ""
};

export const AuthContext = React.createContext(defaultAuthState);

// Note: Don't store too much here, updating causes a lot of rerenders.

export class AuthProvider extends Component {
    constructor(props) {
        super(props);

        let storedContext = JSON.parse(sessionStorage.getItem('AuthContext'));
        if(storedContext !== null) {
            this.state = storedContext;
        } else {
            this.state = defaultAuthState;
        }
        // Add a "setState" function which calls setState here.
        this.state.setState = this.setContextState;

        this.setAuthStatus();
    }

    async setAuthStatus() {
        if( !(await isAuth()) ) {
            console.log("User is *not* logged in.");
            this.setContextState({loggedIn: false});
        } else {
            console.log("User is logged in.")
        }
    }

    setContextState = async (state) => {
        console.log("Updated AuthContext: ");
        console.log(state);

        await this.setState(state);
        sessionStorage.setItem('AuthContext', JSON.stringify(this.state));
    };

    render() {
        return (
            <AuthContext.Provider value={this.state}>{this.props.children}</AuthContext.Provider>
        );
    }
}
