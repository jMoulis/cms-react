export const colors = {
  darkGray: {
    hex: '#30353b',
    rgb: '48,53,59',
  },
  lightGray: {
    hex: '#72808C',
    rgb: '114,128,140',
  },
  beige: {
    hex: '#FFFAE0',
    rgb: '237,232,209',
  },
  lightBlue: {
    hex: '#579DCF',
    rgb: '87,157,207',
  },
  darkBlue: {
    hex: '#184E96',
    rgb: '24,78,150',
  },
};

export const theme = {
  colors,
  typography: {
    h1: {
      fontSize: '2rem',
      color: { ...colors.darkGray },
    },
    body: {
      fontSize: '1rem',
      color: { ...colors.darkGray },
    },
  },
  backgroundColor: { ...colors.beige },
};
