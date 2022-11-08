import { Component } from "react";
import { Link } from "react-router-dom";
import NoteCardList from '../../Components/NoteCards/noteCardList';
import './home.css';

class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return  <>
           
            {this.props.notesInfo.length ? 
                <NoteCardList notesInfo={this.props.notesInfo} selectNote={this.props.selectNote}/>
                :
                <h3>Add Some Notes</h3>
            }
            
        </>
    }
}


export default Home;