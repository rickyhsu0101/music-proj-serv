import React, { Component } from 'react';
import SearchBox from '../components/SearchBox/SearchBox';

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
var createReactClass = require('create-react-class');

var searchItem = createReactClass({
  render: function () {
    return (
      <Grid.Row columns={4} style={styles.newRow}>
        <Grid.Column style={styles.fourCells}>
          <Segment>Test Name</Segment>
        </Grid.Column>
        <Grid.Column style={styles.fourCells}>
          <Segment>Test Email</Segment>
        </Grid.Column>
        <Grid.Column style={styles.fourCells}>
          <Segment>Test Handle</Segment>
        </Grid.Column>
        <Grid.Column style={styles.fourCells}>
          <Segment>Test Date</Segment>
        </Grid.Column>
      </Grid.Row>
    );
  }
});


class SearchResults extends Component {

  render() {
    return (
      <div>

        <SearchBox />
        <Header as='h2' content='Search Results' style={styles.title} />
        <Grid celled container stackable style={styles.container}>
          <Grid.Row columns={4} style={styles.newRow}>
            <Grid.Column style={styles.fourCells}>
              <Segment as='h5'>Name</Segment>
              <Segment>Test Name</Segment>
            </Grid.Column>
            <Grid.Column style={styles.fourCells}>
              <Segment as='h5'>email</Segment>
              <Segment>Test Email</Segment>
            </Grid.Column>

            <Grid.Column style={styles.fourCells}>
              <Segment as='h5' >Handle</Segment>
              <Segment>Test Handle</Segment>
            </Grid.Column>
            <Grid.Column style={styles.fourCells}>
              <Segment as='h5'>Join Date</Segment>
              <Segment>Test Date</Segment>

            </Grid.Column>


          </Grid.Row>
        </Grid>

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
export default SearchResults;