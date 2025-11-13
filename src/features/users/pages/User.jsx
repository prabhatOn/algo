import React from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Cards from '../components/Cards'
import UserTable from '../components/userTable';
import Breadcrumb from '../../../components/layout/full/shared/breadcrumb/Breadcrumb';

  const BCrumb = [
    { to: '/dashboard/user', title: 'User' },
    { title: 'User Data' },
  ];
 

const User = () => {
  return (
    <Box>
         <Breadcrumb title=" Add User "   items={BCrumb}/>
      <Grid container spacing={3}>
        {/* column */}
        <Grid size={12}>
          <Cards />
        </Grid>
        {/* column */}
        <Grid size={{ xs: 12, lg: 12}}>
          <UserTable />
        </Grid>
      
      </Grid> 
   
    </Box>
  );
};


export default User;