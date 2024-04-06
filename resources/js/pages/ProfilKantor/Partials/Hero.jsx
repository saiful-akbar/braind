import { Box, Paper, Stack, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import cover from "@/assets/images/profil_cover.jpg";
import { router, usePage } from "@inertiajs/react";
import { TabContext, TabList } from "@mui/lab";
import { AccountBox, Collections, VideoLibrary } from "@mui/icons-material";
import { useCallback } from "react";

const tabLists = [
  {
    label: "Profil",
    value: "profil",
    icon: <AccountBox />,
  },
  {
    label: "Galeri",
    value: "galeri",
    icon: <Collections />,
  },
  {
    label: "Peta Kerawanan",
    value: "video",
    icon: <VideoLibrary />,
  },
];

/**
 * Komponen partials Hero untuk halaman profil kantor.
 *
 * @returns {React.ReactElement}
 */
const Hero = () => {
  const { data: kantor } = usePage().props;
  const params = new URLSearchParams(window.location.search);
  const tabParams = params.get("tab") ?? "profil";

  /**
   * State
   */
  const [tabValue, setTabValue] = useState("profil");

  /**
   * Update tabValue setelah komponen pertama kali dirender.
   */
  useEffect(() => {
    const result = tabLists.find((tabList) => tabList.value === tabParams);

    if (typeof result !== "undefined") {
      setTabValue(result.value);
    }
  }, [tabParams]);

  /**
   * fungsi untuk menangani ketika tab dirubah
   */
  const handleTabChange = useCallback((event, newValue) => {
    router.visit(route("profil-kantor"), {
      method: "get",
      data: {
        tab: newValue,
      },
      preserveScroll: true,
      preserveState: true,
    });
  });

  return (
    <Paper
      elevation={3}
      sx={{
        overflow: "hidden",
        position: "relative",
        borderRadius: "16px",
        zIndex: 0,
        height: "290px",
      }}
    >
      <Box
        sx={{
          height: "100%",
          color: "rgb(255, 255, 255)",
          background: `linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)) center center / cover no-repeat, url(${cover})`,
          backgroundPosition: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          pb: 7,
          textAlign: "center",
        }}
      >
        <Typography component="div" variant="h4">
          {kantor.nama}
        </Typography>
      </Box>

      <TabContext value={tabValue}>
        <Box
          sx={{
            minHeight: "48px",
            width: "100%",
            position: "absolute",
            bottom: 0,
            zIndex: 10,
            overflow: "hidden",
            backgroundColor: "background.paper",
          }}
        >
          <TabList
            onChange={handleTabChange}
            indicatorColor="primary"
            sx={{
              ".MuiTabs-flexContainer": {
                justifyContent: {
                  md: "flex-end",
                  xs: "center",
                },
              },
            }}
          >
            {tabLists.map((tabList) => (
              <Tab
                key={tabList.value}
                label={tabList.label}
                value={tabList.value}
                disableRipple
                icon={tabList.icon}
                iconPosition="start"
                sx={{
                  minWidth: 0,
                  padding: 0,
                  marginLeft: 4,
                  ":last-of-type": {
                    marginRight: 4,
                  },
                }}
              />
            ))}
          </TabList>
        </Box>
      </TabContext>
    </Paper>
  );
};

export default Hero;
