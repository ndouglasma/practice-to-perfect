// External Dependencies
import React from 'react';
import { Grid } from 'semantic-ui-react';

class ConductInterview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	render() {
		return (
			<Grid id='conduct-interview'>
				<Grid.Row>
					<h1>Interview in Progress</h1>
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

export default ConductInterview;
