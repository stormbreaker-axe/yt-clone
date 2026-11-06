import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { alpha } from '@mui/material/styles'

function Thumb({ video, radius = 3, sx }) {
  const [failed, setFailed] = React.useState(false)
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: radius,
        overflow: 'hidden',
        bgcolor: 'action.hover',
        ...sx,
      }}
    >
      {!failed ? (
        <Box
          component="img"
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onError={() => setFailed(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform .35s ease',
            '.video-link:hover &': { transform: 'scale(1.04)' },
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(135deg,#2b2b3a,#4a2b3a)',
            color: '#fff',
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 40, opacity: 0.6 }} />
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          right: 6,
          bottom: 6,
          px: 0.6,
          py: 0.1,
          borderRadius: 1,
          fontSize: 12,
          fontWeight: 600,
          color: '#fff',
          bgcolor: 'rgba(0,0,0,.8)',
          letterSpacing: 0.2,
        }}
      >
        {video.duration}
      </Box>

      {video.live && (
        <Box
          sx={{
            position: 'absolute',
            left: 6,
            bottom: 6,
            px: 0.7,
            py: 0.1,
            borderRadius: 1,
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 0.4,
          }}
        >
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#fff' }} />
          LIVE
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          opacity: 0,
          transition: 'opacity .2s ease',
          bgcolor: alpha('#000', 0.18),
          '.video-link:hover &': { opacity: 1 },
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: alpha('#000', 0.6),
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <PlayArrowIcon sx={{ color: '#fff', fontSize: 30 }} />
        </Box>
      </Box>
    </Box>
  )
}

export default function VideoCard({ video, onSelect }) {
  return (
    <Box
      className="video-link"
      component="article"
      onClick={() => onSelect(video)}
      sx={{ cursor: 'pointer', borderRadius: 3, outline: 'none' }}
    >
      <Thumb video={video} radius={3} />
      <Box sx={{ display: 'flex', gap: 1.5, mt: 1.25 }}>
        <Avatar
          src={video.channelAvatar}
          alt={video.channel}
          sx={{ width: 36, height: 36, mt: 0.25, flexShrink: 0 }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {video.title}
          </Typography>
          <Tooltip title={video.channel} placement="top">
            <Typography
              sx={{ fontSize: 13.5, color: 'text.secondary', mt: 0.4 }}
              noWrap
            >
              {video.channel}
            </Typography>
          </Tooltip>
          <Typography sx={{ fontSize: 13.5, color: 'text.secondary' }}>
            {video.views} • {video.uploaded}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export function CompactVideoCard({ video, onSelect }) {
  return (
    <Box
      className="video-link"
      onClick={() => onSelect(video)}
      sx={{ display: 'flex', gap: 1.5, cursor: 'pointer' }}
    >
      <Box sx={{ width: { xs: 150, sm: 168 }, flexShrink: 0 }}>
        <Thumb video={video} radius={2.5} />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 0.5 }} noWrap>
          {video.channel}
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }} noWrap>
          {video.views} • {video.uploaded}
        </Typography>
      </Box>
    </Box>
  )
}
