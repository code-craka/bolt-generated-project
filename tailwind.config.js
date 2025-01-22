const { fontFamily } = require('tailwindcss/defaultTheme')

    module.exports = {
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter var', ...fontFamily.sans],
          },
          colors: {
            primary: '#86efac',
          },
        },
      },
      plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
      ],
    }
