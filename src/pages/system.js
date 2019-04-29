import React from 'react';

import { 
    Row,
    Col
} from 'react-materialize';

import './system.css'

import users from  '../images/users.png';
import videos from '../images/videos.png';
import categories from '../images/categories.png';

class System extends React.Component
{
    render()
    {
        return (
            <div>
                <Row>
                    <Col className="menuOptions" s={12} m={3} l={2}>
                        <a href="/users" className="menuButton">
                            <div>
                                <img src={users} width="100" height="100"/>
                            </div>
                            <div style={ { fontWeight: "bold" } }>
                                Usuários
                            </div>
                    </a>
                    </Col>
                    <Col className="menuOptions"  s={12} m={3} l={2} >
                        <a href="/signs" className="menuButton">
                            <div>
                                <img style={ { margin: "13px" }} src={videos}  width="75" height="75" />
                            </div>
                            <div style={ { fontWeight: "bold" } }>
                                Sinais
                            </div>
                        </a>
                    </Col>
                    <Col className="menuOptions"  s={12} m={3} l={2} >
                        <a href="/categories" className="menuButton">
                            <div>
                                <img style={ { margin: "13px" }} src={categories}  width="75" height="75" />
                            </div>
                            <div style={ { fontWeight: "bold" } }>
                                Categorias
                            </div>
                        </a>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default System;