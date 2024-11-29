import { compose } from "@mui/system";
import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import '../form.css';

const initialState = {
    signInEmail: "",
    signInPassword: "",
    name: "",
    errorMessage: "",
    feedbackMessage: "Feedback message",
    redirectToLogin: false
}

class Register extends Component {

    constructor(props){
        super(props);

        this.state = initialState;
    }

    componentDidMount = () => {
        this.setState(initialState);
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitRegister = () => {
        //check if @ is in email
        if (this.state.signInEmail.length > 0 && !this.state.signInEmail.includes('@')){
            this.setState({errorMessage: "Invalid email format."});
            return;
        }
        //Check if any field is empty
        else if(this.state.signInEmail === '' || this.state.signInPassword === '' || this.state.name === ''){
            this.setState({errorMessage: "Invalid submission."});
            return;
        }

        this.setState({feedbackMessage: "Logging in..."});

        let fetchURL = process.env.API_URL + "/register";

        fetch(fetchURL, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                name: this.state.name,
                password: this.state.signInPassword
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.email && data.name){     
                    this.setState({redirectToLogin:true});
                }
                else {
                    this.setState({errorMessage: "Unable to register"});
                }
            }).catch(this.setState({errorMessage: "Unable to register"}));
    }

    render(){

        if (this.state.redirectToLogin)
            return <Navigate to="/login"/>;

        return (
        <>
            <div>
                
                <form className="form-container">
                    {/* <div className="imgcontainer">
                        <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                    </div> */}
                    <h2>Register</h2>
        
                    <label  htmlFor="uemail"><b>Email</b></label>
                    <input  type="text" placeholder="Enter Email" name="uemail" required onChange={this.onEmailChange}></input>

                    <label  htmlFor="uname"><b>Name</b></label>
                    <input  type="text" placeholder="Enter Name" name="uname" required onChange={this.onNameChange}></input>
                                        
                    <label className="form-label" htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onChange={this.onPasswordChange}></input>          

                    <button type="button" onClick={this.onSubmitRegister}>Register</button>

                    <p>{this.state.errorMessage}</p>

                    <Link to='/login' style={{'pointer':'cursor', 'textAlign':'center'}}>
                        <p className="form-label" >Click here to Login</p>
                    </Link>
                    
                </form> 

            </div>
        </>
        );
    }

}

export default Register;