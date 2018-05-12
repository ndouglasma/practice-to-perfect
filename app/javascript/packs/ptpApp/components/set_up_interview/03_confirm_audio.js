// External Dependencies
import React from 'react';
import { Button, Grid, Header, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';
import { browserHistory  } from 'react-router';

// Internal Dependencies

class ConfirmAudio extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			microphoneAccess: false,
			recordAudio: false,
			blobURL: null,
			showErrorStatus: false,
			showSuccessStatus: false,
			errorMsg: ''
    };
	};

	startRecording = () => {
		if (this.state.microphoneAccess === true) {
			this.setState({
				recordAudio: true,
				showErrorStatus: false
			});
		}
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
		// console.log(blobAudio);
		this.setState({
			blobURL: blobAudio.blobURL,
			showErrorStatus: false,
			showSuccessStatus: true
		});
	};

	handleButtonClick = (clickAction) => {
		console.log(clickAction);

		if (clickAction === 'back') {
			browserHistory.goBack();
		}
		else if (clickAction === 'next') {
			browserHistory.push('/set_up_interview/rules');
		}
	};

	handleErrorDismiss = () => {
		this.setState({ showErrorStatus: false })
	};

	handleSuccessDismiss = () => {
		this.setState({ showSuccessStatus: false })
	};

	componentDidMount = () => {
		let errorMsg = '';
		//work on compatibility with multiple browsers
		// const hasGetUserMedia = !!(navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia ||
		// 	navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia);

		navigator.mediaDevices.getUserMedia({ audio: true, video: false })
		.then(stream => {
			this.setState({
				microphoneAccess: true
			});
		})
		.catch(error => {
			// alert('Your browser cannot stream from your audio. Please switch to Chrome or Firefox.');
			if (error.name === 'ConstraintNotSatisfiedError') {
				errorMsg = 'ERROR';
			} else if ((error.name === 'PermissionDeniedError') || (error.name === 'NotAllowedError')) {
				errorMsg = 'We cannot access your micorphone, because permissions were blocked. ' +
				'Please grant access to your microphone.  For more information, go to ' +
				<a href='https://support.google.com/chrome/answer/2693767?hl=en' target='_blank'>Google Chrome Help</a>;
			}
			console.log(errorMsg);
			this.setState({
				microphoneAccess: false,
				showErrorStatus: true,
				errorMsg: errorMsg
			});
		});
	};

	render() {
		const { showErrorStatus, showSuccessStatus } = this.state;

		const MicAccessError = () => (
			<Message negative
				onDismiss={ this.handleErrorDismiss }
				icon='warning'
				header='Microphone Required'
				content={ this.state.errorMsg }
			/>
		);

		const MicAccessSuccess = () => (
			<Message success
				onDismiss={ this.handleSuccessDismiss }
				icon='checkmark'
				header='Audio Success'
				content= "Great!  Your audio test worked.  Let's proceed with your interview."
			/>
		);

		let handleBackClick = () => { this.handleButtonClick('back'); }
		let handleNextClick = () => { this.handleButtonClick('next'); }

		return (
			<div id ='confirm-audio'>
				<Grid.Row>
					<h2>Test your audio before we begin your mock interview.</h2>
					<br />
				</Grid.Row>
				<Grid.Row>
					{ showErrorStatus ? <MicAccessError /> : null }
					{ showSuccessStatus ? <MicAccessSuccess /> : null }
				</Grid.Row>
				<Grid.Row>
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
				</Grid.Row>
				<Grid.Row>
	        <audio ref='audioSource' controls='controls' src={ this.state.blobURL }></audio>
				</Grid.Row>
					<Grid.Row>
					<Button animated='fade' onClick={ this.startRecording } >
		      	<Button.Content visible>Start Recording</Button.Content>
		      	<Button.Content hidden><Icon name='microphone' /></Button.Content>
	    		</Button>
					<Button animated='fade' onClick={ this.stopRecording }>
						<Button.Content visible>Stop Recording</Button.Content>
						<Button.Content hidden><Icon name='stop' /></Button.Content>
					</Button>
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
	};
};

export default ConfirmAudio;
