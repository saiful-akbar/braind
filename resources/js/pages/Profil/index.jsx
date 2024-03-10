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

/**
 * Daftar tab
 */
const tabs = [
  {
    label: "Profil",
    value: "profil",
    component: <TabProfil />,
  },
  {
    label: "Alamat",
    value: "alamat",
    component: <TabAlamat />,
  },
  {
    label: "Kontak",
    value: "kontak",
    component: <TabKontak />,
  },
  {
    label: "Akun",
    value: "akun",
    component: <TabAkun />,
  },
  {
    label: "Password",
    value: "password",
    component: <TabPassword />,
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
  const [tabValue, setTabValue] = useState(tabParams);

  /**
   * Update tab
   */
  useEffect(() => {
    setTabValue(tabParams);
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
          <TabList
            onChange={handleTabChange}
            variant="scrollable"
            indicatorColor="secondary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
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
