import React, { Component } from 'react';

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


class MemberProjects extends Component {
  render() {
    return (
      <div>

        <Grid celled container stackable style={styles.container}>
          <Grid.Row columns={4} style={styles.newRow}>
            <Grid.Column style={styles.fourCells}>
              <Segment>Profile Name</Segment>

            </Grid.Column>
            <Grid.Column style={styles.fourCells}>
              <Segment>Name</Segment>

            </Grid.Column>

            <Grid.Column style={styles.fourCells}>
              <Segment>Desc</Segment>

            </Grid.Column>
            <Grid.Column style={styles.fourCells}>
              <Segment>Date</Segment>

            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const styles = {
  container: {

    width: '100%',
  },
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
  fourCells: {
    width: '24%',
    textAlign: 'left'
  }

}
export default MemberProjects;