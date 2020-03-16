import React, {Component} from "react";
import IUser from "../api/interfaces/IUser";
import WaitingSpinner from "../components/WaitingSpinner";

interface IState {
    loading: boolean,
    data?: IUser[]
}

export default class Rankings extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount(): void {
    }

    render() {
        if(this.state.loading) return (
            <WaitingSpinner />
        );

        return (
            <div>
                weeee
            </div>
        );
    }
}
