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
      currentUser: "user",
    })),
    dispatch: jest.fn(),
  },
}));
jest.mock("react-native-simple-toast", () => {});
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => (JSON.stringify({ meta: { token: "rtretwftyweyfwtfeytwf" } }))),
  setItem: jest.fn(),
}));
jest.mock("../../components/src/ShowToast", () => ({ showToast: jest.fn() }));
jest.mock("react-native-image-crop-picker", () => ({
  openCamera: jest.fn(),
  openPicker: jest.fn(),
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => ({ goBack: jest.fn(),navigate:jest.fn() })),
}));
jest.mock("react-native-video", () => jest.fn(() => <></>));
