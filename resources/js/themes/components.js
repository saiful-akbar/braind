export default {
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) =>
        theme.unstable_sx({
          backdropFilter: "blur(6px)",
          fontSize: 12,
          backgroundColor: ({ palette }) => palette.tooltip.background,
          color: ({ palette }) => palette.tooltip.text,
        }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          borderColor: theme.palette.divider,
        }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) =>
        theme.unstable_sx({
          borderColor: theme.palette.divider,
          borderRadius: "8px",
        }),
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        backgroundImage: "none",
      },
    },
  },
};
