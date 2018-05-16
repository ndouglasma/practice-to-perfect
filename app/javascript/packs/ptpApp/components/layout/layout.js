//External Dependencies
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router';

//Internal Dependencies
import Header from '../header/header';

class Layout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <div id='layout-container'>
        <Header />
        <Grid id='body'>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
            { this.props.children }
          </Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid>
      </div>
    )
  }
};

export default Layout;
