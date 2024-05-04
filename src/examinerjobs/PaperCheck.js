import { Box, Divider, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import TextFormatIcon from '@material-ui/icons/TextFormat';
import { UserContext } from '../App';
import db from '../dbconfig';
import { doc, getDoc} from "firebase/firestore";
import DetailedPaperCheck from './DetailedPaperCheck';
import Loading from '../Loading';

export default function PaperCheck() {
    const user = useContext(UserContext);
    const [papers, setPapers] = useState([])
    const [selectedPaper, setSelectedPaper] = useState({})
    const [showDetails, setShowDetails] = useState(false)
    const [found, setFound] = useState(false)
    const year = new Date().getFullYear()
    useEffect(()=>{

        // db.collection('exam').get().then((doc)=>{
        //     console.log(doc)
        // })

        if(!user.currentUser.data.hasOwnProperty('checkpaper'+year) || !user.currentUser.data['checkpaper'+year]){
            setPapers(null)
            return
        }
            
        user.currentUser.data['checkpaper'+year].forEach((ele)=>{
            let data={};
            getDoc(doc(db, "answers", ele.course))
            .then((d)=>{
                if(
                    d.exists()
                    && d.data()[ele.semester] !=null
                    && d.data()[ele.semester]['Y'+year]!=null
                    && d.data()[ele.semester]['Y'+year][ele.subject] !=null
                ){ 
                    data={
                        year:year,
                        course:ele.course,
                        subject:ele.subject,
                        semester:ele.semester
                    }
                    let ans = []
                    Object.keys(d.data()[ele.semester]['Y'+year][ele.subject]).forEach((studentid)=>{
                        // if(d.data()[ele.semester]['Y'+year][ele.subject][studentid].complete==false)
                            ans.push(d.data()[ele.semester]['Y'+year][ele.subject][studentid])
                    })

                    if(ans.length!=0){
                        setFound(true)
                        data['answers'] = ans
                        getDoc(doc(db, "questions", ele.course))
                        .then((d)=>{
                            console.log(d.data()['Y'+year][ele.semester][ele.subject]['paper'])
                            if(d.data()['Y'+year][ele.semester][ele.subject]['paper']!=null)
                                data['questions'] =
                                {
                                    longs: d.data()['Y'+year][ele.semester][ele.subject]['paper']['long'].map((i)=>d.data()['Y'+year][ele.semester][ele.subject]['long'][i]),
                                    shorts: d.data()['Y'+year][ele.semester][ele.subject]['paper']['short'].map((i)=>d.data()['Y'+year][ele.semester][ele.subject]['short'][i]),
                                }
                        })
                        setPapers((old)=>[...old, data])
                    } 
                } 
                
                // else {
                //     console.log('asd')
                //     setPapers(null)
                // } 
            }) 
        })
    },[])

    return (
        <div>
            <Box>
                <List component="nav" aria-label="main mailbox folders">
                    {
                        found
                        ?   papers && papers.length!=0
                            ?
                                showDetails
                                ?
                                    <DetailedPaperCheck paper={selectedPaper} setShowDetails={setShowDetails}/>
                                :(
                                    papers.map((element, i)=>{
                                        return element.answers.map((student, j)=>{
                                            return (  
                                                <ListItem key={i+' '+j} button onClick={()=>{
                                                    setSelectedPaper({
                                                        questions:element.questions,
                                                        semester:element.semester,
                                                        subject:element.subject,
                                                        course:element.course,
                                                        answers:student.ans,
                                                        stref:student.stref,
                                                        checkCompleted: student.complete
                                                    })
                                                    setShowDetails(true)
                                                }}>
                                                    <ListItemIcon>
                                                        <TextFormatIcon />
                                                    </ListItemIcon>
                                                    <ListItemText>
                                                        <Grid container alignItems="center" style={{display:'flex'}}>
                                                            <span>{i+''+j}</span>
                                                            <Divider orientation="vertical" flexItem />
                                                            <span>{element.subject}</span>
                                                        </Grid>
                                                    </ListItemText>
                                                </ListItem>
                                            )
                                            
                                        })                                        
                                    })
                                )
                                
                            : <Loading />
                        : 'No Paper to check'
                    } 
                </List>
            </Box>
        </div>
    )
}
