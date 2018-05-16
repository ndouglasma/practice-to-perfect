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
			<div id='set-up-interview'>
				<h1>Set Up Your Interview</h1>
				<br/>
				<br/>
				{ this.props.children }
			</div>
		);
	}
};

export default SetUpInterview;
