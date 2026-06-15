import { Link } from "react-router-dom";
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

const Navbar = () => (
  <header className="home-header">
    <div className="navbar-row">
      <h2 className="header-title">Campus Eats</h2>
      <div className="header-links">
        <Link to="/home" className="header-link"><HomeSharpIcon /></Link>
        <Link to="/cart" className="header-link"><ShoppingCartSharpIcon /></Link>
      </div>
    </div>
  </header>
);

export default Navbar;