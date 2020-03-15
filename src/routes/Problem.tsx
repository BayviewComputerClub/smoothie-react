import React, {Component} from "react";

import {
    TextContent,
    Text, TextVariants, Spinner, Button
} from "@patternfly/react-core";

import katex from "katex";
import renderMathInElement from "katex/dist/contrib/auto-render";
import ReactMarkdown from "react-markdown/with-html";

import {AuthContext} from "../contexts/AuthContext";
import {getProblem} from "../api/Problems";

import IProblem from "../api/interfaces/IProblem";

interface IProps {
    match: any,
    history: any
}

interface IState {
    loading: boolean,
    data?: IProblem
}


class Problem extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loading: true,
        };


    }

    async componentDidMount() {

        let data: IProblem = (await getProblem(this.props.match.params.id)).data;

        await this.setState({data, loading: false});

        console.log(this.state.data);
    }

    componentDidUpdate() {
        renderMathInElement(document.body, {
            delimiters: [
                {left: "$$", right: "$$", display: false}
            ]
        });
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
                    <Button css={{}} onClick={() => {this.props.history.goBack();}}>Back</Button>
                    <Text component={TextVariants.h1}>Problem - {this.state.data!.prettyName}</Text>
                    <hr />
                    <Text component={TextVariants.p}><ReactMarkdown className={"problem-statement-area"} source={this.state.data!.problemStatement}/></Text>
                    <Text component={TextVariants.p}>Execution Time Limit: {this.state.data!.limits[0].timeLimit}</Text>
                </TextContent>
            </div>

        );
    }

}

Problem.contextType = AuthContext;
export default Problem;
