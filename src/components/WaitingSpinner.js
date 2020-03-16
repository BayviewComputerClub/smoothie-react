import React, { Component } from "react"
import {Spinner} from "@patternfly/react-core";

export default class WaitingSpinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowSpinner: false
        };
        setTimeout(() => {
            this.setState({shouldShowSpinner: true});
        },100)
    }

    render() {
        if(this.state.shouldShowSpinner) {
            return (
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%'}}>
                    <Spinner />
                </div>
            );
        } else {
            return false;
        }

    }

}
