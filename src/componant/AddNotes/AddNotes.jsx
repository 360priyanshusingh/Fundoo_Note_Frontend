import React, { useRef, useState } from 'react'
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import './AddNotes.scss'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { craeteNoteApiCall, updateNotesApiCall } from '../../utils/Api';
import { Tooltip } from '@mui/material';

export default function AddNotes(props) {
  const {container,handleModal,updateList,noteDetails}=props
  const [colour,setColour]=useState(noteDetails?noteDetails.colour:'#ffffff')
  const [conditional,setConditional]=useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [title,setTitle]=useState(noteDetails?noteDetails.title:'')
  const [description,setDescription]=useState(noteDetails?noteDetails.description:'')


  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

 
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConditional =()=>{
    setConditional(!conditional)
  }

  const hendleSubmit=async()=>{
    if(!title){
      return alert("title is required !")
    }
    if(!description){
      return alert('password is required !')
    }
    if(noteDetails){
      handleModal()
      updateNotesApiCall(`notes/updateNote/${noteDetails.id}`,{title,description,colour})
      .then((result)=>{
        console.log(result)
        const {data}=result
        updateList({...noteDetails,title:title,description:description,colour:colour},'update')
      })
      .catch((error)=>{
       console.log(error)
      })
    }
    else{
      handleConditional()
      craeteNoteApiCall({title,description},`notes/createNote`)
      .then((result)=>{
          console.log(result)
          const {data}=result
          setTitle('')
          description('')
          updateList(data.data,"add")
      })
      .catch((error)=>{
         console.log(error)
      })
    }
   
  }


  const colourChange=(selectedColour)=>{
    setAnchorEl(!anchorEl)
    setColour(selectedColour)
  }


  return (
    <div className='addNotes-container-main-cnt' >
      {!conditional && container!=='notecard'? 
        <div className='addNotes-container-cnt' >
        <div className='addNotes-container-dash-cnt' onClick={()=> handleConditional()}>
            <input type='text' className='addNotes-container-input-cnt' onChange={(e)=>setTitle(e.target.value)}  placeholder='Take a note ...' />
           
             <div className='addNotes-dash-icon-cnt' >
              <CheckBoxOutlinedIcon  className='dash-icon-cnt'/>
              <BrushOutlinedIcon className='dash-icon-cnt'/>
              <PhotoOutlinedIcon className='dash-icon-cnt'/>
            </div> 
        </div>
        </div>
        :
        <div className='noteUI-wrapper-cnt'  style={{backgroundColor:colour}} >
        <div className='noteInput-inputCnt-cnt'>
        <input type='text' value={title} className='noteInput-titleInput-cnt'  style={{backgroundColor:colour}} onChange={(e) => setTitle(e.target.value)}  placeholder='Title' />
        <input type='text' value={description} className='noteInput-titleInput-cnt'  style={{backgroundColor:colour}}  onChange={(e) =>setDescription(e.target.value)} placeholder='Take a note ...' />

        </div>

         <div className='dashbd-icon-ct' >
           <div className='noteUI-iconsactions-cnt'>
            <Tooltip title='notifications' >
                   <NotificationsNoneOutlinedIcon className='dashbd-iconAt-cnt' /> 
            </Tooltip>
            <Tooltip title='collaborator' >
                  <PersonAddOutlinedIcon className='dashbd-iconAt-cnt' />
            </Tooltip>
            <Tooltip title='background options'>
                 <ColorLensOutlinedIcon className='dashbd-iconAt-cnt' onClick={(event)=>setAnchorEl(event.currentTarget)} />
            </Tooltip>
          
           
            <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={()=>setAnchorEl(null)}
          className='addNote-colour-menu'
          
        >
          <div className="color-palate-cnt" >
          <div className="col1" onClick={()=>colourChange('#FFFFFF')}> </div> 
       <div class="col2" onClick={()=>colourChange('#FAAFA8')}></div> 
           <div class="col3"  onClick={()=>colourChange('#F39F76')}></div> 
         <div class="col4" onClick={()=>colourChange('#FFF8B8')}></div>  
             <div class="col5" onClick={()=>colourChange('#E2F6D3')}></div> 
       <div class="col6" onClick={()=>colourChange('#B4DDD3')}></div>
           <div class="col7" onClick={()=>colourChange('#D4E4ED')}></div>  
            <div class="col8"  onClick={()=>colourChange('#AECCDC')}></div>  
            <div class="col9"  onClick={()=>colourChange('#D3BFDB')}></div>  
          <div class="col10"  onClick={()=>colourChange('#F6E2DD')}></div> 
         <div class="col11" onClick={()=>colourChange('#E9E3D4')}></div>
         <div class="col12" onClick={()=>colourChange('#EFEFF1')}></div>   
          </div >
        </Menu>
            <Tooltip title="add image">
            <PhotoOutlinedIcon className='dashbd-iconAt-cnt' />
            </Tooltip>
            <Tooltip title="archive" >
            <ArchiveOutlinedIcon className='dashbd-iconAt-cnt' /> 
            </Tooltip>
            <Tooltip title='options' >
            <MoreVertOutlinedIcon className='dashbd-iconAt-cnt' />
            </Tooltip>
           
            
            
            {/* <UndoIcon className='dashbd-iconAt-cnt' />
            <RedoIcon className='dashbd-iconAt-cnt' /> */}

          </div>
             <button className='noteInput-closeBtn-cnt' onClick={hendleSubmit} >
                Close
            </button>

        </div>
     
    

       </div>
  
      }
        
        
    
       
       
    </div>
      
  )
}

