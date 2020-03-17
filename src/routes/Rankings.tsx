import React, {Component} from "react";
import IUser from "../api/interfaces/IUser";
import WaitingSpinner from "../components/WaitingSpinner";
import {getAllUsers} from "../api/Main";
import PageVariant from "../components/PageVariant";
import {motion} from "framer-motion";
import {
    TextContent,
    Text, TextVariants
} from "@patternfly/react-core";

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

    async componentDidMount(): Promise<void> {
        let data = ( await getAllUsers() ).data;
        console.log(data);
        this.setState({loading: false, data})
    }

    render() {
        if(this.state.loading) return (
            <WaitingSpinner />
        );

        let rankingJSX = [];
        for(let i = 0; i < this.state.data!.length; i++) {
            rankingJSX.push(
              <div>
                  <Text component={TextVariants.h2}>{this.state.data![i].handle} - {this.state.data![i].points}</Text>
              </div>
            );
        }

        return (
            <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={PageVariant} key={window.location.pathname}>
                <TextContent>
                    <Text component={TextVariants.h1}>Rankings</Text>
                    <hr />
                    {rankingJSX}
                </TextContent>
            </motion.div>
        );
    }
}
