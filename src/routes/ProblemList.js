import React from 'react';
import {
    Text,
    TextVariants,
} from '@patternfly/react-core';

import {
    Table,
    TableHeader,
    TableBody,
    sortable,
    SortByDirection
} from "@patternfly/react-table";

import {motion} from "framer-motion";

import _ from "lodash";

import {getProblems} from "../api/Problems";

import PageVariant from "../components/PageVariant";

import WaitingSpinner from "../components/WaitingSpinner";

export default class ProblemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [
                {}
            ],
            columns: [
                { title: 'Name', transforms: [sortable] },
                { title: 'Users Solved', transforms: [sortable] },
                { title: 'AC %', transforms: [sortable] },
                { title: 'Points', transforms: [sortable] },
            ],
            rows: [
                ["", "", "", ""]
            ],
            sortBy: {},
            actions: [{
                title: 'Open',
                onClick: (event, rowId, rowData, extra) => {
                    let problem = _.find(this.state.data,{prettyName: rowData[0]});
                    this.props.history.push("/problems/" + problem.name);
                }
            }]
        };
        this.onSort = this.onSort.bind(this);
    }

    async componentDidMount() {
        await this.setState({data: (await getProblems()).data, loading: false});
        let rows = [];
        for (let i = 0; i  < this.state.data.length; i++) {
            rows.push([ this.state.data[i].prettyName, this.state.data[i].usersSolved, this.state.data[i].rateOfAC, this.state.data[i].totalPointsWorth ]);
        }
        await this.setState({rows});
        console.log(this.state.data);
    }

    onSort(_event, index, direction) {
        const sortedRows = this.state.rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
        this.setState({
            sortBy: {
                index,
                direction
            },
            rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
        });
    }


    render() {
        if(this.state.loading) return (
            <WaitingSpinner />
        );

        const { columns, rows, sortBy, actions } = this.state;
        return (
            <motion.div initial={"initial"} animate={"animate"} exit={"exit"} variants={PageVariant} key={window.location.pathname}>
                <Text component={TextVariants.h1} style={{fontSize: "38px"}}>Problems</Text>
                <Table aria-label="Sortable Table" sortBy={sortBy} onSort={this.onSort} cells={columns} rows={rows} actions={actions}>
                    <TableHeader />
                    <TableBody />
                </Table>
            </motion.div>
        );
    }
}
