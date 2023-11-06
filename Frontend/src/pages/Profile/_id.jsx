import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/AppBar'
import Navigation from '../../components/Navigation/Navigation'
import AvatarBox from './AvatarBox'
import EditBox from './EditBox'

function _id() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: 'max-height', backgroundColor: 'secondary.main', px: 1, py: 1, display: 'flex' }}>
      {/* Navigation */}
      <Navigation />
      <Container maxWidth={false} sx={{ height: '100%', backgroundColor: 'secondary.main', py: 1 }}>
        {/* Header */}
        <AppBar />
        {/* Content */}
        <Container disableGutters maxWidth={false} sx={{ backgroundColor: 'secondary.main', display: 'flex', mt: 2 }}>
          <AvatarBox />
          <EditBox />
        </Container>
      </Container>
    </Container>
  )
}

export default _id