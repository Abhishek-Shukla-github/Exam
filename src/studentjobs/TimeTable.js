import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserContext } from '../App';

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
});

export default function TimeTable(props) {
  const classes = useStyles();
  
  const createData=(day, time1, time2, time3, time4, time5, time6)=>{
    return { day, time1, time2, time3, time4, time5, time6};
  }
  
  const rows = [
    createData('Monday', ...props.timeTable['Monday']),
    createData('Tuesday', ...props.timeTable['Tuesday']),
    createData('Wednesday', ...props.timeTable['Wednesday']),
    createData('Thursday', ...props.timeTable['Thursday']),
    createData('Friday', ...props.timeTable['Friday']),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Day</StyledTableCell>
            <StyledTableCell align="right">9 AM - 10:30 AM</StyledTableCell>
            <StyledTableCell align="right">10:30 AM - 12 PM</StyledTableCell>
            <StyledTableCell align="right">Time 3</StyledTableCell>
            <StyledTableCell align="right">Time4</StyledTableCell>
            <StyledTableCell align="right">Time5</StyledTableCell>
            <StyledTableCell align="right">Time6</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.day}>
              <StyledTableCell component="th" scope="row">
                {row.day}
              </StyledTableCell>
              <StyledTableCell align="right">{row.time1}</StyledTableCell>
              <StyledTableCell align="right">{row.time2}</StyledTableCell>
              <StyledTableCell align="right">{row.time3}</StyledTableCell>
              <StyledTableCell align="right">{row.time4}</StyledTableCell>
              <StyledTableCell align="right">{row.time5}</StyledTableCell>
              <StyledTableCell align="right">{row.time6}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}