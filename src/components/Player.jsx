import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import SettingsIcon from '@mui/icons-material/Settings'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import ClosedCaptionOutlinedIcon from '@mui/icons-material/ClosedCaptionOutlined'
import { alpha } from '@mui/material/styles'

const fmt = (s) => {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  const pad = (n) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`
}

export default function Player({ video }) {
  const [playing, setPlaying] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const [hover, setHover] = React.useState(false)
  const [muted, setMuted] = React.useState(false)

  React.useEffect(() => {
    setPlaying(false)
    setTime(0)
  }, [video.id])

  React.useEffect(() => {
    if (!playing || video.live) return
    const id = setInterval(() => {
      setTime((t) => {
        if (t + 1 >= video.durationSec) {
          setPlaying(false)
          return video.durationSec
        }
        return t + 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [playing, video.durationSec, video.live])

  const pct = video.durationSec ? (time / video.durationSec) * 100 : 0
  const controlsVisible = !playing || hover

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        bgcolor: '#000',
        borderRadius: { xs: 0, sm: 3 },
        overflow: 'hidden',
        '&:hover .hover-zoom': { transform: 'scale(1.015)' },
      }}
    >
      <Box
        component="img"
        src={video.thumbnail}
        alt={video.title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: playing ? 'brightness(.75)' : 'brightness(.62)',
          transition: 'filter .3s ease',
        }}
      />

      {/* Center play button */}
      {!playing && (
        <Box
          onClick={() => setPlaying(true)}
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Box
            className="hover-zoom"
            sx={{
              width: 74,
              height: 74,
              borderRadius: '50%',
              bgcolor: alpha('#000', 0.65),
              backdropFilter: 'blur(4px)',
              display: 'grid',
              placeItems: 'center',
              transition: 'transform .2s ease',
              border: '1px solid rgba(255,255,255,.18)',
            }}
          >
            <PlayArrowIcon sx={{ color: '#fff', fontSize: 44, ml: '4px' }} />
          </Box>
        </Box>
      )}

      {/* Live / now playing badge */}
      {playing && video.live && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            px: 1,
            py: 0.25,
            borderRadius: 1,
            bgcolor: 'primary.main',
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          LIVE
        </Box>
      )}

      {/* Controls */}
      <Box
        sx={{
          position: 'absolute',
          inset: 'auto 0 0 0',
          px: 1.5,
          pb: 1,
          pt: 5,
          background: `linear-gradient(to top, ${alpha('#000', 0.85)}, transparent)`,
          opacity: controlsVisible ? 1 : 0,
          transition: 'opacity .2s ease',
          pointerEvents: controlsVisible ? 'auto' : 'none',
        }}
      >
        <Slider
          value={video.live ? 100 : pct}
          onChange={(_, val) => setTime((val / 100) * video.durationSec)}
          aria-label="Seek"
          sx={{
            color: 'primary.main',
            p: 0.5,
            mb: 0.5,
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
              transition: 'transform .1s',
            },
            '& .MuiSlider-rail': { bgcolor: alpha('#fff', 0.3), opacity: 1 },
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#fff' }}>
          <IconButton
            size="small"
            onClick={() => setPlaying((p) => !p)}
            sx={{ color: '#fff' }}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton size="small" sx={{ color: '#fff' }} aria-label="Next video">
            <SkipNextIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: '#fff' }}
            onClick={() => setMuted((m) => !m)}
            aria-label="Mute"
          >
            <VolumeUpIcon sx={{ opacity: muted ? 0.35 : 1 }} />
          </IconButton>
          <Box sx={{ fontSize: 13, ml: 1, fontVariantNumeric: 'tabular-nums' }}>
            {video.live
              ? 'LIVE'
              : `${fmt(time)} / ${fmt(video.durationSec)}`}
          </Box>
          <Box sx={{ flex: 1 }} />
          <IconButton size="small" sx={{ color: '#fff' }} aria-label="Subtitles">
            <ClosedCaptionOutlinedIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: '#fff' }} aria-label="Settings">
            <SettingsIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: '#fff' }} aria-label="Full screen">
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
