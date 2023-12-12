import BaseService from '../../common/base-service';

export const DeviceService = new BaseService('device');
export const DeleteDeviceService = new BaseService('device/delete');
export const UserDeviceService = new BaseService('user/device');
export const ApiKeyService = new BaseService('device/duplicateKey');
