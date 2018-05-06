//External Dependencies
import React from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

//Internal Dependencies

class StartInterview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			selectedNumQuestions: null
    }
		this.toggleNumQuestionsSelect = this.toggleNumQuestionsSelect.bind(this);
	};

	toggleNumQuestionsSelect = (numQuestions) => {
		console.log(numQuestions);
		this.setState({ selectedNumQuestions: numQuestions });
	};

	render() {
		return (
			<div id='start-interview'>
				<h1>Start an Interview</h1>
				<br/>
				<br/>
				<h2>Pick the number of questions you want for the interview.</h2>
				<Grid>
					<Grid.Row>
						{ this.props.children }
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Button icon labelPosition='right' className='nav-button'>
								Next
								<Icon name='right arrow' />
							</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		// selectedAccount: state.get('accounts').get('selectedAccount')
	};
};

export default connect(mapStateToProps, null)(StartInterview);
