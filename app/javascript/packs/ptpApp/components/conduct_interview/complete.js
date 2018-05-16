// External Dependencies
import React from 'react';
import { Button, Dimmer, Grid, Loader, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

class Complete extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			userResponses: [],
			mockInterviewTranscribeStatus: false
    }
	};

	componentWillMount = () => {
		this.checkMockInterviewTranscribeStatus();
	};

	checkMockInterviewTranscribeStatus = () => {
		fetch(`/api/v1/mock_interviews/${this.props.mockInterviewId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
			console.log('Transcribe Status=[' + body.transcribe_status + ']');
			console.log(body);
      this.setState({
				userResponses: body.user_response_list,
        mockInterviewTranscribeStatus: body.transcribe_status
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
	};

	handleButtonClick = (clickAction) => {
		if (clickAction === 'next') {
			browserHistory.push('/analyze_interview');
		}
	};

	render() {
		let handleNextClick = () => { this.handleButtonClick('next'); }
		const { mockInterviewTranscribeStatus } = this.state;

		const InProgressDisplay = () => (
			<div>
				<h3>We're working to analyze your results.  Please stay tuned.</h3>
				<Segment>
					<Dimmer active inverted>
						<Loader size='large'>Loading</Loader>
					</Dimmer>
				</Segment>
			</div>
		);

		const CompletedDisplay = () => (
			<div>
				<h3>Your results are ready!</h3>
				<Button icon labelPosition='right' className='nav-button next' onClick={ handleNextClick }>
					Next
					<Icon name='right arrow' />
				</Button>
			</div>
		)

		return (
			<div id='complete'>
				<Grid.Row>
					<h2>Great Job!</h2>
					<br />
				</Grid.Row>
				<Grid.Row>
					{ mockInterviewTranscribeStatus === 'COMPLETED' ?
						<CompletedDisplay /> :
						<InProgressDisplay />
					}
				</Grid.Row>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		mockInterviewId: state.get('interview').get('mockInterview').get('mock_interview').get('id')
	};
};

export default connect(mapStateToProps, null)(Complete);
