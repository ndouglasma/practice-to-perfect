// External Dependencies
import React from 'react';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';

// Internal Dependencies

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia);

class Question extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			currentQuestionIndex: 0,
			recordAudio: false,
			blobAudio: null,
			blobURL: null,
			blobSize: null,
			blobType: null,
			blobStartTime: null,
			blobStopTime: null
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
	    console.log('You can tap into the onStart callback');
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

				fetch('/api/v1/user_response', {
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
					console.log('MADE IT HERE');
					console.log(body);
				})
				.catch(error => console.error(`Error in fetch: ${error.message}`));
			};
			reader.readAsDataURL(this.state.blobAudio.blob);
		};

		handleButtonClick = (clickAction) => {
			if (clickAction === 'next') {
				// Adding 1 because question array starts at 0
				if (this.state.currentQuestionIndex + 1 < this.props.selectedNumQuestions) {
					this.setState({
						currentQuestionIndex: this.state.currentQuestionIndex + 1
					});
				}
				else {
					// Done with interview
					console.log('DONE WITH INTERVIEW');
				}
			}
		};

	componentDidMount = () => {
		if(!hasGetUserMedia) {
			alert('Your browser cannot stream from your audio. Please switch to Chrome or Firefox.');
		}
	};

	render() {
		let handleNextClick = () => { console.log('Got action'); this.handleButtonClick('next'); }

		return (
			<div id ='questions'>
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
		selectedNumQuestions: state.get('interview').get('selectedNumQuestions'),
		mockInterviewDetails: state.get('interview').get('mockInterview').get('mock_interview').toJS(),
		mockInterviewQuestions: state.get('interview').get('mockInterview').get('questions').toJS()
	};
};

export default connect(mapStateToProps, null)(Question);
