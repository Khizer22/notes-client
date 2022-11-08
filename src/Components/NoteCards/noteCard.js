import './noteCards.css';
import { Link } from 'react-router-dom';
import {useRef} from 'react';

const handleSizeFix = (textBox) => {
    textBox.style.height = 'inherit';
    const newHeight = Math.min(textBox.scrollHeight,400)
    textBox.style.height = `${textBox.scrollHeight}px`;
}

const NoteCard = ({title,text,dateCreated}) => {
    const ref = useRef(null);
    const textRef = ref.current;
    
    if (textRef){
        handleSizeFix(textRef);
    }
        
    return (
        <Link to='/editnote' style={{'textDecoration':'none'}}>
            <div className='note'>  
                <div>
                    <h2>{title}</h2>
                    <p className='note-text' >{text}</p>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard;