//External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
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
				<h1>Overview</h1>
			</div>
		);
	}
}

Overview.propTypes = {
};

export default Overview;
