import React from 'react';
import ReactDataGrid from 'react-data-grid';

export default class DataList extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedIndexes: []
        }
    }

    onRowsSelected = rows => {
    this.setState({
        selectedIndexes: this.state.selectedIndexes.concat(
        rows.map(r => r.rowIdx)
        )
    });
    };

    onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
        selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
        )
    });
    };

render() {
const columns = [
    { key: 'id', name: 'id' },
    { key: 'city', name: 'city' },
    { key: 'state', name: 'state' },
    { key: 'nationality', name: 'nationality' },
    { key: 'nativity', name: 'nativity' },
    { key: 'age', name: 'age' },
    { key: 'gender', name: 'gender' },
    { key: 'email', name: 'email' },
    { key: 'realm', name: 'realm' }
];
const rows = [];
this.props.userData.map((data,i) => {
    let x = data;
    x['id'] = i+1;
    rows.push(x)
});

const rowGetter = rowNumber => rows[rowNumber];
const rowText = this.state.selectedIndexes.length === 1 ? "row" : "rows";
        return (
            <React.Fragment>
            <span>
                {this.state.selectedIndexes.length} {rowText} selected
            </span>
        <ReactDataGrid
            rowKey="id"
            columns={columns}
            rowGetter={rowGetter}
            rowsCount={rows.length}
            rowSelection = {{
                enableShiftSelect: true,
                onRowsSelected: this.onRowsSelected,
                onRowsDeselected: this.onRowsDeselected,
                selectBy: {
                    indexes: this.state.selectedIndexes
                }
        }} 
        /> 
        </React.Fragment>
        );
}
}
