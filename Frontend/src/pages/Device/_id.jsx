import React, { useEffect, useState } from 'react';
import { Box, Container, Button, styled } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ShowerIcon from '@mui/icons-material/Shower';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import TempertureTab from './components/TempertureTab';
import WateringTab from './components/WateringTab';
import HumidTab from './components/HumidTab';
import useQueryDevice from './hooks/useQueryDevice';

const TabButton = styled(Button)(({ theme }) => ({
  width: 250,
  height: 200,
  display: 'flex',
  flexDirection: 'column'
}));

function _id() {
  const { deviceList } = useQueryDevice();

  const [activeTab, setActiveTab] = useState('temp');

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
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
          variant={activeTab === 'temp' ? 'contained' : 'outlined'}
          onClick={() => handleTabChange('temp')}
        >
          <DeviceThermostatIcon sx={{ fontSize: '80px' }} />
          Temperture
        </TabButton>
        <TabButton
          variant={activeTab === 'humid' ? 'contained' : 'outlined'}
          onClick={() => handleTabChange('humid')}
        >
          <WaterDropIcon sx={{ fontSize: '80px' }} />
          Humidity
        </TabButton>
        <TabButton
          variant={activeTab === 'water' ? 'contained' : 'outlined'}
          onClick={() => handleTabChange('water')}
        >
          <ShowerIcon sx={{ fontSize: '80px' }} />
          Water
        </TabButton>
      </Container>
      <Container sx={{ backgroundColor: '#fff', mt: 5, p: 2 }}>
        {activeTab === 'temp' && <TempertureTab deviceList={deviceList} />}
        {activeTab === 'humid' && <HumidTab deviceList={deviceList} />}
        {activeTab === 'water' && <WateringTab deviceList={deviceList} />}
      </Container>
    </>
  );
}

export default _id;
