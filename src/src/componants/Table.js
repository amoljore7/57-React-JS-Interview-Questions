
import React from "react";

const tableData = [
  {
    id: 1,
    name: "Kim Parrish",
    address: "Garnerville, NY 10923",
    date: "07/11/2020",
    order: "87349585892118",
  },
  {
    id: 2,
    name: "Michele Castillo",
    address: "Fullerton, NE 68638",
    date: "07/11/2020",
    order: "58418278790810",
  },
  {
    id: 3,
    name: "Eric Ferris",
    address: "Toccoa, GA 30577",
    date: "07/10/2020",
    order: "81534454080477",
  },
  {
    id: 4,
    name: "Gloria Noble",
    address: "Fresno, CA 93721",
    date: "07/09/2020",
    order: "20452221703743",
  },
  {
    id: 5,
    name: "Darren Daniels",
    address: "Anaktuvuk Pass, AK 99721",
    date: "07/07/2020",
    order: "22906126785176",
  },
  {
    id: 6,
    name: "Ted McDonald",
    address: "Minneapolis, MN 55406",
    date: "07/07/2020",
    order: "87574505851064",
  },
];

const style ={
  display: 'flex',
  justifyContent: 'space-between'
}


function DataTable() {
  const renderColumn = (row) => {
    return (
      <>
        <span>{row.name}</span>
      </>
    );
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      renderColumn,
    },
    {
      field: 'address',
      headerName: 'Address',
    },
    {
      field: 'order',
      headerName: 'Order',
    },
    // Include other columns as needed
  ];

  return (
    <div className="App">
         <h2>Custom Table</h2>
      <Table
        data={tableData}
        columns={columns}
      />
    </div>
  );
}

export default DataTable;


const Table = ({
  data = null,
  columns = null,
}) => {
  return (
    <div>
      <table>
        <thead>
          <tr style={style}>
            {columns &&
              columns.map((column) => (
                <th key={column.field}>{column?.headerName}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
                <tr key={rowIndex} style={style}>
                  {columns.map((column, index) => (
                    <td key={index}>
                      {column.renderColumn ? column.renderColumn(row) : row[column.field]}
                    </td>
                  ))}
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

