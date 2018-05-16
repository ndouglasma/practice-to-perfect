// External Dependencies
import React from 'react';
import { Grid } from 'semantic-ui-react';

class AnalyzeInterview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	render() {
		return (
			<Grid id='analyze-interview'>
				<Grid.Row>
					<h1>Here are Your Results</h1>
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

export default AnalyzeInterview;
