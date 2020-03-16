import React, {Component} from "react";
import {NavItem} from "@patternfly/react-core";
import {withRouter} from "react-router-dom"
import styled from "styled-components";

const Hover = styled.div`
    &:hover {
        text-shadow: 0 0 5px #e0e0e0;
        color: rgb(21, 21, 21) !important;
        background-color: white;
        box-shadow: 0 0 8px white;
        transition: color 0.3s, background-color 0.3s, text-shadow 0.3s, box-shadow 0.3s;
        .pf-c-nav__link {
            color: black;
        }
    }
    .pf-m-current {
        background-color: white;
        color: black;
    }
`;

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
            <Hover>
                <NavItem preventDefault onClick={() => this.navigate()} isActive={this.isRoute()}>
                    {this.props.name}
                </NavItem>
            </Hover>
        );
    }

}

export default withRouter(RouterNavItem);
