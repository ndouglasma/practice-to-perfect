//External Dependencies
import React from 'react';
import { Card, Header, Icon, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router';
import Moment from 'react-moment';
import { connect } from 'react-redux';

// Internal Dependencies
import { requestUserInterviewsAPI } from "../../actions/user_action";

class Overview extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    }
	}

	componentDidMount = () => {
		this.props.requestUserInterviews();
	};

	render() {
		let haveInterviewDates;
		let haveQuestionCategoryCounts;

		const { interviews: {total_interviews, total_user_responses} } = this.props;

		if (this.props.interviews.first_and_last_interview_dates) {
			const {interviews: {first_and_last_interview_dates: {first_interview_date, last_interview_date}}} = this.props;
			const first_date = (first_interview_date === '') ? <Moment format="LL">{ first_interview_date }</Moment> (<Moment fromNow>{ first_interview_date }</Moment>) : <i>You have yet to start your first interview.</i>;
			const last_date = (last_interview_date === '') ? <Moment format="LL">{ last_interview_date }</Moment> (<Moment fromNow>{ last_interview_date }</Moment>) : <i>You have yet to start your first interview.</i>;

			haveInterviewDates = (
				<div>
					<Header as='h4' className='summary-info'>First Interview:</Header> <p className='summary-info'>{ first_date }</p>
					<br />
					<Header as='h4' className='summary-info'>Most Recent Interview:</Header> <p className='summary-info'>{ last_date }</p>
				</div>
			);
		}

		if (this.props.interviews.category_counts) {
			const {interviews: {category_counts}} = this.props;

			haveQuestionCategoryCounts = category_counts.map(value => {
				const calculate_percent = (value.count > 0 ) ? ((value.count / total_user_responses ) * 100).toFixed(2) : 0
				return(
					<Card key={value.name}>
						<Card.Content>
							<Card.Header>{ value.name }</Card.Header>
							<Card.Meta>{ calculate_percent }% of Questions</Card.Meta>
							<Card.Description>{ value.count } question{ value.count === 1 ? null : 's'}</Card.Description>
						</Card.Content>
					</Card>
				);
			});
		}

		return (
			<div id='overview'>
				<Header as='h1'>Welcome { this.props.user.sign_in_count > 0 ? 'back ' : null } { this.props.user.github_name }!</Header>
				<br/>
				<br/>
				<Header as='h2' dividing><Icon name='browser' /><Header.Content>Summary</Header.Content></Header>
				<Segment padded>
					<Header as='h4' className='summary-info'>Total Number of Mock Interviews:</Header> <p className='summary-info'>{ total_interviews }</p>
					<br />
					<Header as='h4' className='summary-info'>Total Number of Recorded Responses:</Header> <p className='summary-info'>{ total_user_responses }</p>
					<br />
					{ haveInterviewDates }
					<br />
				</Segment>
				<br/>
				<br/>
				<Header as='h2' dividing><Icon name='numbered list' /><Header.Content>Question Stats</Header.Content></Header>
				<Segment padded>
					<Header as='h4' className='summary-info'>Questions by Categories:</Header>
					<div>
						<Card.Group>
							{ haveQuestionCategoryCounts }
						</Card.Group>
					</div>
				</Segment>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('GOT IN mapStateToProps');
	return {
		user: state.get('user').get('user').toJS(),
		interviews: state.get('user').get('interviews').toJS()
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		requestUserInterviews: () => {
			dispatch(requestUserInterviewsAPI());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
