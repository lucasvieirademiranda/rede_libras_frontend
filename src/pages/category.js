import React from 'react';
import rest from '../components/rest';

import { AgGridReact } from 'ag-grid-react';

import {
    Row,
    Button
} from 'react-materialize';

import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';

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
            { headerName: "Categoria", field: "name", editable: false, filter: "agTextColumnFilter", sortable: true, suppressMovable: true },
            { headerName: "Descrição", field: "description", editable: false, filter: "agTextColumnFilter", sortable: true, suppressMovable: true },
            { headerName: "", width: 100,  cellRenderer: function(event) { return buildControl('/categories/edit/' + event.data.id, 'Editar', edit); } },
            { headerName: "", width: 100,  cellRenderer: function(event) { if (event.data.id > 1) { return buildControl('/categories/delete/' + event.data.id, 'Remover', remove); } else { return ''; }  } }
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

        request.get('/category/list')
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
                    <h3>Categorias</h3>
                </Row>
                <Row>
                    <Button style={ { float: 'right' } } waves='light' node='a' href='/categories/add'>Adicionar</Button>
                </Row>
                <Row>
                    <div className="ag-theme-material" style={{ height: '400px', width: '100%' }}>
                        <AgGridReact
                            onGridReady = {this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                            pagination={true}
                            paginationPageSize={10}
                            suppressHorizontalScroll={true}>
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