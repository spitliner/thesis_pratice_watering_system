import React, { useId } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import SelectInput from '../../../components/SelectInput';
import useMutateDevice from '../hooks/useMutateDevice';
import useCheckAndSave from '../hooks/useCheckApiKey';
import { v4 } from 'uuid';

const deviceType = [
  {
    value: 'Humidity',
    label: 'Humidity'
  },
  {
    value: 'Temperture',
    label: 'Temperture'
  },
  {
    value: 'Watering',
    label: 'Watering'
  }
];

export default function CreateForm(props) {
  const { onSaveData } = useMutateDevice();
  const { onCheckAndSave } = useCheckAndSave();
  const { open, handleClose } = props;
  const form = useForm();
  const { register, handleSubmit, control } = form;

  const submitForm = (data) => {
    const id = data?.name;
    console.log(id);
    onCheckAndSave({ ...data, deviceID: id });
    handleClose();
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{ textAlign: 'center', fontWeight: 700, fontSize: '1.3rem' }}
      >
        Add new device
      </DialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent
          sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            id="name"
            name="name"
            size="small"
            fullWidth
            label="Name"
            {...register('name')}
            control
            sx={{ mt: 2 }}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <SelectInput
                id="type"
                label="Device type"
                fullWidth
                options={deviceType}
                {...field}
              />
            )}
          />
          <TextField
            id="apiKey"
            name="apiKey"
            size="small"
            fullWidth
            label="Api key"
            {...register('apiKey')}
            control
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
