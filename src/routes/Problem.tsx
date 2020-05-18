import React, {Component} from "react";

import {
    TextContent,
    Text,
    TextVariants,
    Button
} from "@patternfly/react-core";

import renderMathInElement from "katex/dist/contrib/auto-render";
import ReactMarkdown from "react-markdown/with-html";

import Moment from "react-moment";

import {AuthContext} from "../contexts/AuthContext";
import {getProblem, submitProblemSolution} from "../api/Problems";

import {ProblemInfoBar, ProblemInfoBarItem, ProblemInfoBarTitle, ProblemInfoBarItemContent} from "../components/ProblemInfoBar";
import ProblemSubmitModal from "../components/ProblemSubmitModal";

import {MdDataUsage, MdTimer, MdLinearScale} from "react-icons/md";

import IProblem from "../api/interfaces/IProblem";
import PageVariant from "../components/PageVariant";
import {motion} from "framer-motion";
import WaitingSpinner from "../components/WaitingSpinner";
import SmoothieProblem from "../components/SmoothieProblem";
import {isAuth} from "../api/Auth";

interface IProps {
    match: any,
    history: any
}

interface IState {
    loading: boolean,
    submitModal: boolean,
    data?: IProblem
}


class Problem extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loading: true,
            submitModal: false
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
            <WaitingSpinner />
        );

        return (
            <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={PageVariant} key={window.location.pathname}>
                <ProblemSubmitModal history={this.props.history} problemID={this.props.match.params.id} open={this.state.submitModal} onClose={() => {this.setState({submitModal: false})}} />
                <TextContent>
                    <Text component={TextVariants.h1}>{this.state.data!.prettyName}</Text>
                    <hr />
                    {
                        this.context.loggedIn ?
                            <div><Button css={{}} onClick={async () => {
                                //await submitProblemSolution("aplusb")
                                this.setState({submitModal: true});
                            }} >Submit Solution</Button><br /><br /></div>
                            :
                            <p>You must be logged in to submit a problem solution!</p>
                    }
                    <hr />

                    <SmoothieProblem problem={this.state.data!} />

                    <hr />
                    <Button css={{}} onClick={() => {this.props.history.goBack();}}>Back</Button>
                </TextContent>
            </motion.div>
        );
    }

}

Problem.contextType = AuthContext;
export default Problem;
