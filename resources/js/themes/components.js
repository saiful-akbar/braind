export default {
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) =>
        theme.unstable_sx({
          backdropFilter: "blur(6px)",
          color: "#FFF",
          fontSize: 12,
          backgroundColor: ({ palette }) => palette.background.tooltip,
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
          borderRadius: "8px",
        }),
      notchedOutline: ({ theme }) =>
        theme.unstable_sx({
          borderColor: theme.palette.divider,
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
