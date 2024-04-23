"use client"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DrawerRoutes from '../components/drawerRoutes';


export default function Orders() {

  return (

    <Container fixed>
      <DrawerRoutes></DrawerRoutes>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
        <Typography variant="h4" component="h2">
          Pedidos
        </Typography>
        <Button size="small" variant="contained" color="primary">Novo Produto</Button>
      </Box>

      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="https://static.wixstatic.com/media/047045_dfe9c0b1b8544e999653b272ff43a960~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BRANCO_05.png"
                title="green iguana"
              />
              <CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    PC Gamer
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '10%', marginBottom: 2 }}>
                    <EditIcon color='primary' />
                    <DeleteIcon color='error' />
                  </Box>
                </Box>


                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Button size="small" variant="contained" color="success">Comprar</Button>
                  <Typography variant="h5" component="h2">
                    R$ 444,00
                  </Typography>

                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>


  );
}
