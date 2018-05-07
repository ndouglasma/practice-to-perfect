// External Dependencies
import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

// Internal Dependencies

class ConfirmAudio extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

  render() {
		return (
			<div id ='confirm-audio'>
				<h2>Let's confirm your audio</h2>
			</div>
    );
  };
};

export default ConfirmAudio;
