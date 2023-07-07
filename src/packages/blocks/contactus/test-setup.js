// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock("../../components/src/ShowToast", () => ({
    showToast:jest.fn()
  }));

  jest.mock("../../framework/src/Utilities", () => ({
    getStorageData:jest.fn((_,key) => {
      return new Promise((resolve) => {
        resolve({ meta: { token: "rtretwftyweyfwtfeytwf" } });
      });
    })
  }));