import './App.css';
import { Component } from 'react';
import {BrowserRouter}  from "react-router-dom";
import { Routes, Route, Navigate, Link } from "react-router-dom";

//Pages
import Home from './Pages/Home/home';
import Login from './Pages/UserManagement/LogIn/login';
import NotFound from './Pages/NotFound/notFound';
import Register from './Pages/UserManagement/Register/register';
import EditNote from './Pages/EditNote/editNote';

//Componets 
import Footer from './Components/Footer/footer';
import Header from './Components/Header/header';

const api_url = process.env.REACT_APP_API_URL;

const initialState = {
  //TEMP
  isLoggedIn : false,
  name: null,
  email: null,
  notesInfo : [],
  selectedNote : null
}

class App extends Component {

  constructor(props){
    super(props)

    this.state = initialState;
    
    document.title = 'My Notes App';
  }

  componentDidMount = () => {
    
    const token = window.sessionStorage.getItem('token');
    if (token){
      fetch(api_url + '/login', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(resp => resp.json())
      .then(data => {
        
        if (data && data.email){

          this.logIn(data.name,data.email,token);

        }
      })
      .catch(console.log);
    }
  }

  refreshNotesInfo = (token) => {
    if (!token)
      token = window.sessionStorage.getItem('token');

    //load notes
    fetch(api_url + '/note', {
      method: 'get',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(resp => resp.json())
    .then(notesInfo => {
      if (notesInfo){
        this.setState({notesInfo});
      }
    })
    .catch(console.log);
  }

  selectNote = (note) => {
    this.setState({selectedNote : note});
  }

  clearSelectedNote = () => {
    this.setState({selectedNote : null});
  }

  logIn = (name, email,token) => {
    this.setState({isLoggedIn:true});
    this.setState({email});
    this.setState({name});

    this.refreshNotesInfo(token);
  }

  logOut = () => {
    window.sessionStorage.removeItem('token');
    this.setState(initialState);
  }

  getRoutes() {
    let noteID = 1;

    return (
      <Routes>
         <Route path="/" element={ this.state.isLoggedIn === false ? <Navigate to="/login" /> : <Home notesInfo={this.state.notesInfo} selectNote={this.selectNote}/> }/>
         <Route path="/login" element={this.state.isLoggedIn === true ? <Navigate to="/" /> : <Login logIn={this.logIn} /> } />
         <Route path="/register" element={this.state.isLoggedIn === true ? <Navigate to="/" /> : <Register />} />
         <Route path={`/editnote`} element={this.state.isLoggedIn === false ? <Navigate to="/login" /> : <EditNote selectedNote={this.state.selectedNote} refreshNotesInfo={this.refreshNotesInfo}/>} />
         <Route path="*" element={<NotFound />} />
       </Routes> 
   )
  }

  render (){
    return (
      <BrowserRouter>
      
        <div className="App">
  
          <Header logOut={this.logOut} isLoggedIn={this.state.isLoggedIn} name={this.state.name} clearSelectedNote={this.clearSelectedNote}/>
  
          <div className='container'>
          {this.getRoutes()}
            {/* <div className='container-content'> 
              {this.getRoutes()}
            </div> */}
          </div>
          
        </div>
  
        <Footer/>
  
      </BrowserRouter>
    );
  }

}

export default App;
