import { Box, Divider, FormControl, FormControlLabel, List, ListItem, ListItemIcon, ListItemText, makeStyles, Radio, RadioGroup } from '@material-ui/core'
import React, { useState } from 'react'
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      overflowY:'scroll'
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
    },
    
}));

export default function ShortQuestions(props) {
    const classes = useStyles();
    const [shortAnswer, setShortAnswer] = useState(JSON.parse(localStorage.getItem('shorts')))
    const handleRadioChange=(v, i)=>{
        var shorts = JSON.parse(localStorage.getItem('shorts'))
        console.log(shorts)
        shorts[i].ans = v
        
        localStorage.setItem('shorts', JSON.stringify(shorts))
        setShortAnswer(shorts)
    }
    return (
        <div className={classes.scroll}>
            {
                // console.log(shortAnswer)
            }
            <List className={classes.root}>
                {
                    props.shorts.map((element, index)=>
                        <Box key={index}>
                            <ListItem className={classes.listItem} style={{flexFlow:'column', alignItems:'flex-start',}}>
                                <Box className={classes.row}>
                                    <ListItemIcon>
                                        <BookmarkOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={(index+1)+'. '+element.q} />
                                </Box>
                                <FormControl component="fieldset" error={null} className={classes.nested}>
                                    <RadioGroup name={"Question"+index} value={shortAnswer[index].ans} onChange={(e)=>handleRadioChange(e.target.value, index)}>
                                        <FormControlLabel value='op1' control={<Radio />} label={element.op1} />
                                        <FormControlLabel value='op2' control={<Radio />} label={element.op2} />
                                        <FormControlLabel value='op3' control={<Radio />} label={element.op3} />
                                        <FormControlLabel value='op4' control={<Radio />} label={element.op4} />
                                    </RadioGroup>
                                </FormControl>
                            </ListItem>
                            <Divider />
                        </Box>
                    )
                }
                
            </List>
        </div>
    )
}
