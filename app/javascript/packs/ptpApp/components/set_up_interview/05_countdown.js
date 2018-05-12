// External Dependencies
import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory  } from 'react-router';

// Internal Dependencies
import { requestQuestionsAPI } from "../../actions/interview_action";

class Countdown extends React.Component {
	constructor(props){
    super(props)
    this.state = {
      time: {},
      seconds: 5,
      change: true,
      newNum: 4,
      oldNum: 5
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.timerID = setInterval(
      () => this.countDown(),
      1000
    );
		//grab random questions and store in state
		// this.props.requestQuestions();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let secondsOld = this.state.newNum
    let secondsNew = this.state.newNum - 1;
    const change = !this.state.change;
    this.setState({
      time: this.secondsToTime(secondsNew),
      newNum: secondsNew,
      oldNum: secondsOld,
      change: change
    });

    // Check if we're at zero.
    if (secondsNew == 0) {
      //wait 1/2 second to at least show the zero, then move to next step
      setTimeout(
        () => {
          clearInterval(this.timerID);
          browserHistory.push('/set_up_interview/countdown2');
          },
        1000
      );
    }
  }

  render() {
		const { newNum, oldNum, change} = this.state;
		const animation1 = change ? 'fold' : 'unfold';
		const animation2 = !change ? 'fold' : 'unfold';
		const number1 = change ? oldNum : newNum;
		const number2 = !change ? oldNum : newNum;

		return (
			<div id ='countdown'>
				<Grid.Row>
					<h2>Get ready to start your interview in...</h2>
					<br />
				</Grid.Row>
				<Grid.Row>
					<div className={'flipCounter'}>
		        <div className={'upperCard'}>
		          <span>{newNum}</span>
		        </div>
		        <div className={'lowerCard'}>
		          <span>{oldNum}</span>
		        </div>
		        <div className={`flipCard first ${animation1}`}>
		          <span>{number1}</span>
		        </div>
		        <div className={`flipCard second ${animation2}`}>
		          <span>{number2}</span>
		        </div>
		      </div>
				</Grid.Row>
			</div>
    );
  };
};


const mapDispatchToProps = (dispatch) => {
	return {
		requestQuestions: () => {
			dispatch(requestQuestionsAPI());
		}
	};
};

export default connect(null, mapDispatchToProps)(Countdown);
