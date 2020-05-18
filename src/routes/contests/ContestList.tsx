import React, {Component} from "react";

import {Text, TextVariants, Tabs, Tab, Button, TextContent} from "@patternfly/react-core";
import {motion} from "framer-motion";
import moment from 'moment';

import {getContests} from "../../api/Contest";
import WaitingSpinner from "../../components/WaitingSpinner";
import PageVariant from "../../components/PageVariant";
import IContest from "../../api/interfaces/IContest";
import {
    ProblemInfoBar,
    ProblemInfoBarItem,
    ProblemInfoBarItemContent,
    ProblemInfoBarTitle
} from "../../components/ProblemInfoBar";
import {MdAccessTime} from "react-icons/md";
import {AuthContext} from "../../contexts/AuthContext";

interface IState {
    loading: boolean,
    contests?: IContest []

    activeTabKey: number
}
interface IProps {

}

class ContestList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: true,
            activeTabKey: 0
        }

    }

    handleTabClick = (event: any, tabIndex: any) => {
        this.setState({
            activeTabKey: tabIndex
        });
    };

    async componentDidMount(): Promise<void> {
        let contests = (await getContests()).data
        console.log(contests);

        await this.setState({contests, loading: false});
    }

    async joinContest(c: IContest) {
        console.log("Joining contest...");
        console.log(c.name);
        await this.context.setState({
            isContest: true,
            contest: c
        });
    }

    render() {
        if(this.state.loading) return (
            <WaitingSpinner />
        );

        let ContestTabJSX = [];
        for(let i = 0; i < this.state.contests!.length; i++) {
            let c = this.state.contests![i];
            ContestTabJSX.push(
                <Tab key={i} eventKey={i} title={c.prettyName}>
                    <br />
                    <ProblemInfoBar>
                        <ProblemInfoBarItem>
                            <ProblemInfoBarTitle style={{marginLeft: "10px"}}><MdAccessTime />Start Time</ProblemInfoBarTitle>
                            <ProblemInfoBarItemContent>{moment(c.timeStart).format('MMMM Do YYYY, h:mm:ss a')}</ProblemInfoBarItemContent>
                        </ProblemInfoBarItem>
                        <ProblemInfoBarItem>
                            <ProblemInfoBarTitle style={{marginLeft: "10px"}}><MdAccessTime />End Time</ProblemInfoBarTitle>
                            <ProblemInfoBarItemContent>{moment(c.timeEnd).format('MMMM Do YYYY, h:mm:ss a')}</ProblemInfoBarItemContent>
                        </ProblemInfoBarItem>
                    </ProblemInfoBar>
                    {this.context.isContest ?
                        <Button css={{}} onClick={() => {this.context.setState({isContest: false})}}>Leave Contest</Button>
                        :
                        <Button css={{}} onClick={() => {this.joinContest(c)}}>Join Contest</Button>
                    }

                    <br /><br />
                    <TextContent>
                        <h1>Description</h1>
                        <div dangerouslySetInnerHTML={{__html: c.renderedDescription}} />
                    </TextContent>
                </Tab>

            );
        }

        return (
            <div>
                <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={PageVariant} key={window.location.pathname}>
                    <Text component={TextVariants.h1} style={{fontSize: "38px"}}>Contests</Text>
                    <hr />
                    <br />
                    <Tabs css={{}} mountOnEnter activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
                        {ContestTabJSX}
                    </Tabs>

                </motion.div>
            </div>
        );
    }
}
ContestList.contextType = AuthContext;
export default ContestList;
