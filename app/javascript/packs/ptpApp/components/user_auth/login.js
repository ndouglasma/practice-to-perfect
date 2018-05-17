//External Dependencies
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Divider, Grid, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

// Internal Dependencies
import { requestUserInterviewsAPI } from "../../actions/user_action";

class Login extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			userInterviews: []
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
						<Link to={ 'overview' }><Button primary><Icon name='github' /> Log in with GitHub</Button></Link>
					</Divider>
				</Segment>
				<br />
				<br />
				<Segment padded className='about'>
					<p>Practice makes perfect, and with the Practice to Perfect app, you can get the necessary practice to crush all your interviews. Practice to Perfect gives you access to a database of interview question types (behavioral, problem-solving, motivational, technical/skills-based, and informational) and transcribes your audio answers to text for you to review.</p>
				</Segment>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		requestUserInterviews: () => {
			dispatch(requestUserInterviewsAPI());
		}
	};
};

export default connect(null, mapDispatchToProps)(Login);
