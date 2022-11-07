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
            <NoteCardList notesInfo={this.props.notesInfo}/>            
        </>
    }
}


export default Home;