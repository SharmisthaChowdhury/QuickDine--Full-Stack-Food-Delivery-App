import React, { useState } from 'react';
import bgImg from '../components/assets/bgImg.jpg'; // Import the background image
import logo from '../components/assets/logo.png'; // Import the AmarLogo image
import { Link } from 'react-router-dom';
import Signup from './signup/Signup';
import Login from './login/Login';
import { useAuth } from './Auth'; // Import the useAuth hook
import profileLogo from '../components/assets/profile logo.jpg';

// Define your list of menu items and corresponding restaurants
const menuItems = [
  { name: 'Burger', restaurants: ['Restaurant A', 'Restaurant B', 'Restaurant C'] },
  { name: 'Pizza', restaurants: ['Restaurant A', 'Restaurant D', 'Restaurant E'] },
  { name: 'Sushi', restaurants: ['Restaurant B', 'Restaurant F', 'Restaurant G'] },
  // Add more menu items and restaurants as needed
];

// Define your list of cities
const cities = ["Kolkata", "Pune", "Hyderabad", "Lucknow"];

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeNavItem, setActiveNavItem] = useState("offer");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [location, setLocation] = useState(""); // State to store the location
  const { isLoggedIn } = useAuth(); // Get the isLoggedIn state from context
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Function to handle search input change
  const handleSearchChange = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Fetch filtered restaurants from backend
    try {
      const response = await fetch(`http://localhost:8000/search?name=${term}`);
      const data = await response.json();
      setFilteredRestaurants(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Function to handle click on nav item
  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName);
    setSearchTerm(""); // Clear search term when clicking on any nav item
    if (itemName === "offer" || itemName === "Profile") {
      setFilteredRestaurants([]); // Clear filtered restaurants when clicking on "Home" or "Profile"
    }
  };

  // Function to handle location input change
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Function to toggle login form visibility
  const toggleLogin = () => {
    setShowLogin(!showLogin);
    setShowSignup(false); // Ensure signup form is hidden when login form is shown
  };

  // Function to toggle signup form visibility
  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin(false); // Ensure login form is hidden when signup form is shown
  };

  // Function to close signup form
  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  // Function to handle close button in Login component
  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div style={{ position: 'relative', backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <nav className="navbar navbar-expand-lg" style={{ height: '70px' }}>
        <div className="container-fluid justify-content-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0" style={{ paddingLeft: '10px' }}>
              <li className="nav-item" onClick={() => handleNavItemClick("offer")}>
                <Link to="/offer" className={`nav-link ${activeNavItem === "offer" ? "active" : ""}`} style={{ color: 'white' }}>
                  Deals & Offers{activeNavItem === "offer" ? <hr /> : <></>}
                </Link>
              </li>
              <li className="nav-item" onClick={() => handleNavItemClick("Explore")}>
                <Link to="/Explore" className={`nav-link ${activeNavItem === "Explore" ? "active" : ""}`} href="#" style={{ color: 'white' }}>
                  Explore{activeNavItem === "Explore" ? <hr /> : <></>}
                </Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item" onClick={() => handleNavItemClick("Profile")}>
                  <Link to="/profile" className={`nav-link ${activeNavItem === "Profile" ? "active" : ""}`} style={{ color: 'white' }}>
                    Profile{activeNavItem === "Profile" ? <hr /> : <></>}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="d-flex" style={{ position: 'fixed', top: '10px', right: '10px', minWidth: '150px' }}>
            {!isLoggedIn ? ( // Render login/signup buttons if user is not logged in
              <>
                <button className="btn btn-outline-light me-2" onClick={toggleLogin}>Login</button>
                <button className="btn btn-light" onClick={toggleSignup}>Sign Up</button>
              </>
            ) : ( // Render profile logo and dropdown if user is logged in
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={profileLogo} alt="Profile" style={{ width: '30px', height: '30px', marginTop: '-10px', borderRadius: '10px' }} />
                  <span style={{ marginLeft: '10px', fontSize: '16px', color: 'white' }}>Happy Eating!</span> {/* Adjust fontSize to 16px */}
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ minWidth: '150px' }}>
                  <li><Link to="/cart" className={`dropdown-item ${activeNavItem === "Cart" ? "active" : ""}`} style={{ color: 'black' }}>Cart</Link></li>
                  <li><Link to="/profile" className={`dropdown-item ${activeNavItem === "Profile" ? "active" : ""}`} style={{ color: 'black' }}>Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={toggleLogin}>Logout</button></li>
                </ul>
              </li>
            )}
          </div>
        </div>
      </nav>
      {/* Logo */}
      {!showLogin && !showSignup && (
        <div className="d-flex justify-content-center align-items-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -150%)', zIndex: '1000' }}>
          <img src={logo} alt="logo" style={{ width: '300px', marginBottom: '0.5px' }} />
        </div>
      )}
      {/* Location and search bars */}
      {!showLogin && !showSignup && (
        <div style={{ color: 'white', textAlign: 'center', padding: '10px 0', display: 'flex', justifyContent: 'center', zIndex: '100' }}>
          {/* Location input with dropdown */}
          <select
            className="form-control me-2"
            aria-label="Location"
            value={location}
            onChange={handleLocationChange}
            style={{ backgroundColor: '#f2f2f2', color: 'black', width: '200px', marginRight: '10px', marginBottom: '1px' }}
          >
            <option value="">Select Location</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          {/* Search input */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ backgroundColor: '#f2f2f2', color: 'black', width: '300px', marginBottom: '1px' }}
            />
          </form>
        </div>
      )}
      {/* Render the list of restaurants based on search term */}
      {filteredRestaurants.length > 0 && (
  <div className="search-results" style={{
    position: 'absolute',
    top: 'calc(50% + 50px)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    maxWidth: '400px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.15)',
    zIndex: '1000',
    overflow: 'hidden',
    maxHeight: '300px', // Limit the height
    overflowY: 'auto', // Add scroll if content is too long
    border: '1px solid #ddd',
    padding: '10px',
    boxSizing: 'border-box'
  }}>
    <ul className="list-group" style={{ padding: '0', margin: '0' }}>
      {filteredRestaurants.map((restaurant, index) => (
        <li key={index} className="list-group-item" style={{
          padding: '10px',
          margin: '0',
          borderBottom: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
          {restaurant}
        </li>
      ))}
    </ul>
  </div>
)}

      {/* Render Login Component */}
      {showLogin && <Login onClose={handleCloseLogin} />}

      {/* Render Signup Component */}
      {showSignup && <Signup onClose={handleCloseSignup} />}
    </div>
  );
};

export default Header;
