import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="container">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
        Home
      </NavLink>
      <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
        Favoritos
      </NavLink>
    </nav>
    );
}

export default Nav;