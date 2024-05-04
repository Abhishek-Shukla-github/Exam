import { Avatar, makeStyles, withStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import React, { useContext } from 'react'
// import SetData from './SetData';
import { UserContext } from '../App';

const useStyles = makeStyles((theme) => ({
    stHead: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        fontSize: '1.3em'
      },
    table: {
        width:300,
    },
    cell: {
        display: 'table-cell',
        padding: 10,
        fontSize: '1rem',
        textAlign: 'left',
        fontWeight: 400,
    },
    name: {
        display:'flex', 
        flexDirection:'row',
        width: 180,
        justifyContent: 'space-around',
        alignItems: 'center',
    }
}));
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
export default function Profile() {
    const classes = useStyles();
    const loggedInUser = useContext(UserContext);
    return (
        <div>
            <div className={classes.stHead}>
                <div className={classes.name}>
                    <Avatar>{loggedInUser.currentUser.data.name.charAt(0)}</Avatar>
                    <span>{loggedInUser.currentUser.data.name}</span>
                </div>
            </div>
            <TableContainer component={Paper} style={{padding:'10px'}}>
                <Table aria-label="simple table">                    
                    <TableBody>
                        <StyledTableRow>
                            <TableCell className={classes.cell}>Designation</TableCell>
                            <TableCell className={classes.cell}>{loggedInUser.currentUser.data.designation}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell className={classes.cell}>Email</TableCell>
                            <TableCell className={classes.cell}>{loggedInUser.currentUser.data.email}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell className={classes.cell}>Date of Birth</TableCell>
                            <TableCell className={classes.cell}>{loggedInUser.currentUser.data.dob}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell className={classes.cell}>Address</TableCell>
                            <TableCell className={classes.cell}>{loggedInUser.currentUser.data.address}</TableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <TableCell className={classes.cell}>Contact No</TableCell>
                            <TableCell className={classes.cell}>{loggedInUser.currentUser.data.contact}</TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>    
    )
}