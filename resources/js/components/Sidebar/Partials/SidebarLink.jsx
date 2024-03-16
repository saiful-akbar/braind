import { openMobileSidebar } from "@/redux/reducers/sidebarReducer";
import { Link } from "@inertiajs/react";
import CircleIcon from "@mui/icons-material/Circle";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen sidebar link
 *
 * @param {} props
 * @returns {React.ReactElement}
 */
const SidebarLink = (props) => {
  const { name, icon, url, route: routeName, ...rest } = props;
  const dispatch = useDispatch();

  /**
   * fungsi untuk menutup mobile sidebar
   */
  const handleCloseMobileSidebar = () => {
    dispatch(openMobileSidebar(false));
  };

  /**
   * fungsi untuk menandakan apakah link aktif atau tidak.
   *
   * @param {string} routeName
   * @returns {string}
   */
  const isActive = (routeName) => route().current(`${routeName}*`);

  return (
    <ListItem disablePadding sx={{ px: 2 }} {...rest}>
      <Tooltip title={name} placement="right" disableInteractive>
        <ListItemButton
          dense
          component={Link}
          href={url}
          preserveScroll
          onClick={handleCloseMobileSidebar}
          sx={{
            borderRadius: 2,
            backgroundColor: isActive(routeName)
              ? "rgba(0, 167, 111, 0.08)"
              : "none",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 25,
              color: (theme) => {
                if (!isActive(routeName)) return "text.secondary";
                return theme.palette.mode === "light"
                  ? "secondary.main"
                  : "secondary.light";
              },
            }}
          >
            <CircleIcon
              sx={{
                fontSize: isActive(routeName) ? 10 : 5,
                ml: isActive(routeName) ? -0.3 : 0,
              }}
            />
          </ListItemIcon>

          <ListItemText
            primary={name}
            primaryTypographyProps={{
              variant: "body2",
              noWrap: true,
              component: "div",
              sx: {
                display: "block",
                fontWeight: isActive(routeName) ? 700 : 500,
                color: (theme) => {
                  if (!isActive(routeName)) return "text.secondary";
                  return theme.palette.mode === "light"
                    ? "secondary.main"
                    : "secondary.light";
                },
              },
            }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

SidebarLink.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, () => null]),
};

SidebarLink.defaultProps = {
  icon: null,
};

export default SidebarLink;
