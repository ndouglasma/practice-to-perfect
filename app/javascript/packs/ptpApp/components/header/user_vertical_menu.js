//External Dependencies
import React from 'react';
import { Dropdown, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class UserVerticalMenu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: ''
    }
	}

  handleChange = (e, { value } ) => {
		// console.log(value);
		this.setState({
			value: value
		});
	};

  render() {
    const trigger = (
      <span id='display-name'><Icon name='user' /><Header as='h4'>Hello, { this.props.github_name }</Header></span>
    );

    const options = [
      { value: 'profile', key: 'profile', text: 'My Profile', icon: 'user', disabled: true },
      { value: 'log-out', key: 'log-out', text: 'Log Out', icon: 'log out', disabled: true },
    ];

    return(
      <div id='user-vertical-menu'>
        <Dropdown
          trigger={trigger}
          options={options}
          onChange={this.handleChange}
          value={this.state.value}
          />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
	return {
		github_name: state.get('user').get('user').get('github_name')
	};
};

export default connect(mapStateToProps, null)(UserVerticalMenu);
