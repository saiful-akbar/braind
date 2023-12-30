import { openSettings } from "@/redux/reducers/settingsReducer";
import { openMobileSidebar } from "@/redux/reducers/sidebarReducer";
import { usePage } from "@inertiajs/react";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { forwardRef, useRef, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Komponen partials sidebar account
 */
const SidebarAccount = forwardRef((props, ref) => {
  const { ...rest } = props;
  const { app, auth } = usePage().props;
  const { user } = auth;
  const logoutRef = useRef(null);
  const dispatch = useDispatch();

  // state
  const [anchorEl, setAnchorEl] = useState(null);

  // Fungsi untuk membuka popover
  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // fungsi untuk menutup popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // fungsi untuk logout
  const handleLogout = () => {
    setAnchorEl(null);
    logoutRef.current.submit();
  };

  // fungsi untuk membuka dialog settings
  const handleOpenSettings = () => {
    setAnchorEl(null);
    dispatch(openMobileSidebar(false));
    dispatch(openSettings(true));
  };

  return (
    <Box
      {...rest}
      ref={ref}
      sx={{
        width: "100%",
        px: 3,
        py: 2,
      }}
    >
      <ButtonBase
        onClick={handleOpenPopover}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: 2,
          p: 1,
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "hidden",
            mr: 1.5,
          }}
        >
          <Avatar
            src={user.foto}
            sx={{
              mr: 1.5,
              width: 30,
              height: 30,
            }}
          />

          <Typography variant="subtitle2" component="div" noWrap>
            {user.nama_lengkap}
          </Typography>
        </Box>

        <div>
          <MoreHorizIcon />
        </div>
      </ButtonBase>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              backgroundImage: "none",
              backgroundColor: "background.paper",
              width: 210,
              borderRadius: "8px",
            },
          },
        }}
      >
        <MenuList dense>
          <MenuItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>Profil</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleOpenSettings}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Pengaturan</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>

      <form ref={logoutRef} action={route("logout")} method="post">
        <input type="hidden" name="_method" value="delete" />
        <input type="hidden" name="_token" value={app.csrf} />
      </form>
    </Box>
  );
});

export default SidebarAccount;
