import React from 'react';
import NoteCard from './noteCard';
import './noteCards.css';

const NoteCardList = ({notesInfo,selectNote}) => { 
    const noteCardsArray = notesInfo.map((note,index)=>{
        return (
            <div onClick={() => selectNote(note)} key={index}>
                <NoteCard  title={note.title} text={note.text} />
            </div>
        )
    });

    return(
        <>
            {noteCardsArray}
        </>
    );

}

export default NoteCardList;