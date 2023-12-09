import { openMobileSidebar } from "@/redux/reducers/sidebarReducer";
import { Link } from "@inertiajs/react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Icon,
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
  const { id, name, icon, uri, route: routeName, ...rest } = props;
  const dispatch = useDispatch();

  // fungsi untuk menutup mobile sidebar
  const handleCloseMobileSidebar = () => {
    dispatch(openMobileSidebar(false));
  };

  return (
    <ListItem disablePadding sx={{ px: 2 }} {...rest}>
      <Tooltip title={name} placement="right" disableInteractive>
        <ListItemButton
          dense
          selected={route().current(`${routeName}*`)}
          component={Link}
          href={route(routeName)}
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
              color: route().current(`${routeName}*`)
                ? "secondary.light"
                : "text.sidebar",
            }}
          >
            {icon === null ? (
              <KeyboardArrowRightIcon fontSize="small" />
            ) : (
              <Icon fontSize="small">{icon}</Icon>
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            primaryTypographyProps={{
              variant: "body2",
              noWrap: true,
              component: "div",
              sx: {
                display: "block",
                fontWeight: 500,
                color: route().current(`${routeName}*`)
                  ? "secondary.light"
                  : "text.sidebar",
              },
            }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

SidebarLink.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string.isRequired]),
};

export default SidebarLink;
