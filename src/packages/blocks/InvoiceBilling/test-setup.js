// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'macos',
    select: () => null
}));
jest.mock('react-native-share',()=>({
    open:jest.fn()
}))
jest.mock('../../components/src/utils',()=>({
  downloadFiles: jest.fn(() => new Promise((res, rej) => {
    res('file:///user/test/test.pdf')
    }))
}))
jest.mock("@react-native-async-storage/async-storage", () => ({
    getItem: jest.fn((key) => {
      return new Promise((resolve) => {
        resolve(JSON.stringify({ meta: { token: "rtretwftyweyfwtfeytwf" } }));
      });
    }),
    setItem: jest.fn(),
}));
  
jest.mock("../../components/src/HeaderWithBackArrowTemplate", () =>
  jest.fn((props) => {
    if (props.onPressBack) {
      props.onPressBack();
    }
    return <>{ props.children }</>;
  })
);
jest.mock("../../components/src/ShowToast", () => ({ showToast: jest.fn() }))
jest.mock("../contactus/src/QuerySubmittedModal", () => {
  let render = 1;
  return jest.fn((props) => {
    if (props.onPress && props.setVisible && render===1 ) {
      props.onPress();
      props.setVisible();
      render++;
    }
    return <></>;
  })}
);