import React, { Component } from 'react'

class SearchBox extends Component {
  state = {
    query: '',
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
  }

  render() {
    return (
      <form style={styles.searchContainer}>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>


    )
  }
}

const styles = {
  searchContainer: {
    color: 'black',
    margin: 0,
    fontSize: '2.5rem',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'center',
    paddingTop: '1.250rem',
    paddingBottom: '1.250rem'
  }
}
export default SearchBox;
