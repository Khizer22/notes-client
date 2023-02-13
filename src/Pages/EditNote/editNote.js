import { Component } from "react";
import { Navigate } from "react-router-dom";
import './editNote.css';

const initialState = {
    note_id: 0,
    noteTitle: '',
    noteText: '',
    submitDisabled: false,
    redirectToHome: false
}

class EditNote extends Component {
    constructor(props){
        super(props);

        this.state = initialState;
    }

    componentDidMount = () => {
        if (this.props.selectedNote !== null){
            this.setState({noteText: this.props.selectedNote.text});
            this.setState({noteTitle: this.props.selectedNote.title});
            this.setState({note_id: this.props.selectedNote.note_id})
        }
        console.log('mounted');
    }

    onSubmitNote = () => {

        this.setState({submitDisabled: true});

        const token = window.sessionStorage.getItem('token');

        let fetchURL = 'https://secret-lowlands-35717.herokuapp.com/note';
        let method = 'post';

        //Create if no id
        if (this.state.note_id > 0){
            fetchURL += `/${this.state.note_id}`;
            method = 'put';
        }

        fetch(fetchURL, {
            method: method,
            headers: {'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token    
            },
            body: JSON.stringify({
                title: this.state.noteTitle || "My Note Title",
                text: this.state.noteText || "Not noted"
            })
        })
            .then(response => {
                return response.json();
            })
            .then(response => {                
                if (response.note_id){         
                    this.props.refreshNotesInfo(token);
                    this.setState({redirectToHome: true});
                    this.state = initialState;
                }
                else
                    this.setState({submitDisabled:false})
            })
            .catch(err => {
                this.setState({submitDisabled:false});
            });
    }

    onDelete = () => {
        const token = window.sessionStorage.getItem('token');

        fetch(`https://secret-lowlands-35717.herokuapp.com/note/${this.state.note_id}`, {
            method: 'delete',
            headers: {'Content-Type':'application/json',
            'Authorization': 'Bearer ' + token    
            }
        })
            .then(response => {
                return response.json();
            })
            .then(response => {                
                if (response === 'deleted'){         
                    this.props.refreshNotesInfo(token);
                    this.setState({redirectToHome: true});
                    this.state = initialState;
                }
                else
                    this.setState({submitDisabled:false})
            })
            .catch(err => {
                this.setState({submitDisabled:false});
            });
    }

    onTitleChange = (event) => {
        this.setState({noteTitle:event.target.value});
    }

    onTextChange = (event) => {
        this.setState({noteText: event.target.value});
    }

    render(){

        if (this.state.redirectToHome)
            return <Navigate to='/'/>

        return(
            <div>

                <div className="sub-del-buttons">
                    <button className='submit-note-button' disabled={this.state.submitDisabled} type="button" onClick={this.onSubmitNote}>Submit Note</button>
                    {this.state.note_id > 0 ? 
                    <button className='delete-note-button' disabled={this.state.submitDisabled} type="button" onClick={this.onDelete}>Delete</button>
                    :
                    <></>
                    }
                               
                </div>
                <form className='edit-note'>
                    
                    <div>
                        <input className="edit-note-title" type="text" placeholder="Enter Title" defaultValue={this.state.noteTitle} name="utitle" maxLength={20} onChange={this.onTitleChange}/>
                        <textarea  className="edit-note-text" type="text" placeholder="Enter Note" name="utext" defaultValue={this.state.noteText} onChange={this.onTextChange}/>                       
                    </div>
                </form>
            </div>
        );
    }
}

export default EditNote;