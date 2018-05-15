// External Dependencies
import React from 'react';
import { Dimmer, Grid, Loader, Image, Segment } from 'semantic-ui-react'

class Complete extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
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

export default Complete;
