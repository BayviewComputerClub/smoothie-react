import React, {Component} from "react";

export const defaultAuthState = {
    loggedIn: false,
    username: "",
    loginModal: false
};

export const AuthContext = React.createContext(defaultAuthState);

// Note: Don't store too much here, updating causes a lot of rerenders.

export class AuthProvider extends Component {
    constructor(props) {
        super(props);

        let storedContext = JSON.parse(localStorage.getItem('AuthContext'));
        if(storedContext !== null) {
            this.state = storedContext;
        } else {
            this.state = defaultAuthState;
        }

        // Add a "setState" function which calls setState here.
        this.state.setState = this.setContextState;
    }

    setContextState = (state) => {
        console.log("Updated AuthContext: ");
        console.log(state);

        this.setState(state);
        localStorage.setItem('AuthContext', JSON.stringify(this.state));
    };

    render() {
        return (
            <AuthContext.Provider value={this.state}>{this.props.children}</AuthContext.Provider>
        );
    }
}
