import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../../Login/LoginService';
import useSaveData from './useMutateData';

const useProfile = () => {
    const { onSaveEmail, onSavePassword, onSaveSetting } = useSaveData();

    const { mutate: onSaveProfile, isLoading } = useMutation(LoginService.create, {
        onSuccess: (data, variables) => {
            if (variables.newEmail && variables.email !== variables.newEmail)
                onSaveEmail({ email: variables.newEmail });
            if (variables.newPassword && variables.password !== variables.newPassword) {
                onSavePassword({ password: variables.newPassword })
            }

        },
        onError: (res) => {
            alert(res.response.data.error)
        }
    });

    return {
        onSaveProfile,
        isLoading
    };
};

export default useProfile;
