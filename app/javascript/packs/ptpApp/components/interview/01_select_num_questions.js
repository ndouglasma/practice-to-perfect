// External Dependencies
import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

// Internal Dependencies
import { setSelectedNumQuestions } from "../../actions/interview_action";

class SelectNumQuestions extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	};

  toggleNumQuestionsSelect = (numQuestions) => {
    console.log(numQuestions);
    this.props.setSelectedNumQuestions(numQuestions);
  };

  render() {
    const numQuestions=[1,2,3,4];

    let numQuestionButtons = numQuestions.map(num => {
      let active=false;
      if (this.props.selectedNumQuestions === num) {
        active = true;
      }

      let handleClick = () => {
        console.log(active);
        console.log(this.props.selectedNumQuestions);
        this.toggleNumQuestionsSelect(num);
      }

      return(
        <Grid.Column key={ num }>
          <Button
            color={ active ? 'blue' : null }
            onClick={ handleClick }
            >
            <Header as='h3'>{ num } Question{ num > 1 ? 's': null }</Header>
          </Button>
        </Grid.Column>
      );
    });

		return (
			<div id ='select-num-questions'>
				<h2>Pick the number of questions you want for the interview.</h2>
				<br />
				<Grid container columns={4} id='question-button-group'>
					{ numQuestionButtons }
				</Grid>
			</div>
    );
  };
};

const mapStateToProps = (state) => {
	return {
		selectedNumQuestions: state.get('interview').get('selectedNumQuestions')
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
