// External Dependencies
import React from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

// Internal Dependencies
import { clearSelectedNumQuestions, clearSelectedCategories } from "../../actions/interview_action";

class StartInterview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	gotoLink = (routePath) => {
		browserHistory.push(routePath);
	};

	handleButtonClick = (clickAction) => {
		console.log(clickAction);
		if (clickAction === 'back') {
			browserHistory.goBack();
		}
		else if (clickAction === 'clear') {
			if ((this.props.currentLocation === '/start_interview') || (this.props.currentLocation === 'select_num_questions')) {
				this.props.clearSelectedNumQuestions();
			}
			else if (this.props.currentLocation === '/start_interview/select_categories') {
				this.props.clearSelectedCategories();
			}
		}
		else if (clickAction === 'next') {
			if ((this.props.currentLocation === '/start_interview') || (this.props.currentLocation === 'select_num_questions'))  {
				this.gotoLink('/start_interview/select_categories');
			}
			else if (this.props.currentLocation === '/start_interview/select_categories') {
				this.gotoLink('/start_interview/confirm_audio');
			}
		}
	};

	render() {
		let handleBackClick = () => { this.handleButtonClick('back'); }
		let handleClearClick = () => { this.handleButtonClick('clear'); }
		let handleNextClick = () => { this.handleButtonClick('next'); }

		return (
			<div id='start-interview'>
				<h1>Start an Interview</h1>
				<br/>
				<br/>
				<Grid>
					<Grid.Row>
						{ this.props.children }
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={5}>
							{ this.props.currentLocation === '/start_interview' ? null :
								<Button icon labelPosition='left' className='nav-button' onClick={ handleBackClick }>
									Back
									<Icon name='left arrow' />
								</Button>
							}
						</Grid.Column>
						<Grid.Column width={6}>
							<Button className='nav-button' onClick={ handleClearClick }>Clear</Button>
						</Grid.Column>
						<Grid.Column width={5}>
							<Button icon labelPosition='right' className='nav-button' onClick={ handleNextClick }>
								Next
								<Icon name='right arrow' />
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		currentLocation: state.get('routing').get('locationBeforeTransitions').get('pathname')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearSelectedNumQuestions: () => {
			dispatch(clearSelectedNumQuestions());
		},
		clearSelectedCategories: () => {
			dispatch(clearSelectedCategories());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StartInterview);
