import React, { useState } from 'react';
import './NoteCard.scss';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UnarchiveTwoToneIcon from '@mui/icons-material/UnarchiveTwoTone';
import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import { archiveApiCall, colourApiCall, deleteApiCall, trashApiCall } from '../../utils/Api';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import RestoreFromTrashTwoToneIcon from '@mui/icons-material/RestoreFromTrashTwoTone';
import Modal from '@mui/material/Modal';
import AddNotes from '../AddNotes/AddNotes';

function NoteCard(props) {
  const {noteDetails, container,updateList} = props
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const [openModal, setOpenModal] = useState(false);

  const handleModalClose = () => {
    setOpenModal(false)
  }
  const handleModalOpen = () => {
    setOpenModal(true)
  }


  const handleNoteIconsClick= async(action,selectedColour= "#ffffff")=>{

    if(action==="archive" || action==='unarchive'){
      archiveApiCall(`notes/updateNoteArchive/${noteDetails.id}`)
      .then((result)=>{
        const {data}=result
        console.log(result)
        updateList(noteDetails,action)

      })
      .catch((error)=>{
       console.log(error)
      })
    }
    else if(action==="trash"){
      setAnchorEl(null)
      trashApiCall(`notes/updateNoteTrash/${noteDetails.id}`)
      .then((result)=>{
        const {data}=result;
        updateList(noteDetails,action)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    else if(action==='delete'){
      deleteApiCall(`notes/deleteNote/${noteDetails.id}`)
      .then((result)=>{
        const {data}=result;
        updateList(noteDetails,action)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    else if(action==='colour'){
      setAnchorE2(null)
      colourApiCall(`notes/updateNoteColour/${noteDetails.id}`,{colour:selectedColour})
      .then((result)=>{
       console.log(result)
       updateList({...noteDetails,colour:selectedColour},action)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }


  const handleIconsClick=()=>{

  }

  return (
   
    <div className='notecard-container-cnt' style={{backgroundColor:noteDetails.colour?noteDetails.colour:"#FFFFFF"}} >
      <div className='notecard-container-title-cnt'> <span onClick={()=>handleModalOpen()} >{noteDetails.title}</span></div>
      <div className='notecard-container-des-cnt'> <span onClick={()=>handleModalOpen()} >{noteDetails.description}</span></div>

      <div className='notecard-container-icon-cnt'>
        {container==='trash' ?
        <>
            <Tooltip title="delete">
            <DeleteForeverTwoToneIcon className='dashbd-iconAt-cnt'  onClick={()=>handleNoteIconsClick("delete")} />
            </Tooltip>
            <Tooltip title="untrash">
            <RestoreFromTrashTwoToneIcon className='dashbd-iconAt-cnt'  onClick={()=>handleNoteIconsClick("trash")} />
            </Tooltip>
             
       
        </>
        : 

        <>
            <Tooltip title="notification">
            <NotificationsNoneOutlinedIcon className='dashbd-iconAt-cnt' />
            </Tooltip>
            <Tooltip title="collaborator">
             <PersonAddOutlinedIcon className='dashbd-iconAt-cnt' />
            </Tooltip>
            <Tooltip title="background Option">
            <ColorLensOutlinedIcon className='dashbd-iconAt-cnt'  onClick={(event)=>setAnchorE2(event.currentTarget)} />
            </Tooltip>
            <Tooltip title="add Image">
            <PhotoOutlinedIcon className='dashbd-iconAt-cnt'  />
            </Tooltip>
             
       
       
         {container==='notes'? <Tooltip title="archive"> <ArchiveOutlinedIcon className='dashbd-iconAt-cnt' onClick={()=>handleNoteIconsClick("archive",noteDetails.id)}/></Tooltip> 
          :   <Tooltip title="unarchive"> <UnarchiveTwoToneIcon  onClick={()=>handleNoteIconsClick("unarchive",noteDetails.id)} className='dashbd-iconAt-cnt' /></Tooltip>  }

             <Tooltip title="options"> <MoreVertOutlinedIcon className='dashbd-iconAt-cnt' onClick={(event)=>setAnchorEl(event.currentTarget)} />  </Tooltip>  
           
        <Menu
          anchorEl={anchorEl}
          open={open1}
          onClose={()=>setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={()=>handleNoteIconsClick("trash",noteDetails.id)} > Delete </MenuItem>
          {/* <MenuItem onClick={()=>setAnchorEl(null)} >Option 2</MenuItem>
          <MenuItem >Option 3</MenuItem> */}
        </Menu>
        </>
         }
        
      </div>
      <Menu
          anchorEl={anchorE2}
          open={open2}
          onClose={()=>setAnchorE2(null)}
          className='notecard-colour-menu'
        >
          <div className="color-palate-cnt" >
          <div className="col1" onClick={()=>handleNoteIconsClick("colour",'#FFFFFF')}> </div> 
       <div class="col2" onClick={()=>handleNoteIconsClick("colour",'#FAAFA8')}></div> 
            <div class="col3"  onClick={()=>handleNoteIconsClick("colour",'#F39F76')}></div> 
         <div class="col4" onClick={()=>handleNoteIconsClick("colour",'#FFF8B8')}></div>  
             <div class="col5" onClick={()=>handleNoteIconsClick("colour",'#E2F6D3')}></div> 
       <div class="col6" onClick={()=>handleNoteIconsClick("colour",'#B4DDD3')}></div>
          <div class="col7" onClick={()=>handleNoteIconsClick("colour",'#D4E4ED')}></div>  
            <div class="col8"  onClick={()=>handleNoteIconsClick("colour",'#AECCDC')}></div>  
            <div class="col9"  onClick={()=>handleNoteIconsClick("colour",'#D3BFDB')}></div>  
          <div class="col10"  onClick={()=>handleNoteIconsClick("colour",'#F6E2DD')}></div> 
         <div class="col11" onClick={()=>handleNoteIconsClick("colour",'#E9E3D4')}></div>
         <div class="col12" onClick={()=>handleNoteIconsClick("colour",'#EFEFF1')}></div>   
          </div >
        </Menu>

        <div>
        <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='notecard-modal-container'
        >

      
           <AddNotes className='notecard-modal' noteDetails={noteDetails} container={'notecard'} handleModal={handleModalClose} updateList={updateList} /> 
       
      
      </Modal>
        </div>
       
    </div>
  );
}

export default NoteCard;
