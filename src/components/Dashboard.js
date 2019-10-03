import React, { Component } from 'react';
import {Grid, Container, Paper, Button } from '@material-ui/core';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Checkbox from '@material-ui/core/Checkbox';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            userData: [],
            data:{},
            selectedIndexes: []
        }
    }

async componentWillMount() {
        await axios.get('http://localhost:4000/getList')
        .then(res => {
            console.log(res.data[0].json_agg);
            this.setState({
                userData: res.data[0].json_agg
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const columns = [
            { 
                Header: 'Select',
                Cell: props => {
                    return (
                        <Checkbox
                            value="checkedB"
                            color="primary"
                            onClick={() => {
                                console.log(props.original)
                                console.log(props.viewIndex)
                            }}
                        />
                    )
                }
            },
            { Header: 'City', accessor: 'city' },
            { Header: 'State', accessor: 'state' },
            { Header: 'Nationality', accessor: 'nationality' },
            { Header: 'Nativity', accessor: 'nativity' },
            { Header: 'Age', accessor: 'age' },
            { Header: 'Gender', accessor: 'gender' },
            { Header: 'Email', accessor: 'email', sortable: false },
            { Header: 'Realm', accessor: 'realm' }
        ];
        return (
            <Container fixed>
                <br/>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                        <Button variant="contained" color="primary">Export</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactTable
                        columns = {columns}
                        data = {this.state.userData}
                        filterable
                        showPaginationBottom={false}
                        showPaginationTop
                        showPageSizeOptions={true}
                        pageSizeOptions= {[5, 8, 10, 20, 30, 50]}
                        defaultPageSize={8}
                        noDataText={"NO Records Found"}
                        >
                        </ReactTable>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default Dashboard;
