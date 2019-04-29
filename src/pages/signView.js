import React from 'react';
import rest from '../components/rest';

import {
    Row,
    Col,
    RadioGroup,
    Button,
    TextInput
} from 'react-materialize';

import Select from 'react-select';

import AsyncSelect from 'react-select/lib/Async';

import toaster from '../components/toaster';

class SignView extends React.Component
{
    state = {
        id: null,
        sign: '',
        example: '',
        isGeneral: "1",
        region: '',
        states: [],
        categories: [],
        file_name: '',
        video_path: ''
    }

    componentDidMount()
    {
        var id = this.props.match.params.id;

        if (!id) { return; }

        var request = rest();

        request.get('/sign/find/' + id)
               .then( (response) => {

                    var data = response.data;

                    this.setState({
                        id: data.id,
                        sign: data.sign,
                        example: data.example,
                        isGeneral: data.isGeneral,
                        region: data.region,
                        states: data.states,
                        categories: data.categories,
                        file_name: data.file_name,
                        video_path: data.video_path
                    });

               })
               .catch( (error) => {

                    var data = error.response.data;

                    if (data)
                    {
                        toaster.warning(data.message);
                    }

               });
    }

    onClick = () => {

        var id = this.props.match.params.id;

        if (!id) { return; }

        var request = rest();

        request.delete('/sign/remove/' + id)
               .then((response) => {

                window.location.href = '/signs';

             })
             .catch((error) => {

                var data = error.response.data;

                if (data)
                {
                    toaster.warning(data.message);
                }

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
                    <TextInput s={12} readonly='readonly' label="Sinal" placeholder="Sinal" size="250" value={this.state.sign} onChange={(event) => { this.setState({ sign: event.target.value })} } />
                </Row>
                <Row>
                    <TextInput s={12} readonly='readonly' label="Exemplo de Frase" placeholder="Exemplo de Frase" size="250" value={this.state.example} onChange={(event) => { this.setState({ example: event.target.value })} } />
                </Row>
                <Row>
                    <Col s={12}>
                        <label>Esse sinal é nacional ou regional?</label><br></br>
                        <RadioGroup
                            disabled
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
                                isDisabled={true}
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
                                isDisabled={true}
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
                            isDisabled={true}
                            placeholder={"Selecione uma ou mais categorias..."}
                            loadOptions={this.onLoadCategories}
                            onChange={ (data, action) => { this.setState({ categories: data }) } }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <div className="file-field input-field">
                            <div className="btn disabled">
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
                    <Button style={ { float: 'right' } } waves='light' onClick={this.onClick}>Deletar</Button>
                </Row>
            </div>
        );
    }
}

export default SignView;