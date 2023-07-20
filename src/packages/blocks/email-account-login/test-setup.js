// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });
jest.mock('@react-native-async-storage/async-storage',()=>({
    getItem:jest.fn(),
    setItem:jest.fn(()=>new Promise((resolve)=>resolve()))
}))
jest.mock('react-native-simple-toast',()=>({show:jest.fn()}))

jest.mock('react-native-keyboard-aware-scroll-view',()=>({KeyboardAwareScrollView:({children})=>(<>{children}</>)}))
jest.mock("../../components/src/utils", () => ({
    store: {
      getState: jest.fn(() => "mocked state"),
      dispatch:jest.fn()
    }
}));  
jest.mock("../../framework/src/Utilities", () => ({
  getStorageData: jest.fn(()=>new Promise((resolve) =>resolve('test response'))),
  setStorageData: jest.fn(()=>new Promise((resolve) =>resolve('test response'))),
}));