import React, { useState } from 'react'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';


export const Product = () => {

const [items,setItems] = useState("");
const [event,setEvent] = useState([]);
const [toggle,setToggle]= useState(true);
const [isEditData, setisEditData] = useState(null);


const itemEvents = (item) =>{
  setItems(item.target.value)
}

const AddItems = () =>{

  if(!items){
    alert('please fill input')
  }
  else if (items && !toggle){
    setEvent(event.map((elem)=>{
      if(elem.id === isEditData){
        return {...elem, name:items}
      }
      return elem;
    }))
    setToggle(true)
    setItems('')
    setisEditData(null)
  }
  else{
  const allInput = {id : new Date().getTime().toString(), name:items}
  setEvent((oldEvent)=>{
  return [...oldEvent,allInput]
})}
setItems("")
}

const deleteIcon = (id) =>{
const updateItems = event.filter((element)=>{
  return id !== element.id 
})
setEvent(updateItems)
}

const editIcon = (ind) =>{
const newEditItem = event.find((elem)=>{
return elem.id=== ind;
})
setToggle(false)
setItems(newEditItem.name)
setisEditData(ind)
}
  return (
    <div>
    <Box
    className='main'
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 500,
        },
      }}
    >
      
    <Paper elevation={3}>
    <h3 className='heading'> To Do List !!</h3>  
    <div className='field'>
    <TextField
          id="standard-search"
          label="Add a Item"
          type="text"
          variant="standard"
          value={items}
          onChange={itemEvents}
        />
        {toggle?<Button variant='outlined' className='addBtn' onClick={AddItems}><AddIcon/></Button>
        : <Button variant='outlined' className='addBtn' onClick={AddItems}><EditIcon /></Button>
      }
    
    </div>
    <div>
    <ol className='list'>
   { event.map((item)=>{
      return(
        <>
        
        <li key={item.id} id={item.id}>
        <div className='listItem' >
        <div className='itemName'>{item.name}</div>
        <div>
        <EditIcon onClick={() => editIcon(item.id)} className='editIcon'/>
        <CloseIcon onClick={ () => deleteIcon(item.id)} className='closeIcon'/>
        </div>
        </div>
        </li>
        
        </>
        )}
    )}
    </ol>
    </div>
    </Paper>
    </Box>
    </div>
  )
}



