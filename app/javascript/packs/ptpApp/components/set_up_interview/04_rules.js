// External Dependencies
import React from 'react';
import { Button, Grid, Header, Icon, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

class Rules extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	handleButtonClick(clickAction) => {
		console.log(clickAction);

		if (clickAction === 'back') {
			browserHistory.goBack();
		}
		else if (clickAction === 'next') {
			browserHistory.push('/set_up_interview/countdown');
		}
	};

	render() {

		let handleBackClick = () => { this.handleButtonClick('back'); }
		let handleNextClick = () => { this.handleButtonClick('next'); }

		return (
			<div id ='rules'>
				<Grid.Row>
					<h2>Let's Lay Down the Rules</h2>
					<br />
				</Grid.Row>
				<Grid.Row>
					<List divided ordered relaxed>
				    <List.Item>
				      <List.Content>
				        <List.Header as='h3'>Treat This as a Real Interview</List.Header>
				        <List.Description>Make sure you're in a quiet space to interact with your microphone and you're void of distractions.</List.Description>
				      </List.Content>
				    </List.Item>
				    <List.Item>
				      <List.Content>
				        <List.Header as='h3'>Speak Clearly for Your Responses</List.Header>
				        <List.Description>Make sure your responses are clear and audible for the microphone to pick up.</List.Description>
				      </List.Content>
				    </List.Item>
				    <List.Item>
				      <List.Content>
				        <List.Header as='h3'>No Going Backwards; No Do Overs</List.Header>
				        <List.Description>Just like with a real interview, you're not going to be able to hit a "do over" button.  Please proceed through all the questions.  Remember, with practice comes perfection (you can only go up from here).</List.Description>
				      </List.Content>
				    </List.Item>
						<List.Item>
							<List.Content>
								<List.Header as='h3'>Relax and Be Your Authentic Self</List.Header>
								<List.Description>You want prospective employers to get to know you.  So be true to yourself in all your answers.</List.Description>
							</List.Content>
						</List.Item>
				  </List>
				</Grid.Row>
				<Grid.Row>
					<Button icon labelPosition='left' className='nav-button' onClick={ handleBackClick }>
						Back
						<Icon name='left arrow' />
					</Button>
					<Button icon labelPosition='right' className='nav-button next' onClick={ handleNextClick }>
						Next
						<Icon name='right arrow' />
					</Button>
				</Grid.Row>
			</div>
		);
	}
};

export default Rules;
