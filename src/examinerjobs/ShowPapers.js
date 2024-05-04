import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  // const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {props.year}
        </TableCell>
        <TableCell align="center">{props.course}</TableCell>
        <TableCell align="center">{props.sem}</TableCell>
        <TableCell align="center">{props.published?'Yes':'No'}</TableCell>
        <TableCell align="center">{props.sub}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {props.sub}
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                Short Questions
              </Typography>
              {
                props.allData[props.course][props.year][props.sem][props.sub]['paper']['short'].map((question)=><div>{question}</div>)
              }
              <Typography variant="body1" gutterBottom component="div">
                Long Questions
              </Typography>
              {
                props.allData[props.course][props.year][props.sem][props.sub]['paper']['long'].map((question)=><div>{question}</div>)
              }
              {/* <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                   {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} }
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};


export default function ShowPapers(props) {

    const [allData, setAllData] = useState({})
    useEffect(() => {
        // console.log(props.courseData)
        let d = {}
        props.courseData.forEach((ele1)=>{
          d[''+ele1.id] = {}
          Object.keys(ele1.data()).forEach((ele2)=>{
            d[''+ele1.id][ele2]={}
            Object.keys(ele1.data()[ele2]).forEach((ele3)=>{
              d[''+ele1.id][ele2][ele3]={}
              // console.log(ele1.id, ele2, ele3)
              Object.keys(ele1.data()[ele2][ele3]).forEach((ele4)=>{
                d[''+ele1.id][ele2][ele3][ele4]=ele1.data()[ele2][ele3][ele4]
                // console.log(ele1.id, ele2, ele3, ele4, ele1.data()[ele2][ele3][ele4])
              })
            })
          })
        })
        // console.log(d)
        setAllData(d)
    },[])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Year</TableCell>
            <TableCell align="center">Course</TableCell>
            <TableCell align="center">Semester</TableCell>
            <TableCell align="center">Published</TableCell>
            <TableCell align="center">Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            // console.log(allData)
            Object.keys(allData).map((course) => {
                // console.log(course)
                return (
                  Object.keys(allData[course]).map((year)=>{
                    return (
                      Object.keys(allData[course][year]).map((sem)=>{
                        return (
                          Object.keys(allData[course][year][sem]).map((sub)=>{
                            // console.log(allData[course][year][sem][sub])
                            return <Row key={course+year+sem+sub}  course={course} sub={sub} year={year} sem={sem} published={allData[course][year][sem][sub]['published']} allData={allData} />
                          })
                        )
                      })
                    )
                  })
                )
                // <Row key={row.name} row={row} />
            })   
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
