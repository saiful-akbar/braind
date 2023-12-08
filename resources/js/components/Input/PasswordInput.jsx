import React from "react";
import PropType from "prop-types";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
} from "@mui/material";

/**
 * Komponen password input
 */
const PasswordInput = React.memo(({ disabled, ...rest }) => {
  const [show, setShow] = React.useState(false);

  /**
   * Fungsi untuk mengatasi ketika
   * button toggle password diklik
   */
  const handleClick = (event) => {
  	setShow((prevState) => !prevState);
  }

  return (
    <TextField
			{...rest}
			type={show ? "text" : "password"}
			disabled={disabled}
			InputProps={{
				sx: {
					backgroundColor: "background.paper"
				},
				endAdornment: (
					<InputAdornment position="end">
						<Tooltip title={show ? "Hide password" : "Show password"}>
							<IconButton
								onClick={handleClick}
								disabled={disabled}
								sx={{
									color: "text.secondary",
									"&:hover": {
										color: "text.primary"
									}
								}}
							>
								{show ? <VisibilityIcon /> : <VisibilityOffIcon />}
							</IconButton>
						</Tooltip>
					</InputAdornment>
				)
			}}
		/>
	)
});

/**
 * Prop types
 */
PasswordInput.propTypes = {
	disabled: PropType.bool,
};

/**
 * Default props
 */
PasswordInput.defaultProps = {
	disabled: false,
};

export default PasswordInput;
