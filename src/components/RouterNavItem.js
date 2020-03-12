import React, {Component} from "react";
import {NavItem} from "@patternfly/react-core";
import {withRouter} from "react-router-dom"

class RouterNavItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    navigate() {
        this.props.history.push(this.props.route);
    }
    isRoute() {
        console.log(this.props.location.pathname);
        return this.props.location.pathname === this.props.route;
    }

    render() {
        return (
            <NavItem preventDefault onClick={() => this.navigate()} isActive={this.isRoute()}>
                {this.props.name}
            </NavItem>
        );
    }

}

export default withRouter(RouterNavItem);
