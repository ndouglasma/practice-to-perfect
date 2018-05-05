//External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';

//Internal Dependencies
import ptpLogo from '../../assets/images/header/ptp_logo.png';
import overview_header from '../../assets/images/header/overview_header.png';
import start_interview_header from '../../assets/images/header/start_interview_header.png';
import my_responses_header from '../../assets/images/header/my_responses_header.png';
import UserVerticalMenu from './user_vertical_menu';

class Header extends React.Component {
  render() {
    const HeaderAuthenticated = () => (
      <Grid columns='equal'>
        <Grid.Column><Image src={ overview_header } size='small' /></Grid.Column>
        <Grid.Column><Image src={ start_interview_header } size='small' /></Grid.Column>
        <Grid.Column><Link to={ 'start_interview' }><Button primary><Image src={ my_responses_header } size='small' /></Link></Grid.Column>
        <Grid.Column><UserVerticalMenu /></Grid.Column>
      </Grid>
    );

    return(
      <div id='header'>
        <Grid verticalAlign='middle'>
          <Grid.Column width={4}>
            <IndexLink to='/'><Image src={ ptpLogo } size='medium' /></IndexLink>
          </Grid.Column>
          <Grid.Column width={12}>
            { (this.props.currentLocation === "/") ? null : <HeaderAuthenticated /> }
          </Grid.Column>
        </Grid>
      </div>
    );
  };
};

Header.propTypes = {
	currentLocation: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		currentLocation: state.get('routing').get('locationBeforeTransitions').get('pathname')
	};
};

export default connect(mapStateToProps, null)(Header);
