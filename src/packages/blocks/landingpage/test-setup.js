// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock("../../components/src/utils", () => ({
    store: {
      getState: jest.fn(() => "mocked state"),
      dispatch:jest.fn()
    }
  }));
  jest.mock('react-native-simple-toast',()=>{})
jest.mock('@react-native-async-storage/async-storage',()=>({
    getItem:jest.fn(),
    setItem:jest.fn()
}))

jest.mock('react-native-image-crop-picker',()=>({
  openCamera:jest.fn(),
  openPicker:jest.fn()
}))
jest.mock('react-redux',()=>({
  connect:jest.fn()
}))