import React from 'react';
import {
    TextContent,
    Text,
    TextVariants,
    Spinner
} from '@patternfly/react-core';

import nl2br from "react-nl2br";

import {getHomeContents} from "../api/Main";

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
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100%'}}>
                <Spinner />
            </div>
        );

        return (
            <TextContent>
                <Text component={TextVariants.h1} style={{fontSize: "76px"}}>{this.state.data.siteName}</Text>
                <Text component={TextVariants.p}>{nl2br(this.state.data.homeContent)}</Text>
                <br />
                <i><Text component={TextVariants.p}>And now, a word from our sponsors...</Text></i>
                <Text component={TextVariants.blockquote}>{this.state.data.tagLine}</Text>
            </TextContent>
        );
    }
}
