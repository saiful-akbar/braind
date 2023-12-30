import { usePage } from "@inertiajs/react";
import { Box, Divider, List, ListSubheader } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import SidebarAccount from "./SidebarAccount";
import SidebarLink from "./SidebarLink";

/**
 * Komponent sidebar content.
 */
export default function SidebarContent() {
  const { menu: menus } = usePage().props.auth;
  const accountRef = useRef(null);

  // state
  const [accountHeight, setAccountHeight] = useState(0);

  // update state setAccountHeight
  useEffect(() => {
    setAccountHeight(accountRef.current.clientHeight);
  }, [accountRef, setAccountHeight]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflowY: "hidden",
      }}
    >
      {/* Main manu */}
      <Box
        component="nav"
        sx={{
          height: `calc(100vh - ${accountHeight}px)`,
          width: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          pb: 2,
          mt: 2,
        }}
      >
        {/* Dashboard */}
        <List>
          <SidebarLink
            name="Dashboard"
            icon="home"
            url={route("dashboard")}
            route="dashboard"
          />
        </List>

        <Divider variant="middle" sx={{ my: 2 }} />

        {/* Menu yang dimiliki user sesuai hak aksesnya */}
        {menus.map((menu, index) => (
          <Fragment key={menu.id}>
            <List
              subheader={
                <ListSubheader
                  sx={{
                    color: "text.primary",
                    fontWeight: 600,
                    ml: 2,
                    backgroundColor: "inherit",
                  }}
                >
                  {menu.nama}
                </ListSubheader>
              }
            >
              {menu.sub_menu.map((subMenu) => (
                <SidebarLink
                  key={subMenu.route}
                  name={subMenu.nama}
                  icon={subMenu.icon}
                  url={subMenu.url}
                  route={subMenu.route}
                />
              ))}
            </List>

            {Boolean(index < menus.length - 1) && (
              <Divider variant="middle" sx={{ my: 2 }} />
            )}
          </Fragment>
        ))}
      </Box>

      <SidebarAccount ref={accountRef} />
    </Box>
  );
}
