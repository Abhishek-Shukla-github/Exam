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
});

export default function ExamTime(props) {
  const classes = useStyles();
  const createData=(date, startTime, endTime, subject)=>{
    return { date, startTime, endTime, subject };
  }
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // useEffect(()=>{
  //   console.log(props)
  // },[])
  
  const rows = !props.examTime ? [] : Object.keys(props.examTime).map((key)=>{
    // const date = props.examTime[key].startTime.toDate()
    // console.log(props.examTime[key].startTime.toDate().toLocaleDateString(undefined, options))
    // console.log(createData(
    //   props.examTime[key].startTime.toDate().toLocaleDateString(undefined, options),
    //   props.examTime[key].startTime.toDate().toLocaleTimeString(),
    //   props.examTime[key].endTime.toDate().toLocaleTimeString(),
    //   key
    // ))
    return createData(
      props.examTime[key].startTime.toDate().toLocaleDateString(undefined, options),
      props.examTime[key].startTime.toDate().toLocaleTimeString(),
      props.examTime[key].endTime.toDate().toLocaleTimeString(),
      key
    )
  })

  // const rows = props.examTime=='' ? '' : Object.keys(props.examTime).map((key)=>{
  //   const date = new Date(props.examTime.routine[key][0].toDate())
  //   return createData(
  //     date.toLocaleDateString(undefined, options),
  //     date.toLocaleTimeString(),
  //     props.examTime.routine[key][1]
  //   )
  // })
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//   ];
  return (
    <div>
      {
        !props.examTime
        ? 'No Exam right now'
        : <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell >Date</StyledTableCell>
                  <StyledTableCell align="center">Start Time</StyledTableCell>
                  <StyledTableCell align="center">End Time</StyledTableCell>
                  <StyledTableCell align="center">Subject</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.date}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.startTime}</StyledTableCell>
                    <StyledTableCell align="center">{row.endTime}</StyledTableCell>
                    <StyledTableCell align="center">{row.subject}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> 

      }
    </div>
    
  );
}
