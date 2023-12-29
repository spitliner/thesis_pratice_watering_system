import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box } from '@mui/material';
import loading from './loading.json';
import Lottie from 'react-lottie';

function SuspenseLoader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Lottie options={defaultOptions} height={120} width={120} />
    </Box>
  );
}

export default SuspenseLoader;
