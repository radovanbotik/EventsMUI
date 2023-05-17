import React from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useField } from "formik";

const PasswordInput = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const [field, meta, helpers] = useField(props);

  return (
    <FormControl variant="outlined" margin="dense">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        {...field}
        {...props}
        type={showPassword ? "text" : "password"}
        // helperText={meta.touched && meta.error}
        error={meta.touched && Boolean(meta.error)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {meta.touched && Boolean(meta.error) && <Typography color="error">{meta.touched && meta.error}</Typography>}
    </FormControl>
  );
};

export default PasswordInput;
