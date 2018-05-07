// External Dependencies
import React from 'react';
import { Button, Grid, Header, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import RecordRTC from 'recordrtc';

// Internal Dependencies
import { captureUserMedia, S3Upload } from '../../utilities/app_utils';
import Webcam from './webcam';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia);

class ConfirmAudio extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			recordVideo: null,
			src: null,
			uploadSuccess: null,
			uploading: false
    };

		this.requestUserMedia = this.requestUserMedia.bind(this);
		this.startRecord = this.startRecord.bind(this);
		this.stopRecord = this.stopRecord.bind(this);
	};

	requestUserMedia() {
    console.log('requestUserMedia');
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
      console.log('setting state', this.state)
    });
  }

  startRecord() {
    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      this.state.recordVideo.startRecording();
    });

    setTimeout(() => {
      this.stopRecord();
    }, 4000);
  }

  stopRecord() {
    this.state.recordVideo.stopRecording(() => {
      let params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        id: Math.floor(Math.random()*90000) + 10000
      }

      this.setState({ uploadSuccess: true, uploading: false });

      // S3Upload(params)
      // .then((success) => {
      //   console.log('enter then statement')
      //   if(success) {
      //     console.log(success)
      //     this.setState({ uploadSuccess: true, uploading: false });
      //   }
      // }, (error) => {
      //   alert(error, 'error occurred. check your aws settings and try again.')
      // });
    });
  }

	componentDidMount() {
		if(!hasGetUserMedia) {
			alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
			return;
		}
		this.requestUserMedia();
	};

  render() {
		return (
			<div id ='confirm-audio'>
				<h2>Let's confirm your audio</h2>
				<div><Webcam src={this.state.src}/></div>
				{this.state.uploading ?
					<div>Uploading...</div> : null}
				<Button onClick={this.startRecord}>Start Record</Button>
				<Modal trigger={<Button onClick={this.stopRecord}>Stop Record</Button>}>
					<Modal.Content>Upload success!</Modal.Content>
				</Modal>
			</div>
    );
  };
};

export default ConfirmAudio;
