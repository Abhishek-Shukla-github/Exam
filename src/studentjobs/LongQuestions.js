import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listItem:{
        display:'flex',   
    },
    row:{
        display:'flex',
        flexFlow:'row',
        alignItems:'center',
    }
}));

export default function LongQuestions(props) {
    const classes = useStyles();

    const [longAnswer, setLongAnswer] = useState(JSON.parse(localStorage.getItem('longs')))
    const handleRadioChange=(v, i)=>{
        var longs = JSON.parse(localStorage.getItem('longs'))
        longs[i].ans = v
        // console.log(shorts)
        localStorage.setItem('longs', JSON.stringify(longs))
        setLongAnswer(longs)
    }
    return (
        <div>
            <List className={classes.root}>
                {
                    props.longs.map((element, index)=>
                        <Box key={index}>
                            <ListItem className={classes.listItem} style={{flexFlow:'column', alignItems:'flex-start',}}>
                                <Box className={classes.row}>
                                    <ListItemIcon>
                                        <BookmarkOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={(index+1)+'. '+element} />
                                </Box>
                                <ListItemText primary='Answer'/>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rowsMax={50}
                                    rows={10}
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e)=>handleRadioChange(e.target.value, index)}
                                    value={longAnswer[index].ans}
                                />
                            </ListItem>
                            <Divider />
                        </Box>
                    )
                }
                
            </List>
        </div>
    )
}
