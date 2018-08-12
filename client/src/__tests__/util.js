import { util } from '../helpers/utils';

describe('test cases for the exported util object', () => {
  test('exported object to be defined', () => {
    expect(util).toBeDefined();
  });
  test('util should be an object', () => {
    expect(typeof util).toBe('object');
  });
});
describe('test cases for showBackendError function', () => {
  test('showBackendError to be defined', () => {
    const showBackendError = util.showBackendError;
    expect(showBackendError).toBeDefined();
  });
  test('showBackendError to call openNotification', () => {
    let openNotificationMock = jest.spyOn(util, 'openNotification');
    util.showBackendError();
    expect(openNotificationMock).toBeCalled();
  });
  test('showBackendError to call openNotification with the default params', () => {
    let openNotificationMock = jest.spyOn(util, 'openNotification');
    util.showBackendError();
    expect(openNotificationMock).toBeCalledWith('error', 'Not Allowed', 'Some error occurred');
  });
  test('showBackendError to call openNotification with default params of back end response is not having error message as a array', () => {
    let openNotificationMock = jest.spyOn(util, 'openNotification');
    const errorObject = {
      response: {
        data: {
          error: 'hello I have an error'
        }
      }
    };
    util.showBackendError(errorObject);
    expect(openNotificationMock).toBeCalledWith('error', 'Not Allowed', 'Some error occurred');
  });
  test('showBackendError to not call openNotification when the backend error message is sent in the correct format', () => {
    let openNotificationMock = jest.spyOn(util, 'openNotification');
    const errorMessage = 'You can not call this API';
    const errorObject = {
      response: {
        data: {
          error: errorMessage
        }
      }
    };
    util.showBackendError(errorObject);
    expect(openNotificationMock).toBeCalledWith('error', 'Not Allowed', errorMessage);
  });
});
describe('test cases for getCurrentActiveRoute function', () => {
  test('getCurrentActiveRoute to be defined', () => {
    const getCurrentActiveRoute = util.getCurrentActiveRoute;
    expect(getCurrentActiveRoute).toBeDefined();
  });
  test('it should return null for incorrect path', () => {
    const path = '';
    const activeRoute = util.getCurrentActiveRoute(path);

    expect(activeRoute).toBeNull();
  });
  test('it should return the right active route for the correct pathname', () => {
    const pathname = '/products';
    const expectedOutput = 'products';
    const activeRoute = util.getCurrentActiveRoute(pathname);

    expect(activeRoute).toBe(expectedOutput);
  });
  test('it should return the right active route when on a child route', () => {
    const pathname = '/products/70';
    const expectedOutput = 'products';
    const activeRoute = util.getCurrentActiveRoute(pathname);

    expect(activeRoute).toBe(expectedOutput);
  });
});
