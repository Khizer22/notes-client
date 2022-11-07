import './App.css';
import { Component } from 'react';
import {BrowserRouter}  from "react-router-dom";
import { Routes, Route, Navigate, Link } from "react-router-dom";

//Pages
import Home from './Pages/Home/home';
import Login from './Pages/UserManagement/LogIn/login';
import NotFound from './Pages/NotFound/notFound';
import Register from './Pages/UserManagement/Register/register';

//Componets 
import Footer from './Components/Footer/footer';
import Header from './Components/Header/header';

const initialState = {
  //TEMP
  isLoggedIn : false,
  name: null,
  email: null,
  notesInfo : []
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
      fetch('http://localhost:5000/login', {
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

  setAllNotesInfo = (token) => {

    //load notes
    fetch('http://localhost:5000/note', {
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

  logIn = (name, email,token) => {
    this.setState({isLoggedIn:true});
    this.setState({email});
    this.setState({name});

    this.setAllNotesInfo(token);
  }

  getRoutes() {
    let noteID = 1;

    return (
      <Routes>
         <Route path="/" element={ this.state.isLoggedIn === false ? <Navigate to="/login" /> : <Home notesInfo={this.state.notesInfo}/> }/>
         <Route path="/login" element={this.state.isLoggedIn === true ? <Navigate to="/" /> : <Login logIn={this.logIn} /> } />
         <Route path="/register" element={<Register />} />
         <Route path={`/note/${noteID}`} element={<Login />} />
         <Route path="*" element={<NotFound />} />
       </Routes> 
   )
  }

  render (){
    return (
      <BrowserRouter>
      
        <div className="App">
  
          <Header/>
  
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
