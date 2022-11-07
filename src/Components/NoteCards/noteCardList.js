import React from 'react';
import NoteCard from './noteCard';
import './noteCards.css';

const NoteCardList = ({notesInfo}) => { 
    const noteCardsArray = notesInfo.map((note,index)=>{
        return <NoteCard key={index} title={note.title} text={note.text} dateCreated={"DATE CREATED"}/>
    });

    return(
        <>
            {noteCardsArray}
        </>
    );

}

export default NoteCardList;