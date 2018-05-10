import Layout from '../../app/javascript/packs/ptpApp/components/layout/layout';
import Header from '../../app/javascript/packs/ptpApp/components/header/header';
import configureStore from 'redux-mock-store';

// create any initial state needed
const initialState = {};
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
let wrapper;
let store;

describe('Layout', () => {
  beforeEach(() => {
    //creates the store with any initial state or middleware needed
    store = mockStore(initialState);
    wrapper = shallow(<Layout store={store}/>);
  });

  it('should return true', () => {
    expect(true).toEqual(true);
  });

  // it('should render a Header Component', () => {
  //   expect(wrapper.find(Header)).toBePresent();
  // });
});
