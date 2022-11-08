import './header.css';
import { Link, useLocation  } from "react-router-dom";

const Header = ({logOut, isLoggedIn,name, clearSelectedNote}) => {

    const location = useLocation();
    
    let title = "Notes";
    isLoggedIn === true ? title = "Your Notes, " + name : title = "Welcome to Your Notes";

    return <div className="App-header">
        <h1>{title}</h1>

        {isLoggedIn === false ? 
            <></> 
            :
            <div>
                {location.pathname !== '/editnote' ?
                    <Link to='/editnote'>
                        <button onClick={clearSelectedNote} className='add-note-button' type="button"><b>Add Note</b></button>
                    </Link>
                : 
                    <Link to='/'>
                        <button className='add-note-button' type="button"><b>Go Back</b></button>
                    </Link>
                }
                
                <button className='logout-button' type="button" onClick={logOut}>Logout</button>
            </div>
        }
        
    </div>
}

export default Header;