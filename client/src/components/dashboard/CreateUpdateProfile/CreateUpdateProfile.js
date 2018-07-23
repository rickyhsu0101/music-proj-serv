import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import {createUpdateProfile, searchOwnProfile} from '../../../actions/dashboardActions';
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
class CreateUpdateProfile extends Component{
  state = {
    index: 0,
    handle: '',
    bio: ''
  }
  componentWillMount(){
    this.props.searchOwnProfile();
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      bio: nextProps.profile.profile.bio,
      handle: nextProps.profile.profile.handle
    });
  }
  change=(e)=>{
    e.preventDefault();
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  submit=(e)=>{
    e.preventDefault();
    const {handle, bio} = this.state;
    console.log(handle+ " "+ bio);
    this.props.createUpdateProfile({
      handle,
      bio
    }, this.props.history);
  }
  render(){
    return (
      <Container >
        
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}>
            {!this.props.errors.noprofile?<Link to ="/dashboard"><Button>Back</Button></Link>:""}
            <Form id = "profileUpdateCont" onSubmit = {(e)=>this.submit(e)}>
              <h3 className = "head"><strong>{isEmpty(this.props.profile.profile)?"Create Profile":"Update Profile"}</strong></h3>
              <hr/>
              <FormGroup>
                <Label for="handleInput"><b>Select handle</b></Label>
                <Input 
                  type="text" 
                  name="handle"
                  id="handleInput" 
                  value = {this.state.handle}
                  placeholder="Enter Handle" 
                  onChange = {(e)=>this.change(e)}
                  invalid = {(this.props.errors.handle)? true:false}
                />
                <FormFeedback>{this.props.errors.handle}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="bioInput"><strong>Biography</strong></Label>
                <Input 
                  type="textArea" 
                  name="bio" 
                  id="bioInput" 
                  value={this.state.bio}
                  placeholder="Enter Biography" 
                  onChange = {(e)=>this.change(e)}
                  invalid = {(this.props.errors.bio)? true:false}
                />
                <FormFeedback>{this.props.errors.bio}</FormFeedback>
              </FormGroup>
              <Button id = "updateProfile">{this.props.errors.noprofile? "Create":"Update"}</Button>
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
export default connect(mapStateToProps, {createUpdateProfile, searchOwnProfile})(withRouter(CreateUpdateProfile));