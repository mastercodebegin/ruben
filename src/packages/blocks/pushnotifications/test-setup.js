// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('@react-native-firebase/messaging', () => () => ({
    hasPermission: jest.fn(() => new Promise(resolve => {
        resolve(1);
    })),
    onNotificationOpenedApp: jest.fn((callback)=>callback()),
    onMessage: jest.fn((callback)=>callback()),
    getInitialNotification:jest.fn(()=>new Promise((resolve, reject) => {
        resolve({})
    }))
}));
jest.mock('react-native-push-notification', () => ({
    localNotification:jest.fn()
 }));