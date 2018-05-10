//External Dependencies
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router';

//Internal Dependencies
import Header from '../header/header';
import Footer from '../footer/footer';

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
        <div id='body'>
          { this.props.children }
        </div>
        <Footer />
      </div>
    )
  }
};

export default Layout;
