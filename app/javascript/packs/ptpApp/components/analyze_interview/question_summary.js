// External Dependencies
import React from 'react';
import { Header} from 'semantic-ui-react';

class QuestionSummary extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	render() {
		return (
			<div className='question-summary'>
				<Header as='h4' className='summary-info'>Question #{ this.props.order }:</Header> <p className='summary-info'>{ this.props.body }</p>
				<br />
			</div>
		);
	}
};

export default QuestionSummary;
