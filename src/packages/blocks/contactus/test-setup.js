// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { View } from 'react-native';
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

jest.mock("react-native-keyboard-aware-scroll-view", () => ({ KeyboardAwareScrollView: jest.fn(props => {
  return <>{props.children}</>;
})}))