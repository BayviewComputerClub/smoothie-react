import React from 'react';
import {
    TextContent,
    Text,
    TextVariants,
} from '@patternfly/react-core';

import nl2br from "react-nl2br";

import {getHomeContents} from "../api/Main";
import {motion} from "framer-motion";
import PageVariant from "../components/PageVariant";
import WaitingSpinner from "../components/WaitingSpinner";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: {
                siteName: "",
                homeContent: "",
                tagLine: ""
            }
        };
    }

    async componentDidMount() {
        try{
            this.setState({data: (await getHomeContents()).data});
        } catch (e) {
            return;
        }
        this.setState({loading: false});
        console.log(this.state.data);
    }

    render() {
        if(this.state.loading) return (
            <WaitingSpinner />
        );

        return (
            <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={PageVariant} key={window.location.pathname}>
                <TextContent>
                    <Text component={TextVariants.h1} style={{fontSize: "76px"}}>{this.state.data.siteName}</Text>
                    <Text component={TextVariants.p}>{nl2br(this.state.data.homeContent)}</Text>
                    <br />
                    <i><Text component={TextVariants.p}>And now, a word from our sponsors...</Text></i>
                    <Text component={TextVariants.blockquote}>{this.state.data.tagLine}</Text>
                </TextContent>
            </motion.div>
        );
    }
}
