import React, {Component} from "react";

import {
    TextContent,
    Text, TextVariants, Spinner, Button
} from "@patternfly/react-core";

import renderMathInElement from "katex/dist/contrib/auto-render";
import ReactMarkdown from "react-markdown/with-html";

import Moment from "react-moment";

import {AuthContext} from "../contexts/AuthContext";
import {getProblem} from "../api/Problems";

import {ProblemInfoBar, ProblemInfoBarItem, ProblemInfoBarTitle, ProblemInfoBarItemContent} from "../components/ProblemInfoBar";

import {MdDataUsage, MdTimer, MdLinearScale} from "react-icons/md";

import IProblem from "../api/interfaces/IProblem";
import PageVariant from "../components/PageVariant";
import {motion} from "framer-motion";

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
            <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={PageVariant} key={window.location.pathname}>
                <TextContent>
                    <Button css={{}} onClick={() => {this.props.history.goBack();}}>Back</Button>
                    <Text component={TextVariants.h1}>{this.state.data!.prettyName}</Text>
                    <hr />
                    <ProblemInfoBar>
                        <ProblemInfoBarItem>
                            <ProblemInfoBarTitle style={{marginLeft: "10px"}}><MdDataUsage />Points</ProblemInfoBarTitle>
                            <ProblemInfoBarItemContent>{this.state.data?.totalPointsWorth}</ProblemInfoBarItemContent>
                        </ProblemInfoBarItem>
                        <ProblemInfoBarItem>
                            <ProblemInfoBarTitle><MdTimer/>Time Limit</ProblemInfoBarTitle>
                            <ProblemInfoBarItemContent>{this.state.data?.limits[0].timeLimit}</ProblemInfoBarItemContent>
                        </ProblemInfoBarItem>
                        <ProblemInfoBarItem>
                            <ProblemInfoBarTitle><MdLinearScale/>Memory Limit</ProblemInfoBarTitle>
                            <ProblemInfoBarItemContent>{this.state.data?.limits[0].memoryLimit}</ProblemInfoBarItemContent>
                        </ProblemInfoBarItem>
                        <ProblemInfoBarItem>
                            <ProblemInfoBarTitle>Created</ProblemInfoBarTitle>
                            <ProblemInfoBarItemContent><Moment>{this.state.data?.timeCreated}</Moment></ProblemInfoBarItemContent>
                        </ProblemInfoBarItem>
                    </ProblemInfoBar>
                    <hr style={{marginTop: "-40px"}}/>
                    <Text component={TextVariants.p}><ReactMarkdown className={"problem-statement-area"} source={this.state.data!.problemStatement}/></Text>
                </TextContent>
            </motion.div>

        );
    }

}

Problem.contextType = AuthContext;
export default Problem;
