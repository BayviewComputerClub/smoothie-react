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

// Custom Components
import RouterNavItem from "./components/RouterNavItem";
import LoginModal from "./components/LoginModal";
import Problem from "./routes/Problem";

// Routes
import Home from "./routes/Home";
import ProblemList from "./routes/ProblemList";

// Helpers
import {AuthContext, defaultAuthState} from "./contexts/AuthContext";

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

        const Navigation = (
            <Nav onSelect={this.onSelect} theme="dark">
                <NavList>
                    <RouterNavItem name={"Home"} route={"/"} />
                    <RouterNavItem name={"Problems"} route={"/problems"} />
                    <RouterNavItem name={"Contests"} route={"/contests"} />
                    <RouterNavItem name={"Ranking"} route={"/ranking"} />
                    <NavItem onClick={() => this.handleModalToggle()} preventDefault>
                        About
                    </NavItem>
                </NavList>
            </Nav>
        );

        const Sidebar = <PageSidebar nav={Navigation} isNavOpen={isNavOpen} theme="dark" />;

        return (
            <Router>
                <Page style={{height: "100vh"}} header={Header} sidebar={Sidebar}>
                    <PageSection variant={PageSectionVariants.light}>
                        <Switch>
                            <Route component= {Problem} path="/problems/:id" />
                            <Route component= {ProblemList} path="/problems" />
                            <Route component= {Home} path="/" />
                        </Switch>
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
