// External Dependencies
import React from 'react';
import { Grid } from 'semantic-ui-react';

class SetUpInterview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	render() {
		return (
			<Grid id='set-up-interview'>
				<Grid.Row>
					<h1>Set Up Your Interview</h1>
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

export default SetUpInterview;
