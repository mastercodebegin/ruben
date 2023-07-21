// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock('react-native-share',()=>({
    open:jest.fn()
}))
jest.mock('../../components/src/utils',()=>({
    downloadFiles:jest.fn()
}))
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn((key) => {
      return new Promise((resolve) => {
        resolve(JSON.stringify({ meta: { token: "rtretwftyweyfwtfeytwf" } }));
      });
    }),
    setItem: jest.fn(),
  }));