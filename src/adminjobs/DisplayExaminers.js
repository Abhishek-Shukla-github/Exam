import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  container: {
    maxHeight: 440,
  }
});

export default function DisplayExaminers(props) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table stickyHeader  className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            {/* <StyledTableCell align="right">Designation</StyledTableCell> */}
            {/* <StyledTableCell align="right">Date of birth</StyledTableCell> */}
            <StyledTableCell align="right">Contact</StyledTableCell>
            {/* <StyledTableCell align="right">Address</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <StyledTableRow key={row.email}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.designation}</StyledTableCell> */}
              {/* <StyledTableCell align="right">{row.dob}</StyledTableCell> */}
              <StyledTableCell align="right">{row.contact}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.address}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
