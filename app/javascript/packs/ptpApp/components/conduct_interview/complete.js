// External Dependencies
import React from 'react';
import { Button, Dimmer, Loader, Grid, Icon, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

// Internal Dependencies
import { setTranscribeResults } from "../../actions/interview_action";

class Complete extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			userResponses: [],
			mockInterviewTranscribeStatus: 'IN_PROGRESS',
			displayHeader: "We're working to analyze your results.  This make take a few minutes.  Please stay tuned.",
			displayNextButton: false
    }
	};

	componentWillMount = () => {
		this.checkMockInterviewTranscribeStatus();
	};

	componentDidMount = () => {
		// Preliminary attempt at this function will repeat the checkMockInterviewTranscribeStatus up to 4 times in hopes all transcribe jobs are complete
		// In future will incorporate more robust functionality to handle the possibility a job may fail or take long
		// repeat with the interval of 2 seconds
		// console.log('INSIDE componentDidUpdate');
		setTimeout(()=>{
    	this.checkMockInterviewTranscribeStatus();
		},180000);
	}

	checkMockInterviewTranscribeStatus = () => {
		// console.log('running checkMockInterviewTranscribeStatus');
		const d = new Date();
		// console.log(d);
		fetch(`/api/v1/mock_interviews/${this.props.mockInterviewId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
				this.setState({
					mockInterviewTranscribeStatus: 'FAILED'
				});
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
			// console.log('Transcribe Status=[' + body.transcribe_results.status + ']');
			// console.log(body);
			this.setState({
				// userResponses: body.user_response_list,
				// mockInterviewTranscribeStatus: body.transcribe_results.status
				userResponses: body.transcribe_results.json,
				mockInterviewTranscribeStatus: body.transcribe_results.status
			});
			if (body.transcribe_results.status === 'COMPLETED') {
				this.setState({
					displayHeader: "Your results are ready!",
					displayNextButton: true
				});
			}
			//save results to Redux store
			this.props.setTranscribeResults(
				body.transcribe_results.json,
				body.transcribe_results.status,
				body.transcribe_results.total_likes,
				body.transcribe_results.total_ums,
				body.transcribe_results.total_words
			);
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
		const { mockInterviewTranscribeStatus, displayHeader, displayNextButton } = this.state;

		return (
			<div id='complete'>
				<Grid.Row>
					{ displayNextButton === true ?
						<div>
							<h3>{ displayHeader }</h3>
							<Button icon labelPosition='right' className='nav-button next' onClick={ handleNextClick }>
								Next
								<Icon name='right arrow' />
							</Button>
						</div>
						:
						<Segment padded id='dimmer-loader'>
							<Dimmer active={ !displayNextButton }>
								<Loader size='large' indeterminate><h3>{ displayHeader }</h3></Loader>
							</Dimmer>
						</Segment>
					}
				<br />
				</Grid.Row>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		mockInterviewId: state.get('mockInterview').get('details').get('id')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setTranscribeResults: (json, status, totalLikes, totalUms, totalWords) => {
			dispatch(setTranscribeResults(json, status, totalLikes, totalUms, totalWords));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Complete);
