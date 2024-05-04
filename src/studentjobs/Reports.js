import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import db from '../dbconfig'
import { doc, getDoc } from "firebase/firestore";
import DetailedPaperView from './DetailedPaperView';

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
  
  function createData(name, marks, percentage, action) {
    return { name, marks, percentage, action };
  }
  
//   const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24 ),
//     createData('Ice cream sandwich', 237, 9.0, 37 ),
//     createData('Eclair', 262, 16.0, 24 ),
//     createData('Cupcake', 305, 3.7, 67 ),
//     createData('Gingerbread', 356, 16.0, 49 ),
//   ];

  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
  });


export default function Reports() {
    const loggedInUser = useContext(UserContext);
    const [papers, setPapers] = useState([])
    const year = new Date().getFullYear()
    const [singleView, setSingleView] = useState(false)
    const [index, setIndex] = useState(-1)
    const [subject, setSubject] = useState('')
    const rows = papers.map((p, index)=>{
        let marks=0
        let percent=0
        p.answers.short.forEach((ele)=>marks+=parseInt(ele.mark))
        p.answers.long.forEach((ele)=>marks+=parseInt(ele.mark))
        percent = marks/100
        // console.log(percent)
        return createData(p.subject, marks, percent, <Button onClick={()=>{setSingleView(true); setIndex(index); setSubject(p.subject)}} variant="contained">View</Button> )
    })

    useEffect(()=>{
        let temp1 = {}
        let temp2 = {}
        let temp3 = []

        // db.collection('answers').doc(loggedInUser.currentUser.data.course).get()
        getDoc(doc(db, "answers", loggedInUser.currentUser.data.course))
        .then((doc)=>{
            console.log(doc.data())
            if(doc.exists() && doc.data().hasOwnProperty(loggedInUser.currentUser.data.sem) && doc.data()[loggedInUser.currentUser.data.sem].hasOwnProperty('Y'+year)){
                console.log(doc.data()[loggedInUser.currentUser.data.sem]['Y'+year])
                temp1 = doc.data()[loggedInUser.currentUser.data.sem]['Y'+year]
            }
            // console.log(data)
            Object.keys(temp1).forEach((subject)=>{
                Object.keys(temp1[subject]).forEach((student)=>{
                    if(student == loggedInUser.currentUser.uid && temp1[subject][student].completed == true){
                        setPapers(list=>[...list, temp1[subject][student].ans])
                    }
                })
            })
        }).then(()=>{
            console.log(temp1)
            if(Object.keys(temp1).length!=0){
                // db.collection('questions').doc(loggedInUser.currentUser.data.course).get()
                getDoc(doc(db, "questions", loggedInUser.currentUser.data.course))
                .then((doc)=>{
                    console.log(doc.data()['Y'+year][loggedInUser.currentUser.data.sem])
                    temp2 = doc.data()['Y'+year][loggedInUser.currentUser.data.sem]
                    // if(doc.data()['Y'+year][ele.semester][ele.subject]['paper']!=null)

                    //     data['questions'] =
                    //     {
                    //         longs: doc.data()['Y'+year][ele.semester][ele.subject]['paper']['long'].map((i)=>doc.data()['Y'+year][ele.semester][ele.subject]['long'][i]),
                    //         shorts: doc.data()['Y'+year][ele.semester][ele.subject]['paper']['short'].map((i)=>doc.data()['Y'+year][ele.semester][ele.subject]['short'][i]),
                    //     }
                })
                .then(()=>{
                    let studid=''
                    Object.keys(temp1).forEach((subject)=>{
                        Object.keys(temp1[subject]).forEach((student)=>{
                            
                            if(student == loggedInUser.currentUser.uid && temp1[subject][student].complete == true){
                                studid = student
                            }
                        })

                        if(studid!=''){
                            temp3.push({
                                subject:subject,
                                questions:{
                                    longs: temp2[subject]['paper']['long'].map((i)=>temp2[subject]['long'][i]),
                                    shorts: temp2[subject]['paper']['short'].map((i)=>temp2[subject]['short'][i]),
                                },
                                answers:temp1[subject][studid].ans
                            })
                        }

                    })
                    setPapers(temp3)
                })
            }
        })
        .catch((error)=>{
            console.log(error)
        })
        // console.log(temp3)
    },[])
    const classes = useStyles();

    return (
        <div>
        {
            singleView
            ? <DetailedPaperView paper={papers[index]} subject={subject} semester={loggedInUser.currentUser.data.sem} course={loggedInUser.currentUser.data.course} setSingleView={setSingleView}/>
            :
            (rows && rows.length>0 ? <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Subject</StyledTableCell>
                        <StyledTableCell align="right">Marks</StyledTableCell>
                        <StyledTableCell align="right">Percentage</StyledTableCell>
                        <StyledTableCell align="right"> View Answer Paper</StyledTableCell>
                        {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        papers.length!=0
                        ? rows.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.marks}</StyledTableCell>
                            <StyledTableCell align="right">{row.percentage*100}</StyledTableCell>
                            <StyledTableCell align="right">{row.action}</StyledTableCell>
                            </StyledTableRow>
                         ))
                        :null
                    }
                    </TableBody>
                </Table>
            </TableContainer> : 'No report is available')
        }
        </div>
    )
}