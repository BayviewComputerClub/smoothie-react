import styled from "styled-components";
import React, {Component} from "react";
import Draggable from 'react-draggable';
import {MdDragHandle} from "react-icons/md";
import moment from 'moment';

import {AuthContext} from "../contexts/AuthContext";

const ClockBox = styled.div`
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    border-radius: 5px;
    position: fixed;
    background: linear-gradient(60deg, #2c3e50, #607d8b);
    padding: 10px 15px 10px 15px;
    text-align: center;
    cursor: move;
    color: white;
    box-shadow: 0 6.4px 14.4px 0 rgba(0, 0, 0, .132), 0 10.2px 30.6px 0 rgba(0, 0, 0, .108);
    z-index: 10;
    transition: box-shadow 0.5s, border-radius 0.5s, background 0.5s;
    
    bottom: 0px;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    
    &:hover {
        box-shadow: 0 16px 24px 0 rgba(0, 0, 0, .202), 0 10px 30px 0 rgba(0, 0, 0, .158);
        border-radius: 7px;
        transition: box-shadow 0.5s, border-radius 0.5s;
    }
`;

// Copied from smoothie-web
function startContestClockBox() {
    let contestClockBoxTime = document.getElementById("contest-clock-box-time")!;

    // countdown
    function formatCountDownNums(num: number): string {
        return ('0' + Math.trunc(num)).slice(-2);
    }

    function updateCountDown(): void {
        let origCountdownTime = 1000;
        let nTime = origCountdownTime - Date.now();
        contestClockBoxTime.innerText = "";
        if (formatCountDownNums(nTime / (1000*60*60*24)) !== '00') {
            contestClockBoxTime.innerText += formatCountDownNums(nTime / (1000 * 60 * 60 * 24)) + ":";
            nTime %= 1000 * 60 * 60 * 24; // day
        }
        contestClockBoxTime.innerText += formatCountDownNums(nTime / (1000*60*60)) + ":";
        nTime %= 1000*60*60; // hour
        contestClockBoxTime.innerText += formatCountDownNums(nTime / (1000*60)) + ":";
        nTime %= 1000*60; // minute
        contestClockBoxTime.innerText += formatCountDownNums(nTime / 1000);
    }

    updateCountDown();
    setInterval(updateCountDown, 1000);
}

class ContestClockBox extends Component<any, any> {
    componentDidMount(): void {
        if(this.context.isContest) {
            startContestClockBox();
        }
    }

    render() {
        if(this.context.isContest) {
            return (
                <Draggable>
                    <ClockBox id={"contest-clock-box"}>
                        <MdDragHandle /> Contest Ends - <span id="contest-clock-box-time"/>
                    </ClockBox>
                </Draggable>
            );
        } else {
            return null;
        }
    }
}
ContestClockBox.contextType = AuthContext;
export default ContestClockBox;
