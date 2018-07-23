import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../../actions/authActions';
import {searchOwnProfile} from '../../../actions/dashboardActions';
import {withRouter} from 'react-router-dom';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  Row,
  Col
} from 'reactstrap';
import './Login.css';
class Login extends Component{
  state = {
    email: '',
    password: '',
    errors: {}
  }
  submit=(e)=>{
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user, this.props.history);
  }
  change = (e)=>{
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  render(){
    return(
      
      <Container >
        
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Form id = "loginCont" onSubmit = {(e)=>this.submit(e)}>
              <h3 className = "head"><strong>Login</strong></h3>
              <hr/>
              <FormGroup>
                <Label for="emailInput"><b>Email</b></Label>
                <Input 
                  type="email" 
                  name="email"
                  id="emailInput" 
                  value={this.state.email}
                  placeholder="Enter Email" 
                  onChange = {(e)=>this.change(e)}
                  invalid = {(this.props.errors.email)? true:false}
                />
                <FormFeedback>{this.props.errors.email}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="passwordInput"><strong>Password</strong></Label>
                <Input 
                  type="password" 
                  name="password" 
                  id="passwordInput" 
                  value={this.state.password}
                  placeholder="Enter Password" 
                  onChange = {(e)=>this.change(e)}
                  invalid = {(this.props.errors.password)? true:false}
                />
              </FormGroup>
              <FormFeedback>{this.props.errors.password}</FormFeedback>
              <Button id = "loginButton">Login</Button>
            </Form>
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state)=>({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser, searchOwnProfile})(withRouter(Login));