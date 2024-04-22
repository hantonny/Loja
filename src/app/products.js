"use client"
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StoreIcon from '@mui/icons-material/Store';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Products() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const items = [
    { label: 'Produtos', icon: <StoreIcon /> },
    { label: 'Clientes', icon: <SwitchAccountIcon /> },
    { label: 'Pedidos', icon: <AddShoppingCartIcon /> }
  ];


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {items.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );



  return (
    <>

      <Container fixed>
        <div>
          <Button variant="contained" onClick={toggleDrawer(true)} style={{ margin: 20, marginLeft: 0 }}>Menu</Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
          <Typography variant="h4" component="h2">
            Produtos
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
    </>

  );
}
