import React, {Component} from "react";

import {
    TextContent,
    Text, TextVariants
} from "@patternfly/react-core";

import {AuthContext} from "../contexts/AuthContext";

class Problem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <TextContent>
                    <Text component={TextVariants.h1}>Problems</Text>
                </TextContent>
            </div>
        );
    }

}
Problem.contextType = AuthContext;
export default Problem;
