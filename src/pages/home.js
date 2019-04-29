import React from "react";
import rest from '../components/rest';

import Header from '../components/header';

import {
    Navbar,
    NavItem,
    Row, 
    Col,
    Icon,
    TextInput,
    Textarea,
    Collection,
    CollectionItem,
    Button,
    Modal
} from "react-materialize";

import Select from 'react-select';

import toaster from '../components/toaster';

import ReactPlayer from 'react-player'

import Webcam from "react-webcam";

import style from './home.css'

import movie from '../images/movie.png';

import unicamp from '../images/unicamp_logo.png';
import feec from '../images/feec_logo.png';
import fcm from '../images/fcm_logo.png';

class Home extends React.Component {

    state = {
        selectedValue: { value: "sign", label: "Sinal" },
        sign: "",
        category: "",
        signs: [],
        modal: false,
        id: 0,
        like: 0,
        dislike: 0,
        example: "",
        video: ""
    }

    onSearchSign = (event) => {

        var sign = this.state.sign;

        var request = rest();

        request.get('/sign/searchBySign/' + sign)
                .then((response) => {

                    var data = response.data;

                    var signs = data.map((sign) => {
                        
                        return {
                            id: sign.id,
                            name: sign.sign,
                            example: sign.example,
                            like: sign.like,
                            dislike: sign.dislike,
                            active: false
                        };

                    });

                    this.setState({
                        signs: signs
                    });

                })
                .catch((error) => {

                    if (error.response && error.response.data)
                    {
                        var data = error.response.data;
                        toaster.error(data.message);
                    }
                    else
                    {
                        toaster.error('Ocorreu um erro ao se comunicar com o servidor!');
                    }

                });

    };

    onSearchCategory = (event) => {

        var category = this.state.category;

        var request = rest();

        request.get('/sign/searchByCategory/' + category)
                .then((response) => {

                    var data = response.data;

                    var signs = data.map((sign) => {
                        
                        return {
                            id: sign.id,
                            name: sign.sign,
                            example: sign.example,
                            like: sign.like,
                            dislike: sign.dislike,
                            active: false
                        };

                    });

                    this.setState({
                        signs: signs
                    });

                })
                .catch((error) => {

                    if (error.response && error.response.data)
                    {
                        var data = error.response.data;
                        toaster.error(data.message);
                    }
                    else
                    {
                        toaster.error('Ocorreu um erro ao se comunicar com o servidor!');
                    }

                });

    };

    onSearchImage = (event) => {

        var request = rest();

        request.get('/sign/searchByImage')
                .then((response) => {

                    var data = response.data;

                    var signs = data.map((sign) => {
                        
                        return {
                            id: sign.id,
                            name: sign.sign,
                            example: sign.example,
                            like: sign.like,
                            dislike: sign.dislike,
                            active: false
                        };

                    });

                    this.setState({
                        signs: signs,
                        modal: false
                    });

                })
                .catch((error) => {

                    if (error.response && error.response.data)
                    {
                        var data = error.response.data;
                        toaster.error(data.message);
                    }
                    else
                    {
                        toaster.error('Ocorreu um erro ao se comunicar com o servidor!');
                    }

                });

    };

    onLike = (event) => {

        var request = rest();

        var data = { id: this.state.id };

        request.post('/sign/addLike', data)
               .then((response) => {

                    var data = response.data;
                    this.setState({ like: data.like });

               })
               .catch((error) => {

                    if (error.response && error.response.data)
                    {
                        var data = error.response.data;
                        toaster.error(data.message);
                    }
                    else
                    {
                        toaster.error('Ocorreu um erro ao se comunicar com o servidor!');
                    }

                });

    };

    onDislike = (event) => {

        var request = rest();

        var data = { id: this.state.id };

        request.post('/sign/addDislike', data)
               .then((response) => {

                    var data = response.data;
                    this.setState({ dislike: data.dislike });

               })
               .catch((error) => {

                    if (error.response && error.response.data)
                    {
                        var data = error.response.data;
                        toaster.error(data.message);
                    }
                    else
                    {
                        toaster.error('Ocorreu um erro ao se comunicar com o servidor!');
                    }

                });

    };

    onSelect = (index) =>
    {
        var signs = this.state.signs;

        for(var i = 0; i < signs.length; i++)
            signs[i].active = false;

        signs[index].active = true;

        var request = rest();

        var url = request.defaults.baseURL + '/sign/download/' + signs[index].id;

        if (this.listenLike)
            clearInterval(this.listenLike);

        if (this.listenDislike)
            clearInterval(this.listenDislike);

        this.listenLike = setInterval(() => {

            var request = rest();

            var data = { id: this.state.id };

            request.post('/sign/getLikes', data)
                   .then((response) => {

                        var data = response.data;

                        this.setState({ like: data.like });

                   });

        }, 2000);

        this.listenDislike = setInterval(() => {

            var request = rest();

            var data = { id: this.state.id };

            request.post('/sign/getDislikes', data)
                   .then((response) => {

                        var data = response.data;

                        this.setState({ dislike: data.dislike });

                   });

        }, 2000);

        this.setState({
            id: signs[index].id,
            example: signs[index].example,
            like: signs[index].like,
            dislike: signs[index].dislike,
            video: url,
            signs: signs
        });
    }

