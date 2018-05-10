// External Dependencies
import React from 'react';
import { Grid } from 'semantic-ui-react';

class StartInterview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	render() {
		return (
			<Grid id='start-interview'>
				<Grid.Row>
					<h1>Start an Interview</h1>
					<br/>
					<br/>
				</Grid.Row>
				<Grid.Row>
					{ this.props.children }
				</Grid.Row>
			</Grid>
		);
	}
};

export default StartInterview;
