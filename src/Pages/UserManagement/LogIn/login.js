import { Component } from "react";
import { Link } from "react-router-dom";
import '../form.css';

const initialState = {
    signInEmail: "",
    signInPassword: "",
    errorMessage: "",
    feedbackMessage: ""
}

class Login extends Component {

    constructor(props){
        super(props);

        this.state = initialState;
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token', token);
    }

    onSubmitLogIn = () => {
        //check if @ is in email
        if (this.state.signInEmail.length > 0 && !this.state.signInEmail.includes('@')){
            this.setState({errorMessage: "Invalid email format."});
            return;
        }
        //Check if any field is empty
        else if(this.state.signInEmail === '' || this.state.signInPassword === ''){
            this.setState({errorMessage: "Invalid submission."});
            return;
        }

        this.setState({feedbackMessage: "Logging in..."});

        fetch(`http://localhost:5000/login`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                // this.setState(initialState);
                
                if (data.email && data.success === 'true'){ 
                    this.saveAuthTokenInSession(data.token);    
                    this.props.logIn(data.name,data.email,data.token);
                }
                else {
                    this.setState({errorMessage: "Wrong email or password"});
                }
            }).catch(console.log);
    }

    render(){
        return (
        <>
            <div>  
                <form className="form-container">
                    {/* <div className="imgcontainer">
                        <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                    </div> */}
                    <h2>Log In</h2>

                    <label  htmlFor="uemail"><b>Email</b></label>
                    <input  type="text" placeholder="Enter Email" name="uemail" required onChange={this.onEmailChange}></input>
                        
                    <label className="form-label" htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onChange={this.onPasswordChange}></input>
                    
                    <button type="button" onClick={this.onSubmitLogIn}>Login</button>

                    <p>{this.state.errorMessage}</p>
                    
                </form> 

            </div>
        </>
        );
    }

}

export default Login;