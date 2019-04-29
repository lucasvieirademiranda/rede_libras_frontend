import React from "react";

import { Navbar, NavItem, Row } from 'react-materialize';

const Header = () => (
    <Row>
        <Navbar brand="FN468" right className="grey darken-2">
            <NavItem src="/login">Login</NavItem>
        </Navbar>
    </Row>
);

export default Header;