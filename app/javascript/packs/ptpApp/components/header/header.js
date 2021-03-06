//External Dependencies
import React from 'react';
import { Grid, Header as SRHeader, Image, Modal } from 'semantic-ui-react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';

//Internal Dependencies
import ptpLogo from '../../assets/images/header/ptp_logo.png';
import UserVerticalMenu from './user_vertical_menu';

class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
	}

  render() {
    return(
      <div id='header'>
        <Grid verticalAlign='middle'>
          <Grid.Column width={4}>
            <IndexLink to='/'><Image src={ ptpLogo } size='medium' /></IndexLink>
          </Grid.Column>
          <Grid.Column width={12}>
            <Grid textAlign='center' verticalAlign='middle'>
              <Grid.Column width={4}><Link to='/overview'><SRHeader as='h4'>Overview</SRHeader></Link></Grid.Column>
              <Grid.Column width={4}><Link to='/set_up_interview'><SRHeader as='h4'>Start an Interview</SRHeader></Link></Grid.Column>
              <Grid.Column width={4}><SRHeader as='h4' disabled>My Responses</SRHeader></Grid.Column>
              <Grid.Column width={4}><UserVerticalMenu /></Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  };
};


const mapStateToProps = (state) => {
	return {
		github_name: state.get('user').get('user').get('github_name')
	};
};

export default connect(mapStateToProps, null)(Header);
