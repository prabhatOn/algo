
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Switch,
  FormControlLabel,
  Tooltip,
  Grid,
  InputAdornment,
} from '@mui/material';
import {
  Person as PersonIcon,
  Badge as BadgeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  WorkspacePremium as PlanIcon,
} from '@mui/icons-material';

const EMPTY_USER = {
  username: '',
  fullname: '',
  email: '',
  phone: '',
  plan: 'Free',
  password: '',
  confirm: '',
};

export default function AddUserDialog({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_USER);

  const handle = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const resetAndClose = () => {
    setForm(EMPTY_USER);
    onClose();
  };

  const isValid =
    form.username &&
    form.fullname &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.password &&
    form.password === form.confirm;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(form);
    resetAndClose();
  };

  return (
    <Dialog open={open} onClose={resetAndClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Add New User</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} mt={0.5}>
          {/* Username */}
          <Grid size={{xs:12,md:12}}>
            <TextField
              fullWidth
              label="Username"
              value={form.username}
              onChange={handle('username')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Full name */}
          <Grid size={{xs:12,md:12}}>
            <TextField
              fullWidth
              label="Full name"
              value={form.fullname}
              onChange={handle('fullname')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Email */}
          <Grid size={{xs:12,md:12}}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={form.email}
              onChange={handle('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Contact */}
          <Grid size={{xs:12,md:12}}>
            <TextField
              fullWidth
              label="Contact"
              value={form.phone}
              onChange={handle('phone')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Plan */}
 
          {/* Password */}
          <Grid size={{xs:12,md:12}}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={form.password}
              onChange={handle('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Confirm Password */}
          <Grid size={{xs:12,md:12}}>
            <TextField
              fullWidth
              type="password"
              label="Confirm password"
              value={form.confirm}
              onChange={handle('confirm')}
              error={form.confirm && form.password !== form.confirm}
              helperText={
                form.confirm && form.password !== form.confirm
                  ? 'Passwords do not match'
                  : ''
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
         <Grid size={{xs:12,md:12}}>
            <TextField
              fullWidth
              select
              label="Plan"
              value={form.plan}
              onChange={handle('plan')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlanIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            >
              {['Free', 'Pro', 'Enterprise'].map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Status (fixed) */}
          <Grid size={{xs:12,md:12}}>
            <Tooltip title="Status is fixed to Active on creation">
              <FormControlLabel
                control={<Switch checked disabled color="success" />}
                label="Active"
              />
            </Tooltip>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={resetAndClose}>Cancel</Button>
        <Button variant="contained" disabled={!isValid} onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
