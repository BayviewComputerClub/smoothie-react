import "@patternfly/react-core/dist/styles/base.css";
import React from 'react';
import {
    Page,
    PageHeader,
    PageSidebar,
    PageSection,
    PageSectionVariants,
    Nav,
    NavList,
    NavItem,
    TextContent,
    Text,
    TextVariants,
    TextList,
    TextListItem,
    AboutModal,
    Button
} from '@patternfly/react-core';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import {isMobile} from "react-device-detect";

import { motion, AnimatePresence } from "framer-motion"

// Custom Components
import RouterNavItem from "./components/RouterNavItem";
import LoginModal from "./components/LoginModal";
import Problem from "./routes/Problem";

// Routes
import Home from "./routes/Home";
import ProblemList from "./routes/ProblemList";

// Helpers
import {AuthContext, defaultAuthState} from "./contexts/AuthContext";
import Rankings from "./routes/Rankings";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: true,
            isModalOpen: false,
            loginModal: false
        };
        this.onNavToggle = () => {
            this.setState({
                isNavOpen: !this.state.isNavOpen
            });
        };
        this.handleModalToggle = () => {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        };

        // Set some defaults for mobile devices
        if(isMobile) {
            console.log("Started on mobile device");
            this.state.isNavOpen = false;
        }

    }

    render() {
        const { isNavOpen } = this.state;

        const context = this.context;

        const logoProps = {
            href: '/',
        };

        const toolbar = (
            <div>{context.loggedIn ? <p>Hello, {this.context.username}! - <Button onClick={() => this.context.setState(defaultAuthState)}>Logout</Button></p> : <a onClick={() => this.context.setState({loginModal: true})}>You are not logged in.</a>}</div>
        );

        const Header = (
            <PageHeader
                logo={
                    <TextContent style={{marginBottom: -10}}>
                        <Text component={TextVariants.h1}>Smoothie React</Text>
                    </TextContent>
                }
                logoProps={logoProps}
                toolbar={toolbar}
                avatar=""
                showNavToggle
                isNavOpen={isNavOpen}
                onNavToggle={this.onNavToggle}
            />
        );

        // Nav Things

        const NavAnimation = {
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,

                },
            },
            hidden: {
                opacity: 0,
            },
        };
        const NavItemAnimation = {
            visible: {
                opacity: 1,
            },
            hidden: {
                opacity: 0,
            },
        };

        const Navigation = (
            <Nav onSelect={this.onSelect} theme="dark">
                <NavList>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={NavAnimation}
                    >
                        <motion.div variants={NavItemAnimation}><RouterNavItem name={"Home"} route={"/"} /></motion.div>
                        <motion.div variants={NavItemAnimation}><RouterNavItem name={"Problems"} route={"/problems"} /></motion.div>
                        <motion.div variants={NavItemAnimation}><RouterNavItem name={"Contests"} route={"/contests"} /></motion.div>
                        <motion.div variants={NavItemAnimation}><RouterNavItem name={"Ranking"} route={"/ranking"} /></motion.div>
                        <motion.div variants={NavItemAnimation}>
                            <NavItem onClick={() => this.handleModalToggle()} preventDefault>
                                About
                            </NavItem>
                        </motion.div>
                    </motion.div>
                </NavList>
            </Nav>
        );

        const Sidebar = <PageSidebar nav={Navigation} isNavOpen={isNavOpen} theme="dark" />;

        return (
            <Router>
                <Page style={{height: "100vh"}} header={Header} sidebar={Sidebar}>
                    <PageSection variant={PageSectionVariants.light}>
                        <AnimatePresence exitBeforeEnter>
                            <Switch>
                                <Route component={Problem} path="/problems/:id" />
                                <Route component={ProblemList} path="/problems" />
                                <Route component={Rankings} path="/ranking" />
                                <Route component={Home} path="/" />
                            </Switch>
                        </AnimatePresence>
                    </PageSection>

                    <AboutModal
                        isOpen={this.state.isModalOpen}
                        onClose={this.handleModalToggle}
                        trademark="Bayview Computer Club"
                        brandImageSrc={"/bsscc-transparent-background-pink-logo-white-text.png"}
                        brandImageAlt="BSSCC Logo"
                        productName="Smoothie React"
                    >
                        <TextContent>
                            <TextList component="dl">
                                <TextListItem component="dt">Smoothie-React Version</TextListItem>
                                <TextListItem component="dd">1.0 - InDev</TextListItem>
                            </TextList>
                        </TextContent>
                    </AboutModal>

                    <LoginModal />

                </Page>
            </Router>
        );
    }
}
App.contextType = AuthContext;
export default App;
