// External Dependencies
import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import Moment from 'react-moment';
import { connect } from 'react-redux';

// Internal Dependencies
import QuestionSummary from './question_summary';

class InterviewSummary extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	render() {
		const questionSegments = this.props.mockInterviewQuestions.map((question, index) => {
      return(
        <QuestionSummary
					key={ question.id }
					order={ index+1 }
					body={ question.body }
					/>
      );
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
					</Segment>
				</Grid.Row>
				<Grid.Row>
					<Header as='h2' attached='top'>Interview Details</Header>
					<Segment attached>
						{ questionSegments }
					</Segment>
				</Grid.Row>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		selectedNumQuestions: state.get('interview').get('selectedNumQuestions'),
		mockInterviewDetails: state.get('interview').get('mockInterview').get('mock_interview').toJS(),
		mockInterviewQuestions: state.get('interview').get('mockInterview').get('questions').toJS()
	};
};

export default connect(mapStateToProps, null)(InterviewSummary);
