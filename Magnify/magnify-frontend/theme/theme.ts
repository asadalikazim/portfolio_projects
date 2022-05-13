import { extendTheme, withDefaultColorScheme, theme as baseTheme, FormLabel, ThemeConfig } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const inputSelectStyles = {
  variants: {
    outline: {
      bg: "#1A202C",
      field: {
        color: "#fff",
        // _focus: {d
        _invalid: {
          borderColor: 'brand.50',
        },
        _hover: {
          borderColor: 'brand.500',
        }
      },
    },
  },
};


const theme = extendTheme({
  config: config,
  colors: {
    brand: {
      50: "#FAF5FF",
      100: "#E9D8FD",
      200: "#D6BCFA",
      300: "#B794F4",
      400: "#9F7AEA",
      500: "#805AD5",
      600: "#6B46C1",
      700: "#553C9A",
      800: "#44337A",
      900: "#322659"
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#fff', '#1A202C')(props),
      },
    })
  },
  components: {
    Input: { ...inputSelectStyles },
    FormLabel: (props) => ({
      color: mode('#1A202C', '#fff')(props),
    }),
    Button: {
      variants: {
        ghost: {
          _hover: {
            bg: ""
          },
          _focus: {
            boxShadow: ""
          }
        }
      }
    },

  },
}, withDefaultColorScheme({
  colorScheme: 'brand',
  // components: ['Input', 'Button']
}));

export default theme;