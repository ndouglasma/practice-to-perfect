// External Dependencies
import React from 'react';
import { Button, Grid, Header, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';

// Internal Dependencies
import { setSelectedNumQuestions } from '../../actions/set_up_interview_action';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia);

class XXX extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			recordAudio: false,
			blobAudio: null,
			blobURL: null,
			blobSize: null,
			blobType: null,
			blobStartTime: null,
			blobStopTime: null,
			audioAWSURL: null
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
			// console.log(blobAudio);
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
			// console.log(this.state.blobAudio);
			let reader = new FileReader()
			reader.onload = (event) => {
				//save audio blob in FormData and use FileReader to get into proper format
				let formData  = new FormData();
				formData.append('size', this.state.blobSize.blob.size);
				formData.append('type', this.state.blobType.blob.type);
				formData.append('startTime', this.state.blobStartTime);
				formData.append('stopTime', this.state.blobStopTime);
				formData.append('audio', event.target.result)
				// for (var pair of formData.entries()) {
				// 	console.log(pair[0]+ ', '+ pair[1]);
				// };
				fetch('/api/v1/user_response', {
					credentials: 'same-origin',
				  method: 'POST',
				  body: formData,
					headers: {
						'Accept': 'application/json, */*'
				  },
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

	componentDidMount = () => {
		if(!hasGetUserMedia) {
			alert('Your browser cannot stream from your audio. Please switch to Chrome or Firefox.');
		}
	};

	render() {
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

export default XXX;
