// External Dependencies
import React from 'react';
import { Header, List } from 'semantic-ui-react';

class UserResponseSummary extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	render() {
		// wanted to use Semantic UI's List horizontal items, but if there are duplicate words, you'll get warning about identical keys
		const wordList = this.props.text.map((word, index) => {
			return(
				<List.Item key={ index }>{ word }</List.Item>
			);
    });

		return (
			<div className='question-summary'>
				<Header as='h4' className='summary-info'>Question #{ this.props.order }:</Header> <p className='summary-info'>{ this.props.question }</p>
				<br />
				&emsp;&emsp;<Header as='h4' className='summary-info'>Transcribed Text:</Header>
				&emsp;&emsp;
				<List bulleted horizontal>
					{ wordList }
				</List>
				<br />
				&emsp;&emsp;<Header as='h4' className='summary-info'>Total Words:</Header> <p className='summary-info'>{ this.props.totalWords }</p>
				<br />
				&emsp;&emsp;<Header as='h4' className='summary-info'>Total Likes:</Header> <p className='summary-info'>{ this.props.totalLikes }</p>
				<br />
				&emsp;&emsp;<Header as='h4' className='summary-info'>Total Ums:</Header> <p className='summary-info'>{ this.props.totalUms }</p>
			</div>
		);
	}
};

export default UserResponseSummary;
