import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)({
  position: "fixed",
  boxShadow: "none",
  backgroundColor: "#ffffff",
  color: "inherit",
});

export const Header = () => {
  return (
    <StyledAppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <DragHandleRoundedIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};
