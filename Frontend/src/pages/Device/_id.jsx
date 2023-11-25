import React, { useState } from 'react';
import AppBar from '../../components/AppBar/AppBar';
import Navigation from '../../components/Navigation/Navigation';
import {
  Box,
  Container,
  Button,
  Typography,
  Grid,
  Switch,
  styled
} from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import ShowerIcon from '@mui/icons-material/Shower';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import TempertureTab from './TempertureTab';
import WateringTab from './WateringTab';
import HumidTab from './HumidTab';

const TabButton = styled(Button)(({ theme }) => ({
  width: 250,
  height: 200,
  display: 'flex',
  flexDirection: 'column'
}));

function _id() {
  const [activeTab, setActiveTab] = useState('temp');

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: 'max-height',
        backgroundColor: 'secondary.main',
        px: 1,
        py: 1,
        display: 'flex'
      }}
    >
      {/* Navigation */}
      <Navigation />
      <Container
        maxWidth={false}
        sx={{ height: '100%', backgroundColor: 'secondary.main', py: 1 }}
      >
        {/* Header */}
        <AppBar />
        {/* Content */}
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
          {activeTab === 'temp' && <TempertureTab />}
          {activeTab === 'humid' && <HumidTab />}
          {activeTab === 'water' && <WateringTab />}
        </Container>
      </Container>
    </Container>
  );
}

export default _id