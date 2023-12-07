import BaseService from '../../common/base-service';

export const RegisterService = new BaseService('account');
export const CheckDuplicateService = new BaseService('account/email/duplicate');
