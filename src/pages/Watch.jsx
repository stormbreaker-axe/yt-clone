import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Tooltip from '@mui/material/Tooltip'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined'
import SortOutlinedIcon from '@mui/icons-material/SortOutlined'
import CheckIcon from '@mui/icons-material/Check'
import Player from '../components/Player'
import { CompactVideoCard } from '../components/VideoCard'
import { comments, videos } from '../data'

export default function Watch({ video, onSelect }) {
  const [subscribed, setSubscribed] = React.useState(false)
  const [liked, setLiked] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const [likes, setLikes] = React.useState('18K')

  React.useEffect(() => {
    setSubscribed(false)
    setLiked(false)
    setExpanded(false)
    setLikes('18K')
  }, [video.id])

  const toggleLike = () => {
    setLiked((v) => {
      setLikes(v ? '18K' : '18K+1')
      return !v
    })
  }

  const related = videos.filter((v) => v.id !== video.id).slice(0, 10)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { xs: 3, lg: 3 },
        px: { xs: 0, sm: 3 },
        py: { xs: 0, sm: 3 },
        maxWidth: 1750,
        mx: 'auto',
      }}
    >
      {/* Main column */}
      <Box sx={{ flex: '1 1 auto', minWidth: 0, maxWidth: { lg: 1100 } }}>
        <Player video={video} />

        <Box sx={{ px: { xs: 2, sm: 0 }, pt: 2 }}>
          <Typography sx={{ fontSize: { xs: 18, sm: 20 }, fontWeight: 700, lineHeight: 1.35 }}>
            {video.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1.5,
              mt: 2,
            }}
          >
            <Avatar src={video.channelAvatar} alt={video.channel} sx={{ width: 40, height: 40 }} />
            <Box sx={{ mr: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{video.channel}</Typography>
                {video.verified && (
                  <Tooltip title="Verified">
                    <CheckIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  </Tooltip>
                )}
              </Box>
              <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                {video.subs}
              </Typography>
            </Box>

            <Button
              variant={subscribed ? 'contained' : 'contained'}
              onClick={() => setSubscribed((s) => !s)}
              sx={{
                borderRadius: 5,
                px: 2.2,
                height: 36,
                bgcolor: subscribed ? 'action.hover' : 'text.primary',
                color: subscribed ? 'text.primary' : 'background.default',
                '&:hover': { bgcolor: subscribed ? 'action.selected' : 'text.primary' },
              }}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>

            <Box sx={{ flex: 1 }} />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'action.hover',
                borderRadius: 5,
                height: 36,
                overflow: 'hidden',
              }}
            >
              <Button
                onClick={toggleLike}
                startIcon={liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                sx={{ color: 'text.primary', px: 1.8, height: '100%', borderRadius: 0 }}
              >
                {likes}
              </Button>
              <Divider orientation="vertical" flexItem sx={{ my: 1 }} />
              <IconButton
                size="small"
                aria-label="Dislike"
                sx={{ px: 1.5, borderRadius: 0, height: '100%' }}
              >
                <ThumbDownOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>

            <Button
              startIcon={<ShareOutlinedIcon />}
              sx={{
                bgcolor: 'action.hover',
                color: 'text.primary',
                borderRadius: 5,
                height: 36,
                px: 1.8,
              }}
            >
              Share
            </Button>
            <Button
              startIcon={<DownloadOutlinedIcon />}
              sx={{
                bgcolor: 'action.hover',
                color: 'text.primary',
                borderRadius: 5,
                height: 36,
                px: 1.8,
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            >
              Download
            </Button>
            <IconButton
              aria-label="More actions"
              sx={{ bgcolor: 'action.hover', width: 36, height: 36 }}
            >
              <MoreHorizIcon />
            </IconButton>
          </Box>

          {/* Description */}
          <Box
            onClick={() => setExpanded((e) => !e)}
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 3,
              bgcolor: 'action.hover',
              cursor: 'pointer',
              transition: 'background-color .15s',
              '&:hover': { bgcolor: 'action.selected' },
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {video.views} • {video.uploaded}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                mt: 0.75,
                whiteSpace: 'pre-line',
                display: '-webkit-box',
                WebkitLineClamp: expanded ? 'unset' : 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {video.description}
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600, mt: 0.75 }}>
              {expanded ? 'Show less' : '...more'}
            </Typography>
          </Box>

          {/* Comments */}
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                {comments.length} Comments
              </Typography>
              <Button startIcon={<SortOutlinedIcon />} sx={{ color: 'text.primary' }}>
                Sort by
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Avatar sx={{ width: 40, height: 40, background: 'linear-gradient(135deg,#7b5cff,#ff5c8a)' }}>
                A
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <InputBase
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  fullWidth
                  sx={{
                    fontSize: 14,
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                    pb: 1,
                    '&:focus-within': { borderColor: 'text.primary' },
                  }}
                />
                {comment && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
                    <Button onClick={() => setComment('')} sx={{ color: 'text.primary' }}>
                      Cancel
                    </Button>
                    <Button variant="contained" disabled sx={{ borderRadius: 5 }}>
                      Comment
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            {comments.map((c) => (
              <Box key={c.id} sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                <Avatar src={c.avatar} alt={c.author} sx={{ width: 40, height: 40 }} />
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                    {c.author}{' '}
                    <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                      {c.time}
                    </Box>
                  </Typography>
                  <Typography sx={{ fontSize: 14, mt: 0.5, lineHeight: 1.5 }}>
                    {c.text}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <IconButton size="small">
                      <ThumbUpOutlinedIcon sx={{ fontSize: 17 }} />
                    </IconButton>
                    <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
                      {c.likes}
                    </Typography>
                    <IconButton size="small">
                      <ThumbDownOutlinedIcon sx={{ fontSize: 17 }} />
                    </IconButton>
                    <Button size="small" sx={{ color: 'text.primary', fontWeight: 600, ml: 0.5 }}>
                      Reply
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Related column */}
      <Box sx={{ width: { xs: '100%', lg: 402 }, flexShrink: 0, px: { xs: 2, sm: 0 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 700 }}>Up next</Typography>
          <Box sx={{ flex: 1 }} />
          <Chip
            label="Autoplay"
            size="small"
            sx={{ bgcolor: 'text.primary', color: 'background.default', fontWeight: 500 }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
          {related.map((v) => (
            <CompactVideoCard key={v.id} video={v} onSelect={onSelect} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, color: 'text.secondary' }}>
          <PlaylistAddOutlinedIcon fontSize="small" />
          <Typography sx={{ fontSize: 13 }}>Save this mix for later</Typography>
        </Box>
      </Box>
    </Box>
  )
}
