import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Watch from './pages/Watch'

const DRAWER_WIDTH = 240

export default function App({ darkMode, onToggleTheme }) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(false)
  const [video, setVideo] = React.useState(null)
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState('All')
  const [showTop, setShowTop] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleSidebar = () => {
    if (isDesktop) setCollapsed((c) => !c)
    else setMobileOpen((o) => !o)
  }

  const openVideo = (v) => {
    setVideo(v)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const goHome = () => {
    setVideo(null)
    setQuery('')
    setCategory('All')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const search = (q) => {
    setQuery(q)
    setVideo(null)
    setCategory('All')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const sideWidth = isDesktop && !collapsed ? DRAWER_WIDTH : 0

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar
        onToggleSidebar={toggleSidebar}
        query={query}
        onSearch={search}
        onHome={goHome}
        darkMode={darkMode}
        onToggleTheme={onToggleTheme}
      />

      {/* Desktop sidebar */}
      {isDesktop && (
        <Box
          component="nav"
          sx={{
            position: 'fixed',
            top: 56,
            left: 0,
            width: collapsed ? 0 : DRAWER_WIDTH,
            height: 'calc(100vh - 56px)',
            overflow: 'hidden',
            borderRight: (t) => `1px solid ${collapsed ? 'transparent' : t.palette.divider}`,
            transition: 'width .2s ease',
            zIndex: 1,
          }}
        >
          <Sidebar />
        </Box>
      )}

      {/* Mobile drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { md: 'none' } }}
        PaperProps={{ sx: { width: DRAWER_WIDTH, pt: 7 } }}
      >
        <Sidebar />
      </Drawer>

      <Box
        component="main"
        sx={{
          pt: '56px',
          ml: { xs: 0, md: `${sideWidth}px` },
          transition: 'margin-left .2s ease',
        }}
      >
        {video ? (
          <Watch video={video} onSelect={openVideo} />
        ) : (
          <Home
            onSelect={openVideo}
            category={category}
            onCategory={setCategory}
            query={query}
          />
        )}
      </Box>

      {showTop && (
        <Fab
          size="small"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            bgcolor: 'text.primary',
            color: 'background.default',
            '&:hover': { bgcolor: 'text.primary', opacity: 0.85 },
          }}
          aria-label="Back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Box>
  )
}
