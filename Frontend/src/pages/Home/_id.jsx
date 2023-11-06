import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/AppBar'
import Navigation from '../../components/Navigation/Navigation'
import SideBar from './SideBar'
import MainContent from './MainContent'

function Home() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: 'max-height', backgroundColor: 'secondary.main', px: 1, py: 1, display: 'flex' }}>
      {/* Navigation */}
      <Navigation />
      <Container maxWidth={false} sx={{ height: '100%', backgroundColor: 'secondary.main', py: 1 }}>
        {/* Header */}
        <AppBar />
        {/* Content */}
        <Container disableGutters maxWidth={false} sx={{ backgroundColor: 'secondary.main', display: 'flex', mt: 2 }}>
          <MainContent />
          <SideBar />
        </Container>
      </Container>
    </Container>
  )
}

export default Home