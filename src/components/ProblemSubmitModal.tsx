import React, {Component} from "react";

import {
    Modal
} from "@patternfly/react-core";

interface IProps {
    open: boolean,
    onClose: any
}

export default class ProblemSubmitModal extends Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Modal
                isLarge
                title="Login"
                isOpen={this.props.open}
                onClose={() => this.props.onClose()}
                isFooterLeftAligned
            >
                WIP
            </Modal>
        );
    }
}

