import React from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Breadcrumb from '../../../components/layout/full/shared/breadcrumb/Breadcrumb';
import ApiCards from '../components/AdminApiCards';
import ApiTable from '../components/AdminApiTable';


const AdminApi = () => {
  return (
    <Box>
         <Breadcrumb title="API "  />
      <Grid container spacing={3}>
        <Grid size={12}>
          <ApiCards />
        </Grid>
        <Grid size={{ xs: 12, lg: 12}}>
          <ApiTable/>
        </Grid> 
      </Grid> 
   
    </Box>
  );
};


export default AdminApi;