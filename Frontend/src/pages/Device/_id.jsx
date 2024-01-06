import React, { useEffect, useState } from 'react';
import { Box, Container, Button, styled, Typography } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ShowerIcon from '@mui/icons-material/Shower';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import DeviceTab from './components/DeviceTab';
import useQueryDevice from './hooks/useQueryDevice';
import { deviceType } from '../../constants/device';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostat';
import ShowerOutlinedIcon from '@mui/icons-material/Shower';
import SuspenseLoader from '../../components/SuspenseLoader';
import Title from '../../components/Title';
import deviceSVG from '../../assets/device.svg';

const TabButton = styled(Button)(({ theme }) => ({
  width: 250,
  height: 200,
  display: 'flex',
  flexDirection: 'column'
}));

function _id() {
  const { deviceList, isLoading } = useQueryDevice();

  const [activeTab, setActiveTab] = useState(deviceType.temp);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  if (isLoading) return <SuspenseLoader />;

  return (
    <>
      <Title title="DEVICE" icon={deviceSVG} />
      <Container
        sx={{
          backgroundColor: 'secondary.main',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 5
        }}
      >
        <TabButton
          variant={activeTab === deviceType.temp ? 'contained' : 'outlined'}
          onClick={() => handleTabChange(deviceType.temp)}
        >
          <DeviceThermostatIcon sx={{ fontSize: '80px' }} />
          Temperture
        </TabButton>
        <TabButton
          variant={activeTab === deviceType.humid ? 'contained' : 'outlined'}
          onClick={() => handleTabChange(deviceType.humid)}
        >
          <WaterDropIcon sx={{ fontSize: '80px' }} />
          Humidity
        </TabButton>
        <TabButton
          variant={activeTab === deviceType.water ? 'contained' : 'outlined'}
          onClick={() => handleTabChange(deviceType.water)}
        >
          <ShowerIcon sx={{ fontSize: '80px' }} />
          Water
        </TabButton>
      </Container>
      <Container sx={{ backgroundColor: '#fff', mt: 5, p: 2, minHeight: 300 }}>
        {activeTab === deviceType.temp && (
          <DeviceTab
            deviceList={deviceList}
            title="temperture measuring"
            typeOfDevice={deviceType.temp}
            icon={<DeviceThermostatOutlinedIcon />}
          />
        )}
        {activeTab === deviceType.humid && (
          <DeviceTab
            deviceList={deviceList}
            title="humidity measuring"
            typeOfDevice={deviceType.humid}
            icon={<WaterDropIcon />}
          />
        )}
        {activeTab === deviceType.water && (
          <DeviceTab
            deviceList={deviceList}
            title="watering"
            typeOfDevice={deviceType.water}
            icon={<ShowerOutlinedIcon />}
          />
        )}
      </Container>
    </>
  );
}

export default _id;
