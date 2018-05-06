import { shallow,  } from 'enzyme';
import Layout from '../../app/javascript/packs/ptpApp/components/layout/layout';
import Header from '../../app/javascript/packs/ptpApp/components/header/header';

const wrapper = shallow(<Layout />);

describe('Layout', () => {
  it('should return true', () => {
    expect(true).toEqual(true);
  });
});
