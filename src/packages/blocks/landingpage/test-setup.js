// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
configure({ adapter: new Adapter() });
jest.mock("../../framework/src/Utilities", () => ({
  customAlert: jest.fn(),
}));
jest.mock("../../components/src/utils", () => ({
  store: {
    getState: jest.fn(() => ({
      currentUser: "merchant",
    })),
    dispatch: jest.fn(),
  },
  validName: jest.fn(() => false),
}));
jest.mock("react-native-simple-toast", () => {});
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(JSON.stringify({ meta: { token: "rtretwftyweyfwtfeytwf" } }));
    });
  }),
  setItem: jest.fn(),
}));
jest.mock("../../components/src/ShowToast", () => ({ showToast: jest.fn() }));
jest.mock("react-native-image-crop-picker", () => ({
  openCamera: jest.fn(),
  openPicker: jest.fn(),
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ goBack: jest.fn(), navigate: jest.fn() })),
}));

jest.mock("react-native-video", () =>
  jest.fn((props) => {
    if (props.onEnd && props.onLoad && props.onLoadStart) {
      props.onEnd();
      props.onLoadStart();
      props.onLoad();
    }
    return <></>;
  })
);
jest.mock("react-native-keyboard-aware-scroll-view",()=>({KeyboardAwareScrollView:({children})=>(<>{children}</>)}))