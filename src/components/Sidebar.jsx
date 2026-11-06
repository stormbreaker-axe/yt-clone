import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import HomeIcon from '@mui/icons-material/Home'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import HistoryIcon from '@mui/icons-material/History'
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'

const primary = [
  { label: 'Home', icon: <HomeIcon />, active: true },
  { label: 'Shorts', icon: <PlayCircleOutlineIcon /> },
  { label: 'Subscriptions', icon: <SubscriptionsOutlinedIcon /> },
]

const you = [
  { label: 'History', icon: <HistoryIcon /> },
  { label: 'Watch later', icon: <WatchLaterOutlinedIcon /> },
  { label: 'Liked videos', icon: <ThumbUpOutlinedIcon /> },
  { label: 'Your videos', icon: <VideoLibraryOutlinedIcon /> },
]

const subscriptions = [
  { label: 'CodeWithMaya', color: '#7b5cff' },
  { label: 'ChillHop Station', color: '#00a37a' },
  { label: 'Smarter Every Day-ish', color: '#e8a300' },
  { label: 'Full Time Whistle', color: '#1f8fff' },
  { label: 'Deep Cuts', color: '#d93a3a' },
]

const secondary = [
  { label: 'Settings', icon: <SettingsOutlinedIcon /> },
  { label: 'Report history', icon: <FlagOutlinedIcon /> },
  { label: 'Help', icon: <HelpOutlineIcon /> },
]

const itemSx = (active) => ({
  mx: 1,
  my: 0.25,
  borderRadius: 2.5,
  minHeight: 40,
  bgcolor: active ? 'action.selected' : 'transparent',
  '&:hover': { bgcolor: 'action.hover' },
  '& .MuiListItemIcon-root': { minWidth: 36, color: 'inherit' },
  '& .MuiListItemText-primary': {
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

const SectionTitle = ({ children }) => (
  <Typography
    sx={{
      px: 2.5,
      pt: 1.5,
      pb: 0.5,
      fontSize: 13,
      fontWeight: 600,
      color: 'text.secondary',
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    {children}
  </Typography>
)

export default function Sidebar() {
  return (
    <Box sx={{ py: 1.5, overflowY: 'auto', height: '100%' }}>
      <List dense disablePadding>
        {primary.map((item) => (
          <ListItemButton key={item.label} sx={itemSx(item.active)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <SectionTitle>You</SectionTitle>
      <List dense disablePadding>
        {you.map((item) => (
          <ListItemButton key={item.label} sx={itemSx(false)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <SectionTitle>Subscriptions</SectionTitle>
      <List dense disablePadding>
        {subscriptions.map((ch) => (
          <ListItemButton key={ch.label} sx={itemSx(false)}>
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24, bgcolor: ch.color, fontSize: 12 }}>
                {ch.label[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={ch.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <List dense disablePadding>
        {secondary.map((item) => (
          <ListItemButton key={item.label} sx={itemSx(false)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ px: 2.5, pt: 2, pb: 4, maxWidth: 220 }}>
        <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: 'text.secondary', lineHeight: 1.9 }}>
          About&nbsp;&nbsp;Press&nbsp;&nbsp;Copyright
          <br />
          Contact&nbsp;&nbsp;Creators&nbsp;&nbsp;Advertise
          <br />
          Developers&nbsp;&nbsp;Terms&nbsp;&nbsp;Privacy
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', opacity: 0.7, mt: 1.5 }}>
          A demo clone built with React &amp; Material UI.
        </Typography>
      </Box>
    </Box>
  )
}
