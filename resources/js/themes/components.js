export default {
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) =>
        theme.unstable_sx({
          backdropFilter: "blur(6px)",
          fontSize: 12,
          backgroundColor: ({ palette }) => {
            if (palette.mode === "dark") return "#ededed";
            return "#171717";
          },
          color: ({ palette }) => {
            if (palette.mode === "dark") return "#171717";
            return "#ededed";
          },
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
