import React, {Component} from 'react';
import {logoutUser} from '../../../actions/authActions';
import {connect} from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {Link} from 'react-router-dom';
import './NavbarCustom.css';
class NavbarCustom extends Component{
  state = {
    isOpen: false
  }
  toggle= ()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logout = (e)=>{
    e.preventDefault();
    this.props.logoutUser();
  }
  render(){
    const logoutLink = (
      <NavItem>
        <NavLink href="#" onClick={this.logout}>Logout</NavLink>
      </NavItem>
    );
    const loginLink = (
      <NavItem>
        <NavLink tag={Link} to="/login">Login</NavLink>
      </NavItem>
    );
    const registerLink = (
      <NavItem>
        <NavLink tag={Link} to="/register">Register</NavLink>
      </NavItem>
    )
    const createLink = (
      <NavItem>
        <NavLink tag = {Link} to ="/create">Create</NavLink>
      </NavItem>
    )
    return(
      <div>
        <Navbar color="dark" expand="md">
          <NavbarBrand href="/">Mozart's Mechanics</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag = {Link} to="/search">Search</NavLink>
              </NavItem>
              {this.props.auth.isAuthenticated? logoutLink: [loginLink,registerLink]}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
const mapStateToProps = (state)=>({
  auth: state.auth,
});
export default connect(mapStateToProps, {logoutUser})(NavbarCustom);