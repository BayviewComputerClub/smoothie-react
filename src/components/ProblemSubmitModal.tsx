import React, {Component} from "react";

import {
    Modal,
    TextArea,
    Button
} from "@patternfly/react-core";

import {submitProblemSolution} from "../api/Problems";

interface IState {
    code: string
}

interface IProps {
    history: any
    open: boolean,
    onClose: any,
    problemID: string,
}

export default class ProblemSubmitModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            code: ""
        };
    }

    async submitButton() {
        let submissionID = await submitProblemSolution(this.props.problemID, this.state.code);
        this.props.history.push('/problems/submissions/' + submissionID);
    }

    render() {
        return (
            <Modal
                isLarge
                title="Submit Problem Solution"
                isOpen={this.props.open}
                onClose={() => this.props.onClose()}
                isFooterLeftAligned
            >
                <TextArea onChange={(v) => this.setState({code: v})}/>
                <br /><br />
                <Button css={{}} onClick={() => this.submitButton()}>
                    Submit
                </Button>
            </Modal>
        );
    }
}

