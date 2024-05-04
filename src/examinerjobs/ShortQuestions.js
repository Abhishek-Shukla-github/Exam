import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      minWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));


export default function ShortQuestions(props) {
  const classes = useStyles();
  
  const no = 5; // change this to required no of questions to be filled up
  const checkValidity = ()=>{
    if(props.shortQ.length<no)
      return false

    const found = props.shortQ.find((element) => element.op1.length===0 || element.op2.length===0 || element.op3.length===0 || element.op3.length===0)
    if(found)
      return false

    return true
  }

  const handleQNA=(e, index)=>{
    const arr = [...props.shortQ]
    arr[index][e.target.name] = e.target.value
    props.setShortQ(arr)

    if(checkValidity()){
      props.setValidSteps((array)=>{
        array[props.activeStep]=true
        return array
      })
    } else {
      props.setValidSteps((array)=>{
        array[props.activeStep]=false
        return array
      })
    }
  }
  
  const addQuestion = ()=>{
    props.setShortQ((arr)=>[...arr, {q:'', op1:'', op2:'', op3:'', op4:''}])
  }

  return (
    <div>
      {console.log(props.shortQ)}
      { props.shortQ.length!==0
        ? props.shortQ.map((ele, index)=>
            // <Question key={index} index={index} question={ele}/>
            <div key={index}>
              {(index+1)+". "}
              <div className='question'> 
                <TextField
                  label={'Enter Question '+(index+1)}
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={10}
                  value={ele.q}
                  name='q'
                  onChange={(e)=>handleQNA(e, index)}
                />
                <div className='options'>
                  <TextField fullWidth required label="Option 1" multiline value={ele.op1} name='op1' maxRows={10} onChange={(e)=>handleQNA(e, index)}/>
                  <TextField fullWidth required label="Option 2" multiline value={ele.op2} name='op2' maxRows={10} onChange={(e)=>handleQNA(e, index)}/>
                  <TextField fullWidth required label="Option 3" multiline value={ele.op3} name='op3' maxRows={10} onChange={(e)=>handleQNA(e, index)}/>
                  <TextField fullWidth required label="Option 4" multiline value={ele.op4} name='op4' maxRows={10} onChange={(e)=>handleQNA(e, index)}/>
                </div>
              </div>
              <Divider/>
            </div>
          )
        :'' 
      }
      <Button color="primary" onClick={addQuestion}>Add Question</Button>
    </div>
  );
}
