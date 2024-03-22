import Header from "@/components/Header";
import AuthLayout from "@/layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import TabProfil from "./Partials/TabProfil";
import TabAlamat from "./Partials/TabAlamat";
import TabKontak from "./Partials/TabKontak";
import TabAkun from "./Partials/TabAkun";
import TabPassword from "./Partials/TabPassword";
import {
  AccountBox,
  AccountCircle,
  Contacts,
  Key,
  Map,
} from "@mui/icons-material";

/**
 * Daftar tab
 */
const tabs = [
  {
    label: "Profil",
    value: "profil",
    component: <TabProfil />,
    icon: <AccountBox />,
  },
  {
    label: "Alamat",
    value: "alamat",
    component: <TabAlamat />,
    icon: <Map />,
  },
  {
    label: "Kontak",
    value: "kontak",
    component: <TabKontak />,
    icon: <Contacts />,
  },
  {
    label: "Akun",
    value: "akun",
    component: <TabAkun />,
    icon: <AccountCircle />,
  },
  {
    label: "Password",
    value: "password",
    component: <TabPassword />,
    icon: <Key />,
  },
];

/**
 * Halaman profil user
 *
 * @param {object} props
 * @returns {React.ReactElement}
 */
const Profil = (props) => {
  const { params } = props.app.url;
  const tabParams = params.tab ?? "profil";
  const [tabValue, setTabValue] = useState("profil");

  /**
   * Update tab
   */
  useEffect(() => {
    const result = tabs.find((tab) => tab.value === tabParams);

    if (typeof result !== "undefined") {
      setTabValue(result.value);
    }
  }, [tabParams]);

  /**
   * fungsi untuk menangani ketika tab di klik.
   */
  const handleTabChange = useCallback((event, value) => {
    router.visit(route("profil"), {
      method: "get",
      data: { tab: value },
      preserveScroll: true,
      preserveState: true,
    });
  }, []);

  return (
    <Box component="main" sx={{ mt: 5 }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} variant="scrollable">
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                icon={tab.icon}
                iconPosition="start"
                disableRipple
                sx={{
                  p: 0,
                  minWidth: 0,
                  marginLeft: 5,
                  ":first-of-type": {
                    marginLeft: 0,
                  },
                }}
              />
            ))}
          </TabList>
        </Box>

        {tabs.map((tab) => (
          <TabPanel
            key={tab.value}
            value={tab.value}
            children={tab.component}
          />
        ))}
      </TabContext>
    </Box>
  );
};

Profil.layout = (page) => (
  <AuthLayout title="Profil">
    <Header title="Profil" />
    {page}
  </AuthLayout>
);

export default Profil;
