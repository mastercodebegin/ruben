// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock('@react-native-async-storage/async-storage',()=>({
    getItem:jest.fn(),
    setItem:jest.fn()
}))
jest.mock('react-native-simple-toast',()=>({show:jest.fn()}))


jest.mock("../../mobile/App", () => ({
    store: {
      getState: jest.fn(() => "mocked state"),
      dispatch:jest.fn()
    }
  }));  