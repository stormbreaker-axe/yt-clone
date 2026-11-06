import { createTheme } from '@mui/material/styles'

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#FF0033' },
      background:
        mode === 'dark'
          ? { default: '#0f0f0f', paper: '#0f0f0f' }
          : { default: '#ffffff', paper: '#ffffff' },
      text:
        mode === 'dark'
          ? { primary: '#f1f1f1', secondary: '#aaaaaa' }
          : { primary: '#0f0f0f', secondary: '#606060' },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
    },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily:
        'Roboto, "Helvetica Neue", Arial, system-ui, -apple-system, sans-serif',
      button: { textTransform: 'none', fontWeight: 500 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '::-webkit-scrollbar': { width: 8, height: 8 },
          '::-webkit-scrollbar-thumb': {
            background: mode === 'dark' ? '#3f3f3f' : '#c9c9c9',
            borderRadius: 8,
          },
          '::-webkit-scrollbar-track': { background: 'transparent' },
          img: { display: 'block' },
        },
      },
      MuiButtonBase: { defaultProps: { disableRipple: false } },
    },
  })
