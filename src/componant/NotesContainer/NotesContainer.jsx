import React, { Component, useEffect, useState } from 'react'
import AddNotes from '../AddNotes/AddNotes'
import NoteCard from '../NoteCard/NoteCard'
import { getAllNotesApiCall } from '../../utils/Api'
 import './NotesContainer.scss'
export default function NotesContainer(){
    const [notesList, setNotesList] = useState([])

    //1st step - data fetch
    useEffect(() => {
        //add 
        getAllNotesApiCall(`notes/getAllNotes`)
        .then((result)=>{
            const {data} = result;
            setNotesList(data.data.filter((notes)=>!notes.isArchive && !notes.isTrash))
            console.log(data.data)
        })
        .catch((error)=>{
          console.log(error)
        })
    }, [])
    

    const handleUpdateList = (data, action) => {
        if (action === "add") {
          setNotesList((prevNotesList) => [...prevNotesList, data]);
        }
        else if(action==='archive' || action==='trash'){
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
       <div className='notes-main-container-cnt' >
        <div className='notes-addnotes-container-cnt'>
           <AddNotes updateList={handleUpdateList} />
        </div>
       
        <div className='notes-container-cnt'>
        {notesList.length>0 && notesList.map((item) => (
              <NoteCard  key={item} noteDetails={item} container={'notes'} updateList={handleUpdateList} />
             ))
       }

        </div>
    
       </div>
    )
        
}