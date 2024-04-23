"use client"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DrawerRoutes from '../components/drawerRoutes';


export default function Clients() {
  return (
    <Container fixed>
      <DrawerRoutes></DrawerRoutes>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
        <Typography variant="h4" component="h2">
          Clientes
        </Typography>
        <Button size="small" variant="contained" color="primary">Novo Cliente</Button>
      </Box>
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 0 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    PC Gamer
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '10%', marginBottom: 2 }}>
                    <EditIcon color='primary' />
                    <DeleteIcon color='error' />
                  </Box>
                </Box>
                <Typography variant="h6" color="text.secondary">
                  Email:
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Telefone:
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Endereço:
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
