import { configure, mount, render, shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import 'jasmine-ajax';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

Object.assign(global, {
  jasmineEnzyme,
  mount,
  React,
  shallow,
});

beforeEach(() => {
  jasmineEnzyme();
});

// function to require all modules for a given context
let requireAll = requireContext => {
  requireContext.keys().forEach(requireContext);
};

// require all js files except karma_helper.js in the test folder
requireAll(require.context('./', true, /^((?!karma_helper).)*\.jsx?$/));

// require all js files except main.js in the src folder
requireAll(require.context('../../app/javascript', true, /^((?!application).)*\.jsx?$/));

// output to the browser's console when the tests run
console.info(`TESTS RAN AT ${new Date().toLocaleTimeString()}`);
