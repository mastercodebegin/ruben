// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React  from 'react';
configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock("../../components/src/utils", () => ({
    store: {
      getState: jest.fn(() => ({
        currentUser: "user",
      })),
    },
  }));  
  jest.mock('react-native-chart-kit',()=>({BarChart:()=>(<></>)}))
