import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import VideoCard from '../components/VideoCard'
import CategoryChips from '../components/CategoryChips'
import { categories, videos } from '../data'

export default function Home({ onSelect, category, onCategory, query }) {
  const q = query.trim().toLowerCase()

  const visible = videos.filter((v) => {
    const matchesQuery =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q)
    const matchesCategory = category === 'All' || v.category === category
    return matchesQuery && matchesCategory
  })

  return (
    <Box>
      {!q && <CategoryChips value={category} onChange={onCategory} />}

      <Box sx={{ px: { xs: 1.5, md: 3 }, py: 3 }}>
        {q && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
              Search results for “{query}”
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: 0.5 }}>
              {visible.length} {visible.length === 1 ? 'video' : 'videos'} found
            </Typography>
          </Box>
        )}

        {visible.length === 0 ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              No videos matched your search
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 1 }}>
              Try a different keyword or pick another category.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 3, sm: 2.5, md: 3 },
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: category !== 'All' ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))',
                xl: category !== 'All' ? 'repeat(3, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
              },
              columnGap: 2,
            }}
          >
            {visible.map((video) => (
              <VideoCard key={video.id} video={video} onSelect={onSelect} />
            ))}
          </Box>
        )}

        <Box sx={{ pt: 6, pb: 2, textAlign: 'center' }}>
          <Typography sx={{ fontSize: 12.5, color: 'text.secondary' }}>
            {categories.length} categories • demo content, not real videos
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
