//External Dependencies
import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';

const SelctNumQuestions = (props) => {
  const numQuestions=[1,2,3,4];

  let numQuestionButtons = numQuestions.map(num => {
      let active=false;
      if (props.selectedNumQuestions === num) {
        active = true;
      }

      let handleClick = () => {
        console.log(active);
        console.log(props.selectedNumQuestions);
        props.toggleNumQuestionsSelect(num) }

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
    <Grid container columns={4} id='question-button-group'>
      { numQuestionButtons }
    </Grid>
  );
};

export default SelctNumQuestions;

// <QuestionButtonGroup
// 	selectedNumQuestions={ this.state.selectedNumQuestions }
// 	toggleNumQuestionsSelect={ this.toggleNumQuestionsSelect }
// 	/>
