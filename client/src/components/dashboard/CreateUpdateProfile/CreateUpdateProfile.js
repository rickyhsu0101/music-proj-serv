import React, {Component} from 'react';
import {connect} from 'react-redux';
import isEmpty from '../../../validation/isEmpty';
class CreateUpdateProfile extends Component{
  state = {

  }
  render(){
    return (
      <Container >
        
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            <Form id = "profileUpdateCont" onSubmit = {(e)=>this.submit(e)}>
              <h3 className = "head"><strong>{isEmpty(this.props.profile.profile)?"Create Profile":"Update Profile"}</strong></h3>
              <hr/>
              <FormGroup>
                <Label for="emailInput"><b>Email</b></Label>
                <Input 
                  type="email" 
                  name="email"
                  id="emailInput" 
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
const mapStateToProps=(state)=>({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});
export default connect(null, {})(CreateUpdateProfile);