import React, {Component} from "react";
import WaitingSpinner from "../components/WaitingSpinner";
import PageVariant from "../components/PageVariant";
import {motion} from "framer-motion";
import {
    Text, TextContent,
    TextVariants

} from "@patternfly/react-core";

import {getProblemWS} from "../api/Problems";

interface IState {
    loading: boolean,
    data?: any,
    subInfo?: any
}
interface IProps {
    match: any
}

export default class ProblemSubmission extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
            subInfo: [[]]
        };
    }

    async componentDidMount() {
        let waitingForData = true;
        let socket = await getProblemWS();

        socket.addEventListener('open', e => {
            console.log('Connected to websocket.');
            socket.send(this.props.match.params.id);
        });
        socket.addEventListener('close', e => {
            console.log('Disconnected from websocket.');
        });

        socket.addEventListener('message', e => {
            console.log("Got WS Data:");
            console.log(e.data);
            let data = JSON.parse(e.data);
            if(waitingForData) {
                this.setState({data: data});
                for(let batchCase of data.batchCases) {
                    console.log(batchCase)
                    let subInfo = this.state.subInfo;
                    if(typeof subInfo[batchCase.batchNumber] === "undefined") {
                        subInfo[batchCase.batchNumber] = [];
                    }
                    subInfo[batchCase.batchNumber][batchCase.caseNumber] = batchCase;
                    this.setState({subInfo});
                }
                waitingForData = false;
                this.setState({loading: false});
                return;
            }
            // New Data
            if(data.status === "JUDGING") {
                let subInfo = this.state.subInfo;
                subInfo[data.batchCases[0].batchNumber][data.batchCases[0].caseNumber] = data.batchCases[0];
                this.setState({subInfo});
            }

        });
    }

    render() {
        if(this.state.loading) return (
            <WaitingSpinner />
        );

        let casesJSX = [];
        for(let batch of this.state.subInfo) {
            for(let pcase of batch) {
                casesJSX.push(
                    <div key={pcase.batchNumber + "-" + pcase.caseNumber}>
                        <b>Batch {pcase.batchNumber}, Case {pcase.caseNumber} - {pcase.resultCode} {pcase.error ? "(" + pcase.error + ")" : ""}</b>
                        <br />
                    </div>

                )
            }
        }
        return (
            <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={PageVariant} key={window.location.pathname}>
                <TextContent>
                    <Text component={TextVariants.h1}>Results for submission: {this.props.match.params.id}</Text>
                    <hr />
                    {casesJSX}
                </TextContent>
            </motion.div>
        );
    }

}
