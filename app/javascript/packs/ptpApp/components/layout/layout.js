//External Dependencies
import React from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';

class Layout extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <div id='layout-container'>
        <div id='header-background'>
          <Container>
            <h1>I know this works</h1>
          </Container>
        </div>
        <div id='body-background'>
          <Container>
            { this.props.children }
          </Container>
        </div>
        <div id='footer-background'>
          <Container>
            <h1>I know this works</h1>
          </Container>
        </div>
      </div>
    )
  }
};
export default Layout;
