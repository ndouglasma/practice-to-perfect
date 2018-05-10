// External Dependencies
import React from 'react';
import { Button, Dropdown, Grid, Header, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

// Internal Dependencies
import { setSelectedNumQuestions } from "../../actions/set_up_interview_action";

class SelectNumQuestions extends React.Component {
	constructor(props){
    super(props)
    this.state = {
			selectedNum: this.props.selectedNumQuestions,
			errorStatus: false
    }
	};

	handleButtonClick = (clickAction) => {
		console.log(clickAction);
		if (clickAction === 'clear') {
			this.setState({
				selectedNum: 0,
				errorStatus: false
			 });
		}
		else if (clickAction === 'next') {
			if (this.state.selectedNum > 0) {
				this.props.setSelectedNumQuestions(this.state.selectedNum);
				browserHistory.push('/set_up_interview/select_categories');
			}
			else {
				this.setState({
					errorStatus: true
				});
			}
		}
	};

	handleDismiss = () => {
		this.setState({ errorStatus: false })
	};

	handleChange = (e, { value } ) => {
		console.log(value);
		this.setState({
			selectedNum: value,
			errorStatus: false
		});
	};

  render() {
    const numQuestions = [ 1, 2, 3, 4];
		// 	{ key: 1, text: '1 Question', value: 1 },
		// 	{ key: 2, text: '2 Questions', value: 2 },
		// 	{ key: 3, text: '3 Questions', value: 3 },
		// 	{ key: 4, text: '4 Questions', value: 4 },
		// ];

		let numQuestionsOptions = numQuestions.map(num => {
      let active=false;
			let dropDownText = num + (num > 1 ? ' Questions' : ' Question');

			if (this.state.selectedNum === num) {
				active = true;
			}

      return(
        { key: num, text: dropDownText, value: num }
      );
    });

		const { selectedNum, errorStatus } = this.state;

		const SelectError = () => (
			<Message negative
				onDismiss={ this.handleDismiss }
				icon='warning'
				header='Number of Questions Required'
				content='Please select the number of interview questions in order to proceed.'
			/>
		);

		let handleClearClick = () => { this.handleButtonClick('clear'); }
		let handleNextClick = () => { this.handleButtonClick('next'); }

		return (
			<div id ='select-num-questions'>
				<Grid.Row>
					<h2>Pick the number of questions you want for the interview.</h2>
					<br />
				</Grid.Row>
				<Grid.Row>
					{ errorStatus ? <SelectError /> : null }
				</Grid.Row>
				<Grid.Row>
					<Dropdown
						onChange={ this.handleChange }
						options={ numQuestionsOptions }
						placeholder='Choose an option'
						selection
						value={ selectedNum }
						/>
				</Grid.Row>
				<Grid.Row>
					<Button className='nav-button' onClick={ handleClearClick }>Clear</Button>
					<Button icon labelPosition='right' className='nav-button next' onClick={ handleNextClick }>
						Next
						<Icon name='right arrow' />
					</Button>
				</Grid.Row>
			</div>
    );
  };
};

const mapStateToProps = (state) => {
	return {
		currentLocation: state.get('routing').get('locationBeforeTransitions').get('pathname'),
		selectedNumQuestions: state.get('set_up_interview').get('selectedNumQuestions')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedNumQuestions: (numQuestions) => {
			dispatch(setSelectedNumQuestions(numQuestions));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNumQuestions);
