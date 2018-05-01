//External Dependencies
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Divider, Segment } from 'semantic-ui-react';

//Internal Dependencies
import PropTypes from 'prop-types';

class Login extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	}

	render() {
		return (
			<div id='login'>
				<Segment padded>
					<div id='welcome-message'>
						<h2>Practice to Perfect</h2>
						<h3>Be intentional.  Be prepared.</h3>
						<h3>All in a low stakes environment.</h3>
					</div>
			    <Divider horizontal>
						<Link to={ 'overview' }><Button primary>Log in with GitHub</Button></Link>
					</Divider>
			  </Segment>
			</div>
		);
	}
}

Login.propTypes = {
};

export default Login;
