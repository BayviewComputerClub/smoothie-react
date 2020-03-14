import React, {Component} from "react";

import {
    TextContent,
    Text, TextVariants, Spinner
} from "@patternfly/react-core";

import {AuthContext} from "../contexts/AuthContext";
import {getProblem} from "../api/Problems";

class Problem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        await this.setState({data: ( await getProblem(this.props.match.params.id) ).data, loading: false})
    }

    render() {
        if(this.state.loading) return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%'}}>
                <Spinner />
            </div>
        );

        return (
            <div>
                <TextContent>
                    <Text component={TextVariants.h1}>Problem - {this.state.data.prettyName}</Text>

                </TextContent>
            </div>
        );
    }

}
Problem.contextType = AuthContext;
export default Problem;
