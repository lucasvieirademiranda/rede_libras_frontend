import React from 'react';
import rest from '../components/rest';

import {
    Row,
    Col,
    Button,
    TextInput,
    Textarea,
    RadioGroup
} from 'react-materialize';

import Select from 'react-select';

import AsyncSelect from 'react-select/lib/Async';

import toaster from '../components/toaster';

class SignForm extends React.Component
{
    state = {        
        id: null,
        sign: '',
        example: '',
        isGeneral: "1",
        region: '',
        hand: '',
        states: [],
        categories: [],
        file_name: '',
        video_path: '',
        workaround: 0 // update key executes the reaload on state select
    }

    create = (data, configuration) => {

        var request = rest();

        request.post('/sign/create', data, configuration)
               .then((response) => {

                    window.location = '/signs';

                })
                .catch((error) => {

                    if (error.response && error.response.data)
                    {
                        var data = error.response.data;
    
                        if (Array.isArray(data))
                        {
                            for(var i = 0; i < data.length; i++)
                            {
                                toaster.error(data[i].msg);
                            }
                        }
                        else
                        {
                            toaster.error(data.message);
                        }
                    }
                    else
                    {
                        toaster.error('Ocorreu um erro ao se comunicar com o servidor!');
                    }

                });

    };

    edit = (data, configuration) => {

        var request = rest();

        request.patch('/sign/edit', data, configuration)
                .then((response) => {

                    window.location = '/signs';

                })
                .catch((error) => {

                    if (error.response && error.response.data)
                    {
                        var data = error.response.data;

                        if (Array.isArray(data))
                        {
                            for(var i = 0; i < data.length; i++)
                            {
                                toaster.error(data[i].msg);
                            }
                        }
                        else
                        {
                            toaster.error(data.message);
                        }
                    }
                    else
                    {
                        toaster.error('Ocorreu um erro ao se comunicar com o servidor!');
                    }

                });

    };

    componentDidMount()
    {
        var id = this.props.match.params.id;

        if (!id) { return; }

        var request = rest();

        request.get('/sign/find/' + id)
               .then((response) => {

                    var data = response.data;

                    this.setState({
                        id: data.id,
                        sign: data.sign,
                        example: data.example,
                        isGeneral: data.isGeneral.toString(),
                        hand: data.hand,
                        region: data.region,
                        states: data.states,
                        categories: data.categories,
                        file_name: data.file_name,
                        video_path: data.video_path
                    })

               });

    }

    onClick = () => {

        var id = this.state.id;

        var data = new FormData();

        data.append("sign", this.state.sign);
        data.append("example", this.state.example);
        data.append("isGeneral", this.state.isGeneral);
        data.append("hand", this.state.hand ? JSON.stringify(this.state.hand) : '');
        data.append("region", this.state.region ? JSON.stringify(this.state.region) : '');
        data.append("states", this.state.states.length > 0 ? JSON.stringify(this.state.states) : '');
        data.append("categories", this.state.categories.length > 0 ? JSON.stringify(this.state.categories) : '');
        data.append('file_name', this.state.file_name);
        data.append("video_path", this.state.video_path);
        data.append("file", this.file);

        var configuration = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }

