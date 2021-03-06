import { Link } from 'react-router-dom';

// styles & images
import './Navbar.css';
import Temple from '../../assets/temple.svg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>Project Manager</span>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <button className="btn" disabled>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
