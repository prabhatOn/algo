import React from "react";
import { Box, Grid } from "@mui/material";
import ProductPerformances from "../components/ProductPerformances";
import Breadcrumb from "../../../components/layout/full/shared/breadcrumb/Breadcrumb";
  const BCrumb = [
    { to: '/', title: 'Strategies ' },
    { title: 'Strategies Info' },
  ];

const StrategiesData = () => {
  return (
    <Box>
       <Breadcrumb title="Startegies " items={BCrumb}  />
      <Grid container spacing={3}>
     
          <Grid size={12}>
            <ProductPerformances />
          </Grid>

        
        </Grid>
  
    </Box>
  );
};

export default StrategiesData;
