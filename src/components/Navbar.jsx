import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined'
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined'
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined'
import { alpha, styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import InputBase from '@mui/material/InputBase'

const SearchWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  maxWidth: 620,
  marginLeft: theme.spacing(5),
  [theme.breakpoints.down('sm')]: { marginLeft: theme.spacing(1) },
}))

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  height: 40,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 20,
  overflow: 'hidden',
  transition: 'border-color .15s ease',
  '&:focus-within': { borderColor: theme.palette.primary.main },
  '& input::placeholder': { opacity: 0.75 },
}))

export function YouTubeLogo({ onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        cursor: 'pointer',
        userSelect: 'none',
        ml: 0.5,
      }}
    >
      <Box sx={{ width: 34, height: 24, position: 'relative' }}>
        <Box
          sx={{
            width: 34,
            height: 24,
            borderRadius: '7px',
            bgcolor: '#FF0033',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 0,
              height: 0,
              borderTop: '5.5px solid transparent',
              borderBottom: '5.5px solid transparent',
              borderLeft: '9px solid #fff',
              ml: '2px',
            }}
          />
        </Box>
      </Box>
      <Box
        component="span"
        sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px' }}
      >
        YouTube
        <Box component="sup" sx={{ fontSize: 10, ml: '2px', opacity: 0.6 }}>
          clone
        </Box>
      </Box>
    </Box>
  )
}

export default function Navbar({
  onToggleSidebar,
  query,
  onSearch,
  onHome,
  darkMode,
  onToggleTheme,
}) {
  const [value, setValue] = React.useState(query)

  React.useEffect(() => setValue(query), [query])

  const submit = (e) => {
    e.preventDefault()
    onSearch(value.trim())
  }

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        inset: '0 0 auto 0',
        height: 56,
        zIndex: (t) => t.zIndex.appBar,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: { xs: 1, sm: 2 },
        bgcolor: (t) => alpha(t.palette.background.default, 0.96),
        backdropFilter: 'blur(8px)',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <IconButton onClick={onToggleSidebar} aria-label="Toggle sidebar">
        <MenuIcon />
      </IconButton>
      <YouTubeLogo onClick={onHome} />

      <SearchWrap component="form" onSubmit={submit}>
        <SearchBox>
          <InputBase
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            inputProps={{ 'aria-label': 'Search' }}
            sx={{ flex: 1, px: 2, fontSize: 15 }}
          />
          <IconButton
            type="submit"
            aria-label="Search"
            sx={{
              borderRadius: 0,
              width: 64,
              height: '100%',
              bgcolor: (t) => alpha(t.palette.text.primary, 0.05),
              borderLeft: (t) => `1px solid ${t.palette.divider}`,
              '&:hover': { bgcolor: (t) => alpha(t.palette.text.primary, 0.1) },
            }}
          >
            <SearchIcon />
          </IconButton>
        </SearchBox>
        <Tooltip title="Search with your voice">
          <IconButton
            sx={{
              ml: 1.5,
              display: { xs: 'none', md: 'inline-flex' },
              bgcolor: (t) => alpha(t.palette.text.primary, 0.05),
            }}
            aria-label="Voice search"
          >
            <KeyboardVoiceOutlinedIcon />
          </IconButton>
        </Tooltip>
      </SearchWrap>

      <Box sx={{ flex: 1 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Tooltip title={darkMode ? 'Light theme' : 'Dark theme'}>
          <IconButton onClick={onToggleTheme} aria-label="Toggle theme">
            {darkMode ? <Brightness7OutlinedIcon /> : <Brightness4OutlinedIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Create">
          <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            <VideoCallOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            ml: 1,
            bgcolor: 'secondary.main',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            background: 'linear-gradient(135deg,#7b5cff,#ff5c8a)',
          }}
        >
          A
        </Avatar>
      </Box>
    </Box>
  )
}
