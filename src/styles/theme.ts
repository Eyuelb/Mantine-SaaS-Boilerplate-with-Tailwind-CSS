"use client";
import {
  rem,
  type MantineThemeOverride,
  type MantineThemeColors,
  type MantineBreakpointsValues,
} from "@mantine/core";

const size = "sm";
export const theme: MantineThemeOverride = {
  defaultRadius: "xs",
  primaryColor: "primary",
  focusRing: "never",
  scale: 1,
  primaryShade: { light: 8, dark: 7 },
  luminanceThreshold: 0.3,
  radius: {
    xs: rem("6px"),
    sm: rem("8px"),
    md: rem("12px"),
    lg: rem("16px"),
    xl: rem("24px"),
  },
  spacing: {
    "3xs": rem("4px"),
    "2xs": rem("8px"),
    xs: rem("10px"),
    sm: rem("12px"),
    md: rem("16px"),
    lg: rem("20px"),
    xl: rem("24px"),
    "2xl": rem("28px"),
    "3xl": rem("32px"),
  },
  fontSizes: {
    xs: rem("12px"),
    sm: rem("14px"),
    md: rem("16px"),
    lg: rem("18px"),
    xl: rem("20px"),
    "2xl": rem("24px"),
    "3xl": rem("30px"),
    "4xl": rem("36px"),
    "5xl": rem("48px"),
  },
  lineHeights: {
    xs: rem("18px"),
    sm: rem("20px"),
    md: rem("24px"),
    lg: rem("28px"),
  },

  headings: {
    sizes: {
      h1: {
        fontSize: rem("36px"),
        lineHeight: rem("44px"),
        fontWeight: "600",
      },
      h2: {
        fontSize: rem("30px"),
        lineHeight: rem("38px"),
        fontWeight: "600",
      },
      h3: {
        fontSize: rem("24px"),
        lineHeight: rem("32px"),
        fontWeight: "600",
      },
      h4: {
        fontSize: rem("20px"),
        lineHeight: rem("30px"),
        fontWeight: "600",
      },
    },
  },
  shadows: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
    xxl: "0 25px 50px rgba(0, 0, 0, 0.25)",
  },

  cursorType: "pointer",
  breakpoints: {
    xs: "36rem",
    sm: "48rem",
    md: "62rem",
    lg: "75rem",
    xl: "87.5rem",
  },

  colors: {
    primary: [
      "#ecf4ff",
      "#dce4f5",
      "#b9c7e2",
      "#94a8d0",
      "#748dc0",
      "#5f7cb7",
      "#5474b4",
      "#44639f",
      "#3a5890",
      "#2c4b80",
    ],
  },

  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
    Button: {
      defaultProps: {
        size: "sm",
      },
    },

    Input: {
      defaultProps: {
        size: size,
      },
    },
    Checkbox: {
      defaultProps: {
        labelPosition: "right",
        size: size,
      },
    },
    Radio: {
      defaultProps: {
        labelPosition: "right",
      },
    },
    TextInput: {
      defaultProps: {
        size: size,
      },
    },
    NumberInput: {
      defaultProps: {
        size: size,
      },
    },
    Select: {
      defaultProps: {
        size: size,
      },
    },
    MultiSelect: {
      defaultProps: {
        size: size,
      },
    },
    PasswordInput: {
      defaultProps: {
        size: size,
      },
    },
    InputError: {
      defaultProps: {
        size: size,
      },
    },
    InputLabel: {
      defaultProps: {
        size: size,
      },
    },
    InputPlaceholder: {
      defaultProps: {
        size: size,
      },
    },
    InputWrapper: {
      defaultProps: {
        size: size,
      },
    },
    InputDescription: {
      defaultProps: {
        size: size,
      },
    },
    Breadcrumbs: {
      defaultProps: {
        size: size,
      },
    },
  },
};
export const colors: MantineThemeColors = theme.colors as MantineThemeColors;
export const breakpoints: MantineBreakpointsValues =
  theme.breakpoints as MantineBreakpointsValues;
export const primaryColor = colors["primary"][Number(theme.primaryShade)];

export const themeColors = theme.colors as MantineThemeColors;
