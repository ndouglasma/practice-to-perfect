//External Dependencies
import React from 'react';
import { Card, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router';

class Overview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	}

	render() {
		return (
			<div id='overview'>
				<Header as='h1'>Welcome Natalie!</Header>
				<br/>
				<br/>
				<Header as='h2' dividing><Icon name='browser' /><Header.Content>Summary</Header.Content></Header>
				<Segment padded>
					<Header as='h4' className='summary-info'>Total Number of Mock Interviews:</Header> <p className='summary-info'>11</p>
					<br/>
					<Header as='h4' className='summary-info'>Total Number of Questions Answered:</Header> <p className='summary-info'>35</p>
					<br/>
					<Header as='h4' className='summary-info'>Most Recent Interview:</Header> <p className='summary-info'>Yesterday, May 15, 2018</p>
					<br />
					<Header as='h4' className='summary-info'>First Interview:</Header> <p className='summary-info'>One Week Ago, May 9, 2018</p>
				</Segment>
				<br/>
				<br/>
				<Header as='h2' dividing><Icon name='numbered list' /><Header.Content>Question Stats</Header.Content></Header>
				<Segment padded>
					<Header as='h4' className='summary-info'>Questions by Categories:</Header>
					<Card.Group>
						<Card>
					    <Card.Content>
				        <Card.Header>Behavior</Card.Header>
				        <Card.Meta>22.86% of Questions</Card.Meta>
				        <Card.Description>8 questions</Card.Description>
				      </Card.Content>
				    </Card>
						<Card>
				      <Card.Content>
				        <Card.Header>Problem-solving</Card.Header>
				        <Card.Meta>14.29% of Questions</Card.Meta>
				        <Card.Description>5 questions</Card.Description>
				      </Card.Content>
				    </Card>
						<Card>
				      <Card.Content>
				        <Card.Header>Motivational</Card.Header>
				        <Card.Meta>42.86% of Questions</Card.Meta>
				        <Card.Description>15 questions</Card.Description>
				      </Card.Content>
				    </Card>
						<Card>
							<Card.Content>
								<Card.Header>Technical Skills</Card.Header>
								<Card.Meta>2.86% of Questions</Card.Meta>
								<Card.Description>1 question</Card.Description>
							</Card.Content>
						</Card>
						<Card>
							<Card.Content>
								<Card.Header>Informational</Card.Header>
								<Card.Meta>17.14% of Questions</Card.Meta>
								<Card.Description>6 questions</Card.Description>
							</Card.Content>
						</Card>
				  </Card.Group>
				</Segment>
			</div>
		);
	}
}

export default Overview;
