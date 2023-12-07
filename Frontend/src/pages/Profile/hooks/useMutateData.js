import { useMutation, useQueryClient } from 'react-query';
import {
  ChangeEmailService,
  ChangePasswordService,
  ChangeSettingService
} from '../ProfileService';

const useSaveData = () => {
  const queryClient = useQueryClient();

  const { mutate: onSaveEmail } = useMutation(ChangeEmailService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('get-Profile');
    }
  });

  const { mutate: onSavePassword } = useMutation(ChangePasswordService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('get-Profile');
    }
  });

  const { mutate: onSaveSetting } = useMutation(ChangeSettingService.create, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('get-Profile');
    }
  });

  return {
    onSaveEmail,
    onSavePassword,
    onSaveSetting
  };
};

export default useSaveData;
