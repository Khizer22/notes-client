import './noteCards.css';

const NoteCard = ({title,text,dateCreated}) => {
    //<div className='myBG br3 pa3 ma2 grow bw10 shadow-5'>
    return (
        <div className='note'>  
            {/* <img src={`https://robohash.org/{title}?set=set3`} alt='robot heads'/> */}
            <div>
                <h2>{title}</h2>
                <p className='note-text'>{text}</p>
                <span className='note-date-text'>{dateCreated}</span>
            </div>
        </div>
    )
}

export default NoteCard;