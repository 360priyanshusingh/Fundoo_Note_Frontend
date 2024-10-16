import React, { useEffect, useState } from 'react'
import NoteCard from '../NoteCard/NoteCard';
import { getAllNotesApiCall } from '../../utils/Api';
import './TrashContainer.scss'

function TrashContainer() {
    const [notesList, setNotesList] = useState([])

    useEffect(() => {
        //add 
        getAllNotesApiCall(`notes/getAllNotes`)
        .then((result)=>{
            const {data} = result;
            setNotesList(data.data?.filter((item)=>item.isTrash))
            console.log(data.data)
        })
        .catch((error)=>{
          console.log(error)
        })
    }, [])

    const handleUpdateList = (data, action) => {
      // console.log(data,action)
        if (action === "add") {
          setNotesList((prevNotesList) => [...prevNotesList, data]);
        }
        else if(action==='archive' || action==='trash' || action==='delete'){
          setNotesList(notesList.filter((notes)=> notes.id!=data.id))
        }
        else if(action==='colour' || action==='update'){
          setNotesList(notesList.map((note)=>{
             if(note.id===data.id){
              return data;
             }
             return note;
          }))
        }

      };
    
  return (
    <div className='trash-main-container-cnt '> 
           {notesList.length>0 && notesList.map((item) => (
              <NoteCard  key={item} noteDetails={item} container={'trash'} updateList={handleUpdateList} />
             ))
              }
    </div>
  )
}

export default TrashContainer