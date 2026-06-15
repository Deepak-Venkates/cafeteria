import { Outlet, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";

const App = () => {
  const mail = localStorage.getItem('Email');
  return (
    <div>
      {
        mail !== null ?
        <div>
          <Outlet />
        </div>
        : 
        <center>
            <h3>Can't access without login</h3>
        </center>
      }
    </div>

  );

}

export default App;
