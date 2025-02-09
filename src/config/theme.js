import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      main: 'rgb(215, 55, 107)',
    },
    text: {
      default: '#45496e',
      light: '#ffffff',
    },
  },
  fonts: {
    body: '"DM Sans", sans-serif',
    heading: '"DM Sans", sans-serif',
  },
  fontSizes: {
    large: '14px',
    medium: '13px',
    small: '12px',
    xsmall: '11px',
  },
  components: {
    FormLabel: {
      baseStyle: {
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 400,
        color: '#45496e',
      },
      variants: {
        basic: { fontSize: '14px', fontWeight: 400 },
        h1: {
          fontSize: '14px',
          fontWeight: 700,
        },

        h2: {
          fontSize: '12px !important',
          fontWeight: 700,
          letterSpacing: 0,
        },
        h3: {
          fontSize: '12px',
          fontWeight: 400,
        },
        h3White: {
          fontSize: '12px',
          fontWeight: 400,
          color: 'white',
        },
        h4: {
          fontSize: '11px',
        },
      },
    },
    Textarea: {
      variants: {
        custom: {
          field: {
            backgroundColor: 'white',
            border: '1px solid rgba(16, 22, 26, .2) !important',
            borderRadius: '3px',
            height: 'auto',
            padding: '6px 15px',
            outline: 'none !important',
            fontWeight: 400,
            lineHeight: '30px',
            transition: 'box-shadow .1s cubic-bezier(.4,1,.75,.9)',
            verticalAlign: 'middle',
            fontSize: 'large',
            boxShadow: 'none',
            _focus: {
              boxShadow: '0 1px 10px -1px rgba(98, 104, 229, 0.36) !important',
            },
          },
        },
      },
    },
    Input: {
      variants: {
        custom: {
          field: {
            backgroundColor: 'white',
            border: '1px solid rgba(16, 22, 26, .2) !important',
            borderRadius: '3px',
            height: 'auto',
            padding: '6px 15px',
            outline: 'none !important',
            fontWeight: 400,
            lineHeight: '30px',
            transition: 'box-shadow .1s cubic-bezier(.4,1,.75,.9)',
            verticalAlign: 'middle',
            fontSize: 'large',
            boxShadow: 'none',
            _focus: {
              boxShadow: '0 1px 10px -1px rgba(98, 104, 229, 0.36) !important',
            },
          },
        },
        customMini: {
          field: {
            backgroundColor: 'white',
            border: '1px solid rgba(16, 22, 26, .2) !important',
            borderRadius: '3px',
            outline: 'none !important',
            fontWeight: 400,
            lineHeight: '30px',
            padding: '0 11px',
            height: '36px',
            color: '#45496e',
            transition: 'box-shadow .1s cubic-bezier(.4,1,.75,.9)',
            verticalAlign: 'middle',
            fontSize: 'small',
            boxShadow: 'none',
            _focus: {
              boxShadow: '0 1px 10px -1px rgba(98, 104, 229, 0.36) !important',
            },
          },
        },
      },
    },
    Select: {
      variants: {
        custom: {
          field: {
            backgroundColor: 'white',
            border: '1px solid rgba(16, 22, 26, .2) !important',
            borderRadius: '3px',
            height: 'auto',
            padding: '6px 15px',
            outline: 'none !important',
            fontWeight: 400,
            lineHeight: '30px',
            transition: 'box-shadow .1s cubic-bezier(.4,1,.75,.9)',
            verticalAlign: 'middle',
            fontSize: 'large',
            boxShadow: 'none',
            _focus: {
              boxShadow: '0 1px 10px -1px rgba(98, 104, 229, 0.36) !important',
            },
            _hover: {
              boxShadow: 'none !important',
            },
          },
        },
        customMini: {
          field: {
            backgroundColor: 'white',
            border: '1px solid rgba(16, 22, 26, .2) !important',
            borderRadius: '3px',
            padding: '0 11px',
            outline: 'none !important',
            fontWeight: 500,
            lineHeight: '30px',
            height: '36px',
            color: '#45496e',
            transition: 'box-shadow .1s cubic-bezier(.4,1,.75,.9)',
            verticalAlign: 'middle',
            fontSize: 'large',
            boxShadow: 'none',
            _focus: {
              boxShadow: '0 1px 10px -1px rgba(98, 104, 229, 0.36) !important',
            },
            _hover: {
              boxShadow: 'none !important',
            },
          },
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: '14px',
      },
    },
    Button: {
      variants: {
        basic: {
          alignItems: 'center',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          display: 'inline-flex',
          flexDirection: 'row',
          fontSize: '14px',
          justifyContent: 'center',
          minHeight: '30px',
          minWidth: '30px',
          padding: '5px 10px',
          textAlign: 'left',
          verticalAlign: 'middle',
        },
      },
    },
  },
});

export default theme;
