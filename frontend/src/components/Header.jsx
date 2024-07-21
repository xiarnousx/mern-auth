import React from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify'; 
import { useSelector, useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from "../slices/authSlice";




const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login')
    } catch(error) {
      toast.error(error.message);
    }
  }

  const guestLinks = () => {
    return (<>
              <LinkContainer to="/login">
                <Nav.Link><FaSignInAlt /> Sign In</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/register">
                <Nav.Link><FaSignOutAlt /> Sign Up</Nav.Link>
              </LinkContainer>
    </>)
  }

  const userLinks = () => {
    return (<>
      <NavDropdown title={userInfo.name} id="username">
        <LinkContainer to="/profile">
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
      </NavDropdown>
    </>)
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
        <Container>
          <LinkContainer to="/">
          <Navbar.Brand >Mern Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
            {userInfo ? userLinks() : guestLinks()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header