import React, {Component} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import IContest from "../../api/interfaces/IContest";

interface IProps {
    match: any,
    history: any
}
interface IState {
    loading: boolean,
    data?: IContest
}
class Contest extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentDidMount(): Promise<void> {

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

Contest.contextType = AuthContext;
export default Contest;
