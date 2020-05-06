import React, {Component} from "react";

import {Text, TextVariants} from "@patternfly/react-core";
import {IRow, sortable, Table, TableBody, TableHeader} from "@patternfly/react-table";
import {motion} from "framer-motion";
import moment from 'moment';

import {getContests} from "../../api/Contest";
import WaitingSpinner from "../../components/WaitingSpinner";
import PageVariant from "../../components/PageVariant";

interface IState {
    loading: boolean,
    rows?: string[][],
    columns: any[]
}
interface IProps {

}

export default class ContestList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loading: false,
            columns: [
                { title: 'Name' },
                { title: 'Start Time'},
                { title: 'End Time'},
                { title: 'Submission Window'},
            ],
        }
    }

    async componentDidMount(): Promise<void> {
        let contests = (await getContests()).data
        console.log(contests);

        let rows: string[][] = [];
        for(let contest of contests){
            rows.push([
                contest.prettyName,
                moment(contest.timeStart).format('MMMM Do YYYY, h:mm:ss a'),
                moment(contest.timeEnd).format('MMMM Do YYYY, h:mm:ss a'),
                contest.submissionPeriod.toString()
            ]);
        }

        await this.setState({rows, loading: false});
    }

    render() {
        if(this.state.loading) return (
            <WaitingSpinner />
        );

        const { columns, rows } = this.state;
        return (
            <div>
                <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={PageVariant} key={window.location.pathname}>
                    <Text component={TextVariants.h1} style={{fontSize: "38px"}}>Contests</Text>
                    <Table  cells={columns} rows={rows!} >
                        <TableHeader />
                        <TableBody />
                    </Table>
                </motion.div>
            </div>
        );
    }
}
