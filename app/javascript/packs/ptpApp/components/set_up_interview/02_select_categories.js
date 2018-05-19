// External Dependencies
import React from 'react';
import { Button, Card, Grid, Header, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

// Internal Dependencies
import { setSelectedCategories, requestQuestionsAPI } from "../../actions/interview_action";

class SelectCategories extends React.Component {
	constructor(props){
    super(props)
		this.state = {
			selectedCategories: this.props.selectedCategories.toJS(),
			selectNotice: true,
			errorStatus: false,
			errorMessage: ''
    }
	};

	handleButtonClick = (clickAction) => {
		if (clickAction === 'back') {
			browserHistory.goBack();
		}
		else if (clickAction === 'clear') {
			this.setState({
				selectedCategories: [],
				errorStatus: false,
				errorMessage: ''
			 });
		}
		else if (clickAction === 'next') {
			if (this.state.selectedCategories.length > 0) {
				this.props.setSelectedCategories(this.state.selectedCategories);
				browserHistory.push('/set_up_interview/confirm_audio');
			}
			else {
				this.setState({
					errorStatus: true,
					errorMessage: "You must select at least 1 category in order to proceed. If you are undecided, pick 'Just Surprise Me'"
				});
			}
		}
	};

	handleDismissSelectError = () => {
		this.setState({
			errorStatus: false,
		 	errorMessage: ''
		});
	};

	//if category found in current state, return its index; otherwise return null to indicate not found
	findCategoryIndex = (categoryId) => {
		let returnValue = null;

		for (let i = 0; i < this.state.selectedCategories.length; i++) {
			if (categoryId === this.state.selectedCategories[i].id) {
				returnValue = i;
				break;
			}
	  };
		return returnValue;
	};

  toggleSelectedCategories = (categoryId, categoryName) => {
		let categories = this.state.selectedCategories;
		//clear error message
		this.setState ({
			errorStatus: false,
			errorMessage: ''
		});

		//if category already part of state, toggle its removal; otherwise add
		const foundCategoryIndex = this.findCategoryIndex(categoryId);
		if (foundCategoryIndex === null) {
			//if user selects "Just Surprise Me", get rid of all other entries
			if (categoryName === 'Just Surprise Me') {
				categories = [];
				categories.push({id: categoryId, name: categoryName});
			}
			else {
				//check to see if "Just Surprise Me" is there; if so, it would be the only value, therefore clear it out before proceeding
				if ((categories.length === 1) && (categories[0].name === 'Just Surprise Me')) {
					categories = [];
				}
				//check if user is about to exceed their allotted number of selected categories based on number of questions for the interview.
				//if so, display warning message.
				console.log('this.state.selectedCategories.length=[' + this.state.selectedCategories.length +']');
				console.log('this.props.selectedNumQuestions=[' + this.props.selectedNumQuestions +']');
				if (this.state.selectedCategories.length + 1 <= this.props.selectedNumQuestions) {
					categories.push({id: categoryId, name: categoryName});
				}
				else {
					this.setState ({
						errorStatus: true,
						errorMessage: `You can select ${this.props.selectedNumQuestions === 1 ? ' category.' : '1 - '.concat(this.props.selectedNumQuestions).toString().concat(' categories.')}.  Not sure?  Select 'Just Surprise Me'.`
					});
				}
			}
		}
		else {
			const removedCategory = categories.splice(foundCategoryIndex, 1);
		}
		this.setState ({
			selectedCategories: categories
		});
  };

	componentWillUnmount() {
		this.props.requestQuestions();
	}

  render() {
    const categories=[
			{ id: 1, name: 'Behavioral', description: "This type of question measures your past behaviors as a predictor of future results; particularly when faced with a difficult situation, how did you react.  Examples include inquiries about tensions with a co-worker and how it was resolved, or asking about the decision-making process for a major project that the candidate worked on." },
			{ id: 2, name: 'Problem-solving', description: "Problem-solving questions evaluate your ability to analyze information.  They can include case studies, situational questions, and brainteasers.  Examples include what is 1000 divided by 62; and how would you describe your favorite artwork to someone who has never seen it." },
			{ id: 3, name: 'Motivational', description: "This line of questioning aims to find out what keeps you motivated and engaged at work.  Examples include what were the exciting aspects of your previous job; and how are you a self-starter." },
			{ id: 4, name: 'Technical Skills', description: "The employer wants to see if you have the technical aptitute to meet the jobs requirements.  This will include questions about skills, experience, certifications, competencies, programming languages, frameworks, libraries, and development tools you know.  Examples include mock coding challenges; explain what is MVC; and describe your experience with Test Driven Development and the tools you use." },
			{ id: 5, name: 'Informational', description: "Informational questions cover the contents of your resume - including professional, educational, technical projects, volunteerism, and awards/certifiations earned.  Examples inclue tell me about yourself; why did you select your major; and what has been your involvement in the tech community." },
			{ id: 6, name: 'Just Surprise Me', description: "Oftentimes you will not know what questions you'll be asked.  Select this category to get a random list of questions for your mock interview." }
		];

		const { errorStatus, errorMessage } = this.state;

		const SelectError = () => (
			<Message negative
				onDismiss={ this.handleDismissSelectError }
				icon='warning'
				header='Category Required'
				content={ errorMessage }
			/>
		);

		let handleBackClick = () => { this.handleButtonClick('back'); }
		let handleClearClick = () => { this.handleButtonClick('clear'); }
		let handleNextClick = () => { this.handleButtonClick('next'); }

    let categoryButtons = categories.map(category => {
      let active=false;
			const foundCategoryIndex = this.findCategoryIndex(category.id);

			if (typeof foundCategoryIndex === 'number') {
				active = true;
			}

      let handleClick = () => {
        this.toggleSelectedCategories(category.id, category.name);
      }

      return(
        <Grid.Column key={ category.id }>
					<Card
						color={ active ? 'green' : null }
						onClick={ handleClick }
						raised
						>
						<Card.Content>
							<Grid>
								<Grid.Column width={12}><Card.Header>{ category.name }</Card.Header></Grid.Column>
								<Grid.Column width={4}>{ active ? <Icon floated='right' name='checkmark' size='big' /> : null }</Grid.Column>
							</Grid>
						</Card.Content>
						<Card.Content><Card.Description>{ category.description }</Card.Description></Card.Content>
					</Card>
        </Grid.Column>
      );
    });

		return (
			<div id ='select-categories'>
				<Grid.Row>
					<h2>Pick { this.props.selectedNumQuestions === 1 ? '1 category' : '1 - '.concat(this.props.selectedNumQuestions).toString().concat(' categories') } to cover in your interview.&ensp;Can&apos;t decide?&ensp;Pick &apos;Just Surprise Me&apos;.</h2>
					<h3>Keep in mind if you select &apos;Just Surprise Me&apos;, you cannot select any other category.</h3>
					<br />
				</Grid.Row>
				<Grid.Row>
					{ errorStatus ? <SelectError /> : null }
				</Grid.Row>
				<Grid.Row>
					<Grid container columns={4} id='category-card-group'>
						{ categoryButtons }
					</Grid>
				</Grid.Row>
				<Grid.Row>
					<Button icon labelPosition='left' className='nav-button' onClick={ handleBackClick }>
						Back
						<Icon name='left arrow' />
					</Button>
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
		selectedNumQuestions: state.get('mockInterview').get('selectedNumQuestions'),
		selectedCategories: state.get('mockInterview').get('selectedCategories')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedCategories: (categoryId, categoryName) => {
			dispatch(setSelectedCategories(categoryId, categoryName));
		},
		requestQuestions: () => {
			dispatch(requestQuestionsAPI());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategories);
