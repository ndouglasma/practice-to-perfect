// External Dependencies
import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

// Internal Dependencies
import UserResponseSummary from './user_response_summary';

class InterviewSummary extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	render() {
		const userResponseSegments = this.props.mockInterviewJson.map((userResponse, index) => {
			// question body and user responses are in seperate variables (mockInterviewQuestions and mockInterviewJson, respectively )
			const questionIndex = this.props.mockInterviewQuestions.findIndex(question => question.id === userResponse.question_id);
			// questionIndex = -1 means the question was not found
			if (questionIndex != -1) {
				const questionBody = this.props.mockInterviewQuestions[questionIndex].body;
				return(
					<UserResponseSummary
						key={ userResponse.id }
						order={ index+1 }
						text={ userResponse.data }
						question={ questionBody }
						totalLikes={ userResponse.total_likes }
						totalUms={ userResponse.total_ums }
						totalWords={ userResponse.total_words }
						/>
				);
			}
    });

		return (
			<div id='interview-summary'>
				<Grid.Row>
					<Header as='h1'>Mock Interview on <Moment format="MMMM Do YYYY">{ this.props.mockInterviewDetails.created_at}</Moment></Header>
					<br/>
					<br/>
				</Grid.Row>
				<Grid.Row>
					<Header as='h2' attached='top'>Interview Summary</Header>
					<Segment attached>
						<Header as='h4' className='summary-info'>Total Number of Questions:</Header> <p className='summary-info'>{ this.props.selectedNumQuestions }</p>
						<br/>
						<Header as='h4' className='summary-info'>Interview Date:</Header> <p className='summary-info'><Moment format="LL">{ this.props.mockInterviewDetails.created_at}</Moment></p>
						<br/>
						<Header as='h4' className='summary-info'>Total Words:</Header> <p className='summary-info'>{ this.props.mockInterviewTotalWords }</p>
						<br/>
						<Header as='h4' className='summary-info'>Total Likes:</Header> <p className='summary-info'>{ this.props.mockInterviewTotalLikes }</p>
						<br/>
						<Header as='h4' className='summary-info'>Total Ums:</Header> <p className='summary-info'>{ this.props.mockInterviewTotalUms }</p>
					</Segment>
				</Grid.Row>
				<Grid.Row>
					<Header as='h2' attached='top'>Interview Details</Header>
					<Segment attached>
						{ userResponseSegments }
					</Segment>
				</Grid.Row>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		selectedNumQuestions: state.get('mockInterview').get('selectedNumQuestions'),
		mockInterviewDetails: state.get('mockInterview').get('details').toJS(),
		mockInterviewQuestions: state.get('mockInterview').get('questions').toJS(),
		mockInterviewTotalLikes: state.get('mockInterview').get('totalLikes'),
		mockInterviewTotalUms: state.get('mockInterview').get('totalUms'),
		mockInterviewTotalWords: state.get('mockInterview').get('totalWords'),
		mockInterviewJson: state.get('mockInterview').get('json').toJS()
	};
};

export default connect(mapStateToProps, null)(InterviewSummary);
