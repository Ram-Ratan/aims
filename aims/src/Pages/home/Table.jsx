import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const rows = [
  { id: 1, name: 'Praphull Nand',rollNo : 20231, marks: 90 },
  { id: 2, name: 'Prithvi Singh Bhati', rollNo : 20232, marks: 85 },
  { id: 3, name: 'Priyam Harsh', rollNo : 20233, marks: 88 },
  { id: 4, name: 'Priyankjeet Pradhan',rollNo : 20234, marks: 91 },
  { id: 5, name: 'Ram Ratan Singh', rollNo : 20235, marks: 95 },
  { id: 6, name: 'Rohit Golu', rollNo : 20236, marks: 97 },
];

export default function MyTable() {
  const [data, setData] = useState(rows);

  const handleMarksChange = (event, id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, marks: parseInt(event.target.value) };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Student Name</b></TableCell>
              <TableCell><b>Roll No.</b></TableCell>
              <TableCell><b>Marks</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.rollNo}</TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={row.marks}
                    onChange={(event) => handleMarksChange(event, row.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    
  );
}
