import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { strategyService } from '../../../services/strategyService';
import Loader from '../../../components/common/Loader';

export default function CreateStrategy() {
  const [form, setForm] = useState({ name: '', segment: '', capital: '', symbol: '', legs: 1, description: '', type: 'Private' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const payload = { ...form, capital: Number(form.capital), legs: Number(form.legs) };
      const res = await strategyService.createStrategy(payload);
      if (res.success) {
        navigate('/user/marketplace');
      } else {
        setError(res.error || res.message || 'Failed to create');
      }
    } catch (err) {
      console.error(err);
      setError('Error creating strategy');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Create Strategy</Typography>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <TextField label="Name" value={form.name} onChange={handleChange('name')} />
        <TextField label="Segment" value={form.segment} onChange={handleChange('segment')} />
        <TextField label="Capital" value={form.capital} onChange={handleChange('capital')} />
        <TextField label="Symbol" value={form.symbol} onChange={handleChange('symbol')} />
        <TextField label="Legs" type='number' value={form.legs} onChange={handleChange('legs')} />
        <TextField label="Type" select value={form.type} onChange={handleChange('type')}>
          <MenuItem value="Private">Private</MenuItem>
          <MenuItem value="Public">Public</MenuItem>
        </TextField>
        <TextField label="Description" multiline rows={4} value={form.description} onChange={handleChange('description')} />

        {error && <Typography color="error">{error}</Typography>}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>Create</Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
      </Box>
      {loading && <Loader message="Creating strategy..." />}
    </Box>
  );
}
