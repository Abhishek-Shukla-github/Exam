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


export default function LongQuestions(props) {
  const no = 10; // change this to required no of questions to be filled up
  
  const checkValidity = ()=>{
    let valid = true
    if(props.longQ.length<no)
      return false
    props.longQ.forEach((element)=>{   
      if(element.length == 0){
        valid = false
        return
      }
    })
    return valid
  }

  const handleQNA=(e, index)=>{
    const arr = [...props.longQ]
    arr[index] = e.target.value
    props.setLongQ(arr)

    if(checkValidity()){
      props.setValidSteps((array)=>{
        array[props.activeStep]=true
        return array
      })
    }
  }
  
  const addQuestion = ()=>{
    props.setLongQ((arr)=>[...arr, ''])
  }

  return (
    <div>
      { props.longQ.length!==0
        ? props.longQ.map((ele, index)=>
            <div key={index}>
              {(index+1)+". "}
                <TextField
                  label={'Enter Question '+(index+1)}
                  variant="outlined"
                  fullWidth
                  multiline
                  rowsMax={10}
                  value={ele}
                  onChange={(e)=>handleQNA(e, index)}
                />
              <Divider/>
            </div>
          )
        :'' 
      }
      <Button color="primary" onClick={addQuestion}>Add Question</Button>
    </div>
  );
}
