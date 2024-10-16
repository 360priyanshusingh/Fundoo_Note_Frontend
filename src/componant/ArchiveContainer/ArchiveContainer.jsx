import React, { Component, useEffect, useState } from 'react'
import { getAllNotesApiCall } from '../../utils/Api';
import NoteCard from '../NoteCard/NoteCard';
import './ArchiveContainer.scss'

export default function ArchiveContainer(){
    const [notesList, setNotesList] = useState([])

    //1st step - data fetch
    useEffect(() => {
        //add 
        getAllNotesApiCall(`notes/getAllNotes`)
        .then((result)=>{
            const {data} = result;
            setNotesList(data.data?.filter((item)=>item.isArchive))
            console.log(data.data)
        })
        .catch((error)=>{
          console.log(error)
        })
    }, [])
    

    const handleUpdateList = (data, action) => {
      
         if(action==='unarchive' || action==='trash'){
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

    return(
         <div className='archive-main-container-cnt'>
       
            {notesList.length>0 && notesList.map((item) => (
              <NoteCard  key={item} noteDetails={item} container={'archive'} updateList={handleUpdateList} />
             ))
              }
        </div>
    )
}