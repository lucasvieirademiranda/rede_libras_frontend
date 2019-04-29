import React from 'react';
import rest from '../components/rest';

import { AgGridReact } from 'ag-grid-react';

import {
    Row,
    Button
} from 'react-materialize';

import '../../node_modules/ag-grid/dist/styles/ag-grid.css';
import '../../node_modules/ag-grid/dist/styles/ag-theme-balham.css';
import './ag-grid-corrections.css';

import remove from  '../images/delete_32x32.png';
import edit from '../images/edit_32x32.png';

function buildControl(url, title, image)
{
    return `
        <div style='text-align: center;'>
            <a href=` + url + ` title=` + title + `><img src=`+ image +` height='15' width='15'/></a>
        </div>
    `;
}

class User extends React.Component {
  
    state = {
        columnDefs: [
            { headerName: "Sinal", field: "sign", editable: false, filter: "agTextColumnFilter", sortable: true, suppressMovable: true },
            { headerName: "Exemplo de Frase", field: "example", editable: false, filter: "agTextColumnFilter", sortable: true, suppressMovable: true },
            { headerName: "Arquivo", field: "file_name", editable: false, filter: "agTextColumnFilter", sortable: true, supressMovable: true },
            { headerName: "", width: 100,  cellRenderer: function(event) { return buildControl('/signs/edit/' + event.data.id, 'Editar', edit); } },
            { headerName: "", width: 100,  cellRenderer: function(event) { return buildControl('/signs/delete/' + event.data.id, 'Remover', remove); } }
        ],
        rowData: [],
        overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Carregando...</span>',
        overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">Não há dados para serem exibidos.</span>"
    }

    onGridReady = (events) => {

        this.gridApi = events.api;
        this.columnApi = events.columnApi;

        this.gridApi.sizeColumnsToFit();

        var request = rest();

        request.get('/sign/list')
               .then(response => {

                    this.setState({ rowData: response.data })

                })
                .catch(error => {

                    this.setState({ rowData: [] });

                });
    }

	render() {
		return (
            <div>
                <Row>
                    <Button style={ { float: 'right' } } waves='light' node='a' href='/signs/add'>Adicionar</Button>
                </Row>
                <Row>
                    <div className="ag-theme-balham" style={{ height: '400px', width: '100%' }}>
                        <AgGridReact
                            onGridReady = {this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                            pagination={true}
                            paginationPageSize={20}>
                        </AgGridReact>
                    </div>
                </Row>
                <Row>
                    <Button className='red' waves='light' node='a' href='/system'>Voltar</Button>
                </Row>
            </div>
        );
        
	}
}



export default User;