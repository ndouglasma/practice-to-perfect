// External Dependencies
import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

// Internal Dependencies
import { setSelectedCategories } from "../../actions/interview_action";

class SelectCategories extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

	//if category found in current state, return its index; otherwise return null to indicate not found
	findCategoryIndex = (categoryId) => {
		let returnValue = null;
		// console.log('INSIDE findCategoryIndex');
		// console.log(categoryId);
		const propsSelectedCategories = this.props.selectedCategories.toJS();
		// console.log(propsSelectedCategories);

		for (let i = 0; i < propsSelectedCategories.length; i++) {
			// console.log(propsSelectedCategories[i].id)
			if (categoryId === propsSelectedCategories[i].id) {
				// console.log('FOUND CATEGORY');
				// console.log(i);
				returnValue = i;
				break;
			}
	  };

		return returnValue;
	};

  toggleSelectedCategories = (categoryId, categoryName) => {
		let categories= this.props.selectedCategories.toJS();
    // console.log(categoryId);
		// console.log(categoryName);

		//if category already part of state, toggle its removal; otherwise add
		const foundCategoryIndex = this.findCategoryIndex(categoryId);
		if (foundCategoryIndex === null) {
			// console.log('NULL');
			categories.push({id: categoryId, name: categoryName});
		}
		else {
			// console.log('READY TO REMOVE');
			const removedCategory = categories.splice(foundCategoryIndex, 1);
		}
    this.props.setSelectedCategories(categories);
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

    let categoryButtons = categories.map(category => {
      let active=false;
			const foundCategoryIndex = this.findCategoryIndex(category.id);

			if (typeof foundCategoryIndex === 'number') {
				active = true;
			}

      let handleClick = () => {
        // console.log(category.name + ' ' + active);
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
				<h2>Pick which categories you want to cover in your interview.</h2>
				<br />
				<Grid container columns={4} id='category-button-group'>
					{ categoryButtons }
				</Grid>
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
