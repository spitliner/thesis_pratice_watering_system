import BaseService from '../../common/base-service';

export const ProfileService = new BaseService('user');
export const ChangeEmailService = new BaseService('account/email')
export const ChangePasswordService = new BaseService('account/password')
export const ChangeSettingService = new BaseService('account/setting')
