// External Dependencies
import React from 'react';
import { Button, Grid, Header, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';
import { browserHistory  } from 'react-router';

// Internal Dependencies

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia);

class Question extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			currentQuestionIndex: 0,
			currentQuestionAudioCaptured: false,
			recordAudio: false,
			blobAudio: null,
			blobURL: null,
			blobSize: null,
			blobType: null,
			blobStartTime: null,
			blobStopTime: null,
			showResponseWarning: false,
			warningMsg: '',
			showSuccessStatus: false
    };
	};

		startRecording = () => {
	    this.setState({
	      recordAudio: true
	    });
	  }

	  stopRecording = () => {
	    this.setState({
	      recordAudio: false
	    });
	  }

		onStart = () => {
			this.setState({
				showResponseWarning: false,
				warningMsg: ''
			});
	  }

	  onStop = (blobAudio) => {
			this.setState({
				blobAudio: blobAudio,
				blobURL: blobAudio.blobURL,
				blobSize: blobAudio.blob.size,
				blobType: blobAudio.blob.type,
				blobStartTime: blobAudio.startTime,
				blobStopTime: blobAudio.stopTime
			});

			this.onUpload();
	  };

		onUpload= () => {
			let reader = new FileReader()
			reader.onload = (event) => {
				//save audio blob in FormData and use FileReader to get into proper format
				let formData  = new FormData();
				formData.append('audio_size', this.state.blobSize);
				formData.append('audio_type', this.state.blobType);
				formData.append('audio_start_time', this.state.blobStartTime);
				formData.append('audio_stop_time', this.state.blobStopTime);
				formData.append('audio', event.target.result);
				formData.append('user_id', this.props.mockInterviewDetails.user_id);
				formData.append('mock_interview_id', this.props.mockInterviewDetails.id);
				formData.append('question_id', this.props.mockInterviewQuestions[this.state.currentQuestionIndex].id);
				formData.append('aws_transcribe_job_name', 'launch-academy-interview-user-response-user-U1M4-Q17-UR2');

				fetch('/api/v1/user_responses', {
					credentials: 'same-origin',
				  method: 'POST',
				  body: formData,
					headers: {
						'Accept': 'application/json, */*'
				  }
				}).then(response => {
					if (response.ok) {
						return response;
					}
					else {
						let errorMessage = `${response.status} (${response.statusText})`, error = new Error(errorMessage);
						throw(error);
					}
				})
				.then(response => response.json())
				.then(body => {
					// console.log(body);
					this.setState({
						currentQuestionAudioCaptured: true,
						showSuccessStatus: true
					});
				})
				.catch(error => console.error(`Error in fetch: ${error.message}`));
			};
			reader.readAsDataURL(this.state.blobAudio.blob);
		};

		handleButtonClick = (clickAction) => {
			const { currentQuestionIndex, currentQuestionAudioCaptured } = this.state;

			if (clickAction === 'next') {
				if ((currentQuestionIndex + 1 < this.props.selectedNumQuestions) && (currentQuestionAudioCaptured === true)) {
					this.setState({
						currentQuestionIndex: this.state.currentQuestionIndex + 1,
						currentQuestionAudioCaptured: false,
						showSuccessStatus: false
					});
				}
				else if ((currentQuestionIndex + 1 === this.props.selectedNumQuestions) && (currentQuestionAudioCaptured === true)) {
					// Done with interview and answered last question
					browserHistory.push('/conduct_interview/complete');
				}
				else {
					// User hasn't answered question.  Send message.
					this.setState({
						showResponseWarning: true,
						warningMsg: 'We need your response in order to proceed.'
					});
				}
			}
		};

	componentDidMount = () => {
		if(!hasGetUserMedia) {
			alert('Your browser cannot stream from your audio. Please switch to Chrome or Firefox.');
		}
	};

	handleWarningDismiss = () => {
		this.setState({ showResponseWarning: false })
	};

	handleSuccessDismiss = () => {
		this.setState({ showSuccessStatus: false })
	};

	render() {
		const { currentQuestionAudioCaptured, showResponseWarning, showSuccessStatus } = this.state;

		let handleNextClick = () => { this.handleButtonClick('next'); }

		const ResponseWarning = () => (
			<Message negative
				onDismiss={ this.handleWarningDismiss }
				icon='warning'
				header='Response Required'
				content={ this.state.warningMsg }
			/>
		);

		const ShowResponseSuccess = () => (
			<Message success
				onDismiss={ this.handleSuccessDismiss }
				icon='checkmark'
				header='Audio Success'
				content= "Great!  Your audio test worked.  Please proceed by hitting the 'Next' button."
			/>
		);

		return (
			<div id ='questions'>
				<Grid.Row>
					{ showResponseWarning ? <ResponseWarning /> : null }
					{ showSuccessStatus ? <ShowResponseSuccess /> : null }
				</Grid.Row>
				<Grid.Row id='displayed-question-progress'>
					<h2>Question { this.state.currentQuestionIndex + 1 } of { this.props.selectedNumQuestions }</h2>
					<br />
				</Grid.Row>
				<Grid.Row id='displayed-question-header'>
					<h2>{ this.props.mockInterviewQuestions[this.state.currentQuestionIndex].body }</h2>
					<br />
				</Grid.Row>
				<Grid.Row id ='record-audio'>
					<ReactMic
	          className='oscilloscope'
	          record={ this.state.recordAudio }
	          backgroundColor='#FF4081'
	          visualSetting='sinewave'
	          audioBitsPerSecond= { 128000 }
	          onStop={ this.onStop }
	          onStart={ this.onStart }
	          strokeColor='#000000'
					/>
	        <div>
	          <audio ref='audioSource' controls='controls' src={ this.state.blobURL }></audio>
	        </div>
					<Button animated='fade' onClick={ this.startRecording } >
		      	<Button.Content visible>Start Recording</Button.Content>
		      	<Button.Content hidden><Icon name='microphone' /></Button.Content>
	    		</Button>
					<Button animated='fade' onClick={ this.stopRecording }>
						<Button.Content visible>Stop Recording</Button.Content>
						<Button.Content hidden><Icon name='stop' /></Button.Content>
					</Button>
					<Button animated='fade' onClick={ this.upload }>
						<Button.Content visible>Upload Response</Button.Content>
						<Button.Content hidden><Icon name='cloud upload' /></Button.Content>
					</Button>
				</Grid.Row>
				<Grid.Row>
					<Button icon labelPosition='right' className='nav-button next' onClick={ handleNextClick }>
						Next
						<Icon name='right arrow' />
					</Button>
				</Grid.Row>
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {
		selectedNumQuestions: state.get('mockInterview').get('selectedNumQuestions'),
		mockInterviewDetails: state.get('mockInterview').get('details').toJS(),
		mockInterviewQuestions: state.get('mockInterview').get('questions').toJS()
	};
};

export default connect(mapStateToProps, null)(Question);
