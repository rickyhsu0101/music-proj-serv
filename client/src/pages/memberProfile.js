import React, { Component } from 'react';
import SearchBox from '../components/SearchBox/SearchBox';
import MemberProjects from '../components/MemberProjets/MemberProjects';

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Menu,
  Segment,
  Step,
  Table

} from 'semantic-ui-react'




class memberProfile extends Component {

  render() {
    return (
      <div>
        <Header as='h2' content='Member Profile' style={styles.title} />
        <Grid celled container stackable style={styles.container}>
          <Grid.Row columns={4} style={styles.newRow}>
            <Grid.Column style={styles.fourCells}>
              <Segment>Name</Segment>
              <Segment>Test Name</Segment>
            </Grid.Column>
            <Grid.Column style={styles.fourCells}>
              <Segment>email</Segment>
              <Segment>Test Email</Segment>
            </Grid.Column>

            <Grid.Column style={styles.fourCells}>
              <Segment>Handle</Segment>
              <Segment>Test Handle</Segment>
            </Grid.Column>
            <Grid.Column style={styles.fourCells}>
              <Segment>Join Date</Segment>
              <Segment>Test Date</Segment>
            </Grid.Column>


          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment as='h3' style={styles.bioHeader}>Biography</Segment>
              <Segment style={styles.bioText}>Bio Text</Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1} style={styles.newRow}>
            <Grid.Column>
              <Segment as='h3' style={styles.projectHeader}>Projects</Segment>
              <Segment>
                <MemberProjects />
              </Segment>
            </Grid.Column>
          </Grid.Row>

        </Grid>
        <SearchBox />
      </div>
    );
  }
}


const styles = {
  title: {
    color: 'black',
    margin: 0,
    fontSize: '2.5rem',
    textAlign: 'center'
  },
  newRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '20px',
    paddingBottom: '20px',

  },
  container: {

    width: '100%',
  },
  twoCells: {
    width: '45%',

  },
  threeCells: {
    width: '33%',
    textAlign: 'center'
  },
  fourCells: {
    width: '24%',
    textAlign: 'left'
  },
  bioHeader: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  bioText: {
    paddingTop: '.25rem',
    paddingBottom: '1.5rem'
  },
  projectHeader: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%'
  },
  memberProject: {
    width: '100%'



  }

}
export default memberProfile;