import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    // border: '1px solid #d3d4d5',
    width: 300,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default StyledMenu;
