import { openMobileSidebar } from "@/redux/reducers/sidebarReducer";
import { Link, usePage } from "@inertiajs/react";
import {
  Box,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SidebarAccount from "./SidebarAccount";
import SidebarLink from "./SidebarLink";

/**
 * Komponent sidebar content.
 */
export default function SidebarContent() {
  const { menu: menus } = usePage().props.auth;
  const accountRef = useRef(null);
  const dispatch = useDispatch();

  // state
  const [accountHeight, setAccountHeight] = useState(0);

  // update state setAccountHeight
  useEffect(() => {
    setAccountHeight(accountRef.current.clientHeight);
  }, [accountRef, setAccountHeight]);

  // fungsi untuk menutup mobile sidebar
  const handleCloseMobileSidebar = () => {
    dispatch(openMobileSidebar(false));
  };

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
          <ListItem disablePadding sx={{ px: 2 }}>
            <Tooltip title="Dashboard" placement="right" disableInteractive>
              <ListItemButton
                dense
                selected={route().current("dashboard*")}
                component={Link}
                href={route("dashboard")}
                preserveScroll
                onClick={handleCloseMobileSidebar}
                sx={{
                  borderRadius: 2,
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 30,
                    color: route().current("dashboard")
                      ? "secondary.light"
                      : "text.sidebar",
                  }}
                >
                  <Icon fontSize="small">home</Icon>
                </ListItemIcon>

                <ListItemText
                  primary="Dashboard"
                  primaryTypographyProps={{
                    variant: "body2",
                    noWrap: true,
                    component: "div",
                    sx: {
                      fontWeight: 500,
                      color: route().current("dashboard")
                        ? "secondary.light"
                        : "text.sidebar",
                    },
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>

        <Divider variant="middle" sx={{ my: 2 }} />

        {/* Menu yang dimiliki user sesuai hak aksesnya */}
        {menus.map((menu, index) => (
          <Fragment key={menu.id}>
            <List
              subheader={
                <ListSubheader
                  sx={{
                    backgroundColor: "background.sidebar",
                    color: "text.primary",
                    fontWeight: 600,
                    ml: 2,
                  }}
                >
                  {menu.name}
                </ListSubheader>
              }
            >
              {menu.childrens.map((item) => (
                <SidebarLink
                  key={item.route}
                  id={item.id}
                  name={item.name}
                  icon={item.icon}
                  uri={item.uri}
                  route={item.route}
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
