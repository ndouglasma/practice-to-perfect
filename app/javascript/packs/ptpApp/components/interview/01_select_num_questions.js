//External Dependencies
import React from 'react';
import { Card } from 'semantic-ui-react';

const QuestionCardGroup = () => (
  <Card.Group itemsPerRow={4}>
    <Card><Card.Content><Card.Header textAlign='center'>1 Question</Card.Header></Card.Content></Card>
    <Card><Card.Content><Card.Header textAlign='center'>2 Questions</Card.Header></Card.Content></Card>
    <Card><Card.Content><Card.Header textAlign='center'>3 Questions</Card.Header></Card.Content></Card>
    <Card><Card.Content><Card.Header textAlign='center'>4 Questions</Card.Header></Card.Content></Card>
  </Card.Group>
);

export default QuestionCardGroup;
