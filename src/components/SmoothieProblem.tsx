import React, {Component} from "react";
import {ProblemInfoBar, ProblemInfoBarItem, ProblemInfoBarItemContent, ProblemInfoBarTitle} from "./ProblemInfoBar";
import {MdDataUsage, MdLinearScale, MdTimer} from "react-icons/md";
import Moment from "react-moment";
import {Text, TextContent, TextVariants} from "@patternfly/react-core";
import ReactMarkdown from "react-markdown/with-html";
import IProblem from "../api/interfaces/IProblem";

interface IProps {
    problem: IProblem
}
export default class SmoothieProblem extends Component<IProps, any> {
    constructor(props: IProps) {
        super(props);

    }

    render() {
        return (
            <div>
                <ProblemInfoBar>
                    <ProblemInfoBarItem>
                        <ProblemInfoBarTitle style={{marginLeft: "10px"}}><MdDataUsage />Points</ProblemInfoBarTitle>
                        <ProblemInfoBarItemContent>{this.props.problem.totalPointsWorth}</ProblemInfoBarItemContent>
                    </ProblemInfoBarItem>
                    <ProblemInfoBarItem>
                        <ProblemInfoBarTitle><MdTimer/>Time Limit</ProblemInfoBarTitle>
                        <ProblemInfoBarItemContent>{this.props.problem.limits[0].timeLimit}</ProblemInfoBarItemContent>
                    </ProblemInfoBarItem>
                    <ProblemInfoBarItem>
                        <ProblemInfoBarTitle><MdLinearScale/>Memory Limit</ProblemInfoBarTitle>
                        <ProblemInfoBarItemContent>{this.props.problem.limits[0].memoryLimit}</ProblemInfoBarItemContent>
                    </ProblemInfoBarItem>
                    <ProblemInfoBarItem>
                        <ProblemInfoBarTitle>Created</ProblemInfoBarTitle>
                        <ProblemInfoBarItemContent><Moment>{this.props.problem.timeCreated}</Moment></ProblemInfoBarItemContent>
                    </ProblemInfoBarItem>
                </ProblemInfoBar>
                <hr style={{marginTop: "-40px"}}/>
                <Text component={TextVariants.p}><ReactMarkdown className={"problem-statement-area"} source={this.props.problem.problemStatement}/></Text>
            </div>
        );
    }

}
