// test-setup.js
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn((key) => {
      return new Promise((resolve) => {
        resolve(JSON.stringify({ meta: { token: "rtretwftyweyfwtfeytwf" } }));
      });
    }),
    setItem: jest.fn(),
}));
jest.mock("../../components/src/ShowToast", () => ({ showToast: jest.fn() }));
jest.mock("../../components/src/utils", () => ({
    store: {
      getState: jest.fn(() => ({
        currentUser: "merchant",
      })),
      dispatch: jest.fn(),
    },
    validName: jest.fn(() => false),
    generateDateObject: jest.fn()
}));
  
jest.mock("react-native-image-crop-picker", () => ({
    openCamera: jest.fn(),
    openPicker: jest.fn(),
  }));