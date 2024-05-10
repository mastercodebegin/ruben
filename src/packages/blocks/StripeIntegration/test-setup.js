// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock("../../components/src/ShowToast", () => ({ showToast: jest.fn() }));
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(JSON.stringify({ meta: { token: "rtretwftyweyfwtfeytwf" } }));
    });
  }),
  setItem: jest.fn(),
}));

jest.mock("react-native-keyboard-aware-scroll-view",()=>({KeyboardAwareScrollView:({children})=>(<>{children}</>)}))
jest.mock("../../framework/src/Utilities", () => ({
  getStorageData: jest.fn(()=>new Promise((resolve) =>resolve('test response'))),
  setStorageData: jest.fn(() => { }),
}));
jest.mock("rn-fetch-blob", () => ({
  fs: {
    dirs: {
      DownloadDir: "",
    },
  },
  config: () => ({
    fetch: () => Promise.resolve({}),
  }),
}));