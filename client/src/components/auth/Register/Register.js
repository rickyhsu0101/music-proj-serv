import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../../../actions/authActions';
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
import './Register.css';
class Register extends Component{
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }
  submit=(e)=>{
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password, 
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
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
          <Col xs={1} sm={2} lg={3}></Col>
          <Col xs={10} sm={8} lg={6}>
            <Form id = "registerCont" onSubmit = {(e)=>this.submit(e)}>
              <h3 className = "head"><strong>Register</strong></h3>
              <hr/>
              <FormGroup>
                <Label for="emailInput"><b>Email</b></Label>
                <Input 
                  type="email" 
                  name="email" 
                  id="emailInput" 
                  value = {this.state.email}
                  placeholder="Enter Email" 
                  onChange = {(e)=>this.change(e)}
                  invalid = {(this.props.errors.email)? true:false}
                />
                <FormFeedback>{this.props.errors.email}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="nameInput"><strong>Name</strong></Label>
                <Input 
                  type="text" 
                  name="name" 
                  id="nameInput" 
                  value = {this.state.name} 
                  placeholder="Enter Name" 
                  onChange = {(e)=>this.change(e)}
                  invalid = {(this.props.errors.name)? true:false}
                />
                <FormFeedback>{this.props.errors.name}</FormFeedback>

              </FormGroup>
              <FormGroup>
                <Label for="passwordInput"><strong>Password</strong></Label>
                <Input 
                  type="password" 
                  name="password" 
                  id="passwordInput" 
                  value = {this.state.password}
                  placeholder="Enter Password" 
                  onChange= {(e)=>this.change(e)}
                  invalid = {(this.props.errors.password)? true:false}
                />
                <FormFeedback>{this.props.errors.password}</FormFeedback>

              </FormGroup>
              <FormGroup>
                <Label for="password2Input"><strong>Re-enter Password</strong></Label>
                <Input 
                  type="password" 
                  name="password2" 
                  id="password2Input" 
                  value = {this.state.password2}
                  placeholder="Re-Enter Password" 
                  onChange = {(e)=>this.change(e)}
                  invalid = {(this.props.errors.password2)? true:false}
                />
                <FormFeedback>{this.props.errors.password2}</FormFeedback>

              </FormGroup>
              <Button id = "submitButton">Register </Button>
              
            </Form>
          </Col>
          <Col xs={1} sm={2} lg={3}></Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {registerUser})(withRouter(Register));