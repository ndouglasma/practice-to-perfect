//External Dependencies
import React from 'react';
import { Card } from 'semantic-ui-react';

//Internal Dependencies
import QuestionCardGroup from './01_select_num_questions';

class StartInterview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	}

	render() {
		return (
			<div id='start-interview'>
				<h1>Start an Interview</h1>
				<QuestionCardGroup />
			</div>
		);
	}
}

export default StartInterview;
