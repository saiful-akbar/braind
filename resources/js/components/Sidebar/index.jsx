import { openMobileSidebar } from "@/redux/reducers/sidebarReducer";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import SidebarContent from "./Partials/SidebarContent";

/**
 * Komponen sidebar
 */
function Sidebar() {
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  /**
   * fungsi untuk menutup sidebar mobile
   */
  const handleClose = () => {
    dispatch(openMobileSidebar(false));
  };

  return (
    <Box
      component="aside"
      sx={{
        width: {
          sm: sidebar.width,
        },
        flexShrink: {
          sm: 0,
        },
      }}
    >
      {/* Sidebar untuk desktop */}
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          elevation: 0,
          sx: {
            width: sidebar.width,
            boxSizing: "border-box",
            backgroundColor: "background.default",
            zIndex: 0,
            borderRadius: 0,
            borderRightStyle: "dashed",
          },
        }}
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Sidebar untuk mobile. */}
      <Drawer
        variant="temporary"
        open={sidebar.mobile.open}
        onClose={handleClose}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            boxSizing: "border-box",
            width: sidebar.width,
            border: 0,
            borderRadius: 0,
            backgroundColor: "background.default",
          },
        }}
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
}

export default Sidebar;
