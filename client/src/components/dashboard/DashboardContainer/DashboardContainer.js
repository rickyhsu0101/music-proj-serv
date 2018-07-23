import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreateUpdateProfile from '../CreateUpdateProfile/CreateUpdateProfile';
import {searchOwnProfile} from '../../../actions/dashboardActions';
class DashboardContainer extends Component{
  componentWillMount(){
    this.props.searchOwnProfile();
  }
  render(){
    return(
      <div>
        {!this.props.errors.noprofile? "": <CreateUpdateProfile/>}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, {searchOwnProfile})(DashboardContainer);