        if (!id)
        {
            this.create(data, configuration);
        }
        else
        {
            data.append('id', id);
            this.edit(data, configuration);
        }

    };

    onChangeFile = (event) => {

        this.file = event.target.files[0];
    
    };

    onClickLink = (event) => {

        var id = this.state.id;

        var request = rest();

        var url = request.defaults.baseURL + '/sign/download/' + id;

        window.open(url, '_self');

    };

    onChangeType = (event) => {

        var isGeneral = event.target.value;

        if (isGeneral)
        {
            this.setState({
                isGeneral: isGeneral,
                region: '',
                states: []
            });
        }
        else
        {
            this.setState({
                isGeneral: isGeneral
            })
        }

    };

    onLoadHands = (inputValue, callback) => {

        var request = rest();

        request.get('/hand/dropDownList/' + inputValue)
               .then((response) => {

                   var hands = response.data;
                   callback(hands);

               })

    };

    onLoadCategories = (inputValue,  callback) => {

        var request = rest();

        request.get('/category/dropDownList')
               .then((response) => {

                    var categories = response.data;
                    callback(categories);

               });

    };

    onLoadRegions = (inputValue, callback) => {

        var request = rest();

        request.get('/region/dropDownList')
               .then((response) => {

                    var regions = response.data;
                    callback(regions);

               });

    };

    onLoadStates = (inputValue, callback) => {

        var request = rest();

        var idRegion = this.state.region ? this.state.region.value : null;

        if (!idRegion)
        {
            callback([]);
            return;
        } 

        request.get('/state/dropDownList/' + idRegion)
               .then((response) => {

                    var regions = response.data;
                    callback(regions);

               });

    };

    render()
    {
        return (
            <div>
                <Row>
                    <h3>Cadastro de Sinais</h3>
                </Row>
                <Row>
                    <Col s={12}>
                        <TextInput s={12} label="Sinal" placeholder="Sinal" maxLength="250" value={this.state.sign} onChange={(event) => { this.setState({ sign: event.target.value })} } />
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <Textarea s={12} label="Exemplo de Frase" placeholder="Exemplo de Frase" value={this.state.example} onChange={(event) => { this.setState({ example: event.target.value  })} } />
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <label>Esse sinal é nacional ou regional?</label><br></br>
                        <RadioGroup
                            name="isGeneral"
                            value={this.state.isGeneral}
                            options={[
                                { value: "1", label: "Nacional" },
                                { value: "0", label: "Regional" }
                            ]}
                            onChange={this.onChangeType}
                        />
                    </Col>
                </Row>
                {(this.state.isGeneral == '0') &&
                    <Row>
                        <Col s={12}>
                            <AsyncSelect 
                                cacheOptions
                                defaultOptions
                                placeholder={"Selecione uma região..."}
                                value={this.state.region}
                                loadOptions={this.onLoadRegions}
                                onChange={ (data, action) => { this.setState({ region: data, states:[], workaround: this.state.workaround + 1 }) } }
                            />
                        </Col>
                    </Row>
                }
                {(this.state.isGeneral == "0") && 
                    <Row >
                        <Col s={12}>
                            <AsyncSelect 
                                isMulti={true}
                                cacheOptions={false}
                                defaultOptions={true}
                                isDisabled={!this.state.region}
                                key={this.state.workaround}
                                placeholder={"Selecione um ou mais estados..."}
                                value={this.state.states}
                                loadOptions={this.onLoadStates}
                                onChange={ (data, action) => { this.setState({ states: data }) } }
                            />
                        </Col>
                    </Row>
                }
                <Row>
                    <Col s={12}>
                        <AsyncSelect
                            isMulti
                            value={this.state.categories}
                            cacheOptions
                            defaultOptions
                            placeholder={"Selecione uma ou mais categorias..."}
                            loadOptions={this.onLoadCategories}
                            onChange={ (data, action) => { this.setState({ categories: data }) } }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <AsyncSelect
                            value={this.state.hand}
                            cacheOptions
                            defaultOptions
                            placeholder={"Seleciona uma configuração de mão..."}
                            loadOptions={this.onLoadHands}
                            onChange={(data, action) => { this.setState({ hand: data }) }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Video</span>
                                <input type="file" onChange={ (event) => this.onChangeFile(event) } />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                    </Col>
                </Row>
                { this.state.video_path &&
                    <Row style={ {color: 'red' }}>
                        Já existe um vídeo ({ this.state.file_name }) cadastrado para o sinal, clique <a href="javascript:void();" onClick={this.onClickLink} style={ { color: 'red', fontWeight: 'bold' } } >aqui</a> para baixá-lo.
                    </Row>
                }
                <Row>
                    <Button waves='light' className='red' node='a' href='/signs'>Voltar</Button>&nbsp;
                    <Button style={ { float: 'right' } } waves='light' onClick={this.onClick}>Salvar</Button>
                </Row>
            </div>
        );

    }

}

export default SignForm;