    render()
    {
        var signs = this.state.signs;

        var options = [
            { value: "sign", label: "Sinal" },
            { value: "category", label: "Categoria" },
            { value: "hand", label: "Configuração de Mão"}
        ];

        return (
            <div>
                <Row>
                    <Navbar brand={<span style={{ marginLeft: "10px" }}>REDE LIBRAS</span>} alignLinks="right" className="grey darken-2">
                        <NavItem href="/login">Login</NavItem>
                    </Navbar>
                </Row>
                <Row style={{ marginBottom: "0px" }}>
                    <Col s={12} m={12} l={4}>
                        <Col s={12} m={12}>
                            <Select
                                styles={{
                                    input: () => ({
                                        height: 30
                                    })
                                }}
                                defaultValue={options[0]}
                                options={options}
                                onChange={ (data, action) => { this.setState({ selectedValue: data }) }}
                            />
                        </Col>
                        {
                            (this.state.selectedValue.value == "sign") &&
                            <Col s={12} m={12}>
                                <TextInput s={9} m={9} l={8} placeholder="Ex: futebol" onChange={ (event) => { this.setState({ sign: event.target.value }) } } />
                                <Button id="search" tooltip="buscar" icon="search" onClick={this.onSearchSign} disabled={this.state.sign.length < 2} />
                            </Col>
                        }
                        {
                            (this.state.selectedValue.value == 'category') &&
                            <Col s={12} m={12}>
                                <TextInput s={9} m={9} l={8} placeholder="Ex: Esportes" onChange={ (event) => { this.setState({ category: event.target.value }) } } />
                                <Button id="search" tooltip="buscar" icon="search" onClick={this.onSearchCategory} disabled={this.state.category.length < 2} />
                            </Col>
                        }
                        {
                            (this.state.selectedValue.value == 'hand') &&
                            <Col s={12} style={ {textAlign: "center", marginTop: "10px" }}>

                                <Modal

                                    open={this.state.modal}

                                    style={{ maxWidth: "600px" }}

                                    options={{
                                        onOpenStart: (event) => {
                                            this.setState({ modal: true });
                                        },
                                        onCloseStart: (event) => {
                                            this.setState({ modal: false });
                                        }
                                    }}

                                    trigger={
                                        <Button> 
                                            Câmera
                                            <Icon left>camera_alt</Icon>
                                        </Button>
                                    }

                                    children={
                                        this.state.modal && <div style={{ textAlign: "center" }}>
                                            <Webcam
                                                width={500}
                                                height={370}
                                                screenshotQuality={1} 
                                                audio={false} />
                                        </div>
                                    }

                                    actions={[
                                        <Button style={{ marginRight: "10px" }} onClick={this.onSearchImage}>
                                            Buscar
                                            <Icon left>camera_alt</Icon>
                                        </Button>,
                                        <Button className="red" onClick={ (event) => { this.setState({ modal: false }) }}>
                                            Fechar
                                        </Button>
                                    ]}
                                />

                            </Col>
                        }
                        <Col id="searchResult" s={12} m={12}>
                            <Collection>
                                {signs.map((sign, index) => {
                                    return <CollectionItem className={ sign.active ? "active" : "" } key={index} onClick={ (event) => { this.onSelect(index); }}>{sign.name}</CollectionItem>
                                })}
                            </Collection>
                        </Col>
                    </Col>
                    <Col s={12} m={12} l={8}>
                        <Row style={{ marginBottom: "5px" }}>
                            {this.state.video 
                            ? <ReactPlayer url={this.state.video} controls width='100%' height='400px' />
                            : <div id="video"><img src={movie} title="vídeo do sinal" width="100" height="100" /></div>}
                        </Row>
                        <Row style={{ textAlign: "right", marginBottom: "0px" }}>
                            <Button waves="light" small style={{ marginRight: "10px" }} disabled={this.state.id == 0} onClick={this.onLike}>
                                {this.state.like}
                                <Icon left>thumb_up</Icon>
                            </Button>
                            <Button className='red' waves="light" small disabled={this.state.id == 0} onClick={this.onDislike}>
                                {this.state.dislike}
                                <Icon left>thumb_down</Icon>
                            </Button>
                        </Row>
                        <Row style={{ marginBottom: "0px" }}>
                            <Textarea s={12} disabled label="Exemplo de Frase" placeholder="" value={this.state.example} />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Row>
                        <div style={ { backgroundColor: "black", height: "1px" } }></div>
                    </Row>
                    <Row>
                        <Col s={2} l={2}></Col>
                        <Col s={2} l={2} style={ { textAlign: 'center' } }>
                            <a href="http://www.unicamp.br/unicamp/" target="_blank">
                                <img className="entityLogo" src={unicamp} title="Universidade Estadual de Campinas" />
                            </a>
                        </Col>
                        <Col s={2} l={2} style={ { textAlign: 'center', paddingTop: '25px' } }>
                            <a href="https://www.fee.unicamp.br/" target="_blank">
                                <img className="entityLogo" src={feec} title="Faculdade de Engenharia Elétrica e de Computação (FEEC)" />
                            </a>
                        </Col>
                        <Col s={2} l={2} style={ { textAlign: 'center' } }>
                            <a href="https://www.fcm.unicamp.br/fcm/" target="_blank">
                                <img className="entityLogo" src={fcm} title="Faculdade de Ciências Médicas (FCM)" />
                            </a>
                        </Col >
                        <Col s={2} l={2} style={ { textAlign: 'center', paddingTop: '30px', fontSize: '20pt' } }>
                            <a href="https://www.fcm.unicamp.br/fcm/centro-de-estudos-e-pesquisas-em-reabilitacao-cepre" target="_blank" style={ { color: "black" } }>
                                <span title="Centro de Estudos e Pesquisas em Reabilitação">CEPRE</span>
                            </a>
                        </Col>
                        <Col s={2} l={2}></Col>
                    </Row>
                </Row>
            </div>
        );
    }


}

export default Home