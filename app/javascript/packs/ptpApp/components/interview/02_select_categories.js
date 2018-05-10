// External Dependencies
import React from 'react';
import { Button, Grid, Header, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

// Internal Dependencies
import { setSelectedCategories } from "../../actions/interview_action";

class SelectCategories extends React.Component {
	constructor(props){
    super(props)
		this.state = {
			selectedCategories: this.props.selectedCategories.toJS(),
			errorStatus: false
    }
	};

	handleButtonClick = (clickAction) => {
		if (clickAction === 'back') {
			browserHistory.goBack();
		}
		else if (clickAction === 'clear') {
			this.setState({
				selectedCategories: [],
				errorStatus: false
			 });
		}
		else if (clickAction === 'next') {
			if (this.state.selectedCategories.length > 0) {
				this.props.setSelectedCategories(this.state.selectedCategories);
				browserHistory.push('/set_up_interview/confirm_audio');
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

		//if category already part of state, toggle its removal; otherwise add
		const foundCategoryIndex = this.findCategoryIndex(categoryId);
		if (foundCategoryIndex === null) {
			categories.push({id: categoryId, name: categoryName});
		}
		else {
			const removedCategory = categories.splice(foundCategoryIndex, 1);
		}
		this.setState ({
			selectedCategories: categories
		});
  };

  render() {
    const categories=[
			{ id: 1, name: 'Behavioral' },
			{ id: 2, name: 'Problem-solving' },
			{ id: 3, name: 'Motivational' },
			{ id: 4, name: 'Technical Skills' },
			{ id: 5, name: 'Informational' },
			{ id: 6, name: 'Surprise Me' }
		];

		const { errorStatus } = this.state;

		const SelectError = () => (
			<Message negative
				onDismiss={ this.handleDismiss }
				icon='warning'
				header='Category Required'
				content="Please select at least one category in order to proceed. If you're not sure, select 'Surprise Me'"
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
          <Button
            color={ active ? 'blue' : null }
            onClick={ handleClick }
            >
            <Header as='h3'>{ category.name }</Header>
          </Button>
        </Grid.Column>
      );
    });

		return (
			<div id ='select-categories'>
				<Grid.Row>
					<h2>Pick which categories you want to cover in your interview.</h2>
					<br />
				</Grid.Row>
				<Grid.Row>
					{ errorStatus ? <SelectError /> : null }
				</Grid.Row>
				<Grid.Row>
					<Grid container columns={4} id='category-button-group'>
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
		selectedCategories: state.get('interview').get('selectedCategories')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedCategories: (categoryId, categoryName) => {
			dispatch(setSelectedCategories(categoryId, categoryName));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategories);
