import React, {Component} from "react";
import {isAuth, authInfo} from "../api/Auth";

export const defaultAuthState = {
    loggedIn: false,
    username: "",
    loginModal: false,

    isContest: false,
    contest: {},

    isAdmin: false,

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
            console.log("Loaded AuthContext from localstorage:");
            console.log(storedContext);
            this.state = storedContext;
        } else {
            this.state = defaultAuthState;
        }
        // Add a "setState" function which calls setState here.
        this.state.setState = this.setContextState;
        this.state.resetContext = this.resetContext;

        this.setAuthStatus();
    }

    async setAuthStatus() {
        if( !(await isAuth()) ) {
            console.log("User is *not* logged in.");
            await this.setContextState({isAdmin: false, loggedIn: false});
        } else {
            console.log("User is logged in.");
            let info = await authInfo();
            let isAdmin = false;
            for(let authority of info.authorities) {
                if(authority.authority === "ROLE_ADMIN" || authority.authority === "ROLE_EDITOR") {
                    console.log("User is an admin!");
                    isAdmin = true;
                }
            }
            await this.setContextState({isAdmin, loggedIn: true});
        }

    }

    resetContext = async () => {
        await this.setContextState(defaultAuthState);
        alert("Reset! You should now refresh the page.");
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
