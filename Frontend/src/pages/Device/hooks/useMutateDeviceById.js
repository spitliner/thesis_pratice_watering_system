import { useMutation, useQueryClient } from 'react-query';
import { DeviceService } from '../DeviceService';
import { useNavigate } from 'react-router';

const useMutateDeviceById = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: onSaveDataById, isLoading } = useMutation(
    ([id, field, data]) =>
      DeviceService.updateById(`${id}/${field}`, data, { deviceID: id }),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('getDevice');
        navigate('/schedules');
      }
    }
  );

  return {
    onSaveDataById,
    isLoading
  };
};

export default useMutateDeviceById;
