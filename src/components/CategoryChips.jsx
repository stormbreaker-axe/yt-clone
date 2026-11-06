import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { categories } from '../data'

export default function CategoryChips({ value, onChange }) {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 56,
        zIndex: 2,
        display: 'flex',
        gap: 1,
        px: { xs: 1.5, md: 3 },
        py: 1.5,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        bgcolor: 'background.default',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      {categories.map((cat) => {
        const active = cat === value
        return (
          <Chip
            key={cat}
            label={cat}
            onClick={() => onChange(cat)}
            sx={{
              flexShrink: 0,
              height: 32,
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 2,
              border: 'none',
              bgcolor: active ? 'text.primary' : 'action.hover',
              color: active ? 'background.default' : 'text.primary',
              '&:hover': {
                bgcolor: active ? 'text.primary' : 'action.selected',
              },
            }}
          />
        )
      })}
    </Box>
  )
}
