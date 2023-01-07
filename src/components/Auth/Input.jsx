import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';

const Input = ({name, handleChange, half, label, autoFocus, handleShowPassword, type,value }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField 
          name={name}
          onChange={handleChange}
          variant="outlined"
          value={value}
          required
          fullWidth
          label={label}
          autoFocus={autoFocus}
          type={type}
          InputProps={name === 'password' ?{
            endAdornment:(
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === "password" ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
            )
          } :null}
        />
    </Grid>
  )
}

export default Input