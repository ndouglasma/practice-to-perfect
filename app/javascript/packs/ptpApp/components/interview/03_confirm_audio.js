// External Dependencies
import React from 'react';
import { Button, Grid, Header, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';

// Internal Dependencies
import { setSelectedNumQuestions } from '../../actions/interview_action';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia);

class ConfirmAudio extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			recordAudio: false,
			blobAudio: null,
			blobURL: null,
			isRecording: false
    };
	};

		startRecording = () => {
	    this.setState({
	      recordAudio: true,
	      isRecording: true
	    });
	  }

	  stopRecording = () => {
	    this.setState({
	      recordAudio: false,
	      isRecording: false
	    });
	  }

		onStart = () => {
	    console.log('You can tap into the onStart callback');
	  }

	  onStop = (blobAudio) => {
			console.log(blobAudio);
			this.setState({
				blobAudio: blobAudio,
				blobURL: blobAudio.blobURL
			});

			this.onUpload();
	  };

		onUpload= () => {
			console.log(this.state.blobAudio);

			//save audio blob in FormData
			let formData  = new FormData();
			console.log(typeof formData);
			formData.append('size', this.state.blobAudio.blob.size);
			formData.append('type', this.state.blobAudio.blob.type);
			formData.append('blobURL', this.state.blobAudio.blobURL);
			formData.append('startTime', this.state.blobAudio.startTime);
			formData.append('stopTime', this.state.blobAudio.stopTime);

			for (var pair of formData.entries()) {
				console.log(pair[0]+ ', '+ pair[1]);
			};

			console.log(this.state.blobAudio.blob.size);
			// debugger;
			fetch('/api/v1/user_response', {
				credentials: 'same-origin',
			  method: 'POST',
			  body: formData,
				headers: {
					'Accept': 'application/json, */*',
			    'Content-Type': 'multipart/form-data'
			  },
			}).then(response => {
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
				// this.setState({ fortune: body.fortune.text,
				// newFortune: '' });
				console.log('MADE IT HERE');
			})
			.catch(error => console.error(`Error in fetch: ${error.message}`));
		};

	componentDidMount = () => {
		if(!hasGetUserMedia) {
			alert('Your browser cannot stream from your audio. Please switch to Chrome or Firefox.');
			return;
		}
	};

	render() {
		const { isRecording } = this.state;

		return (
			<div>
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

			</div>
		);
	};
};

export default ConfirmAudio;
