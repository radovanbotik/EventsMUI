import React from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useField } from "formik";

const PasswordInput = ({ label, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [field, meta, helpers] = useField(props);

  return (
    <FormControl>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        {...field}
        {...props}
        type={showPassword ? "text" : "password"}
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
      {meta.touched && Boolean(meta.error) && (
        <FormHelperText
          error
          variant="outlined"
          margin="dense"
          sx={{ ":first-letter": { textTransform: "capitalize" } }}
        >
          {meta.touched && meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordInput;
