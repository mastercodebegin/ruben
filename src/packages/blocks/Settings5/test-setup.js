// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));

jest.mock('../../components/src/ShowToast',()=>({showToast:jest.fn()}))
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn(() => (JSON.stringify({ meta: { token: "rtretwftyweyfwtfeytwf" } }))),
    setItem: jest.fn(),
    removeItem: jest.fn((key) => {
        return new Promise((resolve) => {
          resolve(null);
        });
      }),
  }));
  jest.mock('../../components/src/utils',()=>({store:{
    dispatch:jest.fn(),
    getState:()=>({currentUser:'user'})
  }}))