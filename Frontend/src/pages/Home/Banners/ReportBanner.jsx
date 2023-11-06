import Box from '@mui/material/Box'
import reportSVG from '../../../assets/report.svg'
import Typography from '@mui/material/Typography'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'

function ReportBanner() {
  return (
    <Box sx={{
      width: '100%',
      height: '100px',
      backgroundColor: '#FF994F',
      borderRadius: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Box sx={{
        mx: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <CheckBoxOutlinedIcon sx={{ color: 'white' }} />
        <Typography sx={{ fontSize: '20px', color: 'white' }}>Daily Report</Typography>
      </Box>
      <Box>
        <img height={100} src={reportSVG} />
      </Box>
    </Box>
  )
}

export default ReportBanner