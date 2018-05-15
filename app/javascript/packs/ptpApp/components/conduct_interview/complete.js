// External Dependencies
import React from 'react';
import { Dimmer, Grid, Loader, Image, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Complete extends React.Component {
	constructor(props){
    super(props)
    this.state = {
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
      this.setState({
				userResponses: body.user_response_list,
        mockInterviewTranscribeStatus: body.transcribe_status
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
	};

	render() {
		return (
			<div id='complete'>
				<Grid.Row>
					<h2>Great Job!</h2>
					<br />
				</Grid.Row>
				<Grid.Row>
					<Segment>
			      <Dimmer active inverted>
			        <Loader size='large'>Loading</Loader>
			      </Dimmer>
			    </Segment>
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
