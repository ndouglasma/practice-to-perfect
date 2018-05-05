//External Dependencies
import React from 'react';
import { Dropdown, Header, Icon } from 'semantic-ui-react';

const trigger = (
  <span id='display-name'><Icon name='user' /><Header as='h4'>Hello, Natalie</Header></span>
);

const options = [
  { key: 'profile', text: 'My Profile', icon: 'user' },
  { key: 'log-out', text: 'Log Out', icon: 'log out' },
];

const UserVerticalMenu = (props) => {
  return(
    <div id='user-vertical-menu'>
      <Dropdown trigger={trigger} options={options} />
    </div>
  );
};

export default UserVerticalMenu;
