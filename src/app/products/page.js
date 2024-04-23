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
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Busca os produtos armazenados no localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleDeleteProduct = (id) => {
    // Filtra os produtos, mantendo apenas aqueles que não correspondem ao ID excluído
    const updatedProducts = products.filter(product => product.id !== id);
    // Atualiza o estado com os produtos restantes
    setProducts(updatedProducts);
    // Atualiza o localStorage com os produtos restantes
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };





  return (
    <Container fixed>
      <DrawerRoutes></DrawerRoutes>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
        <Typography variant="h4" component="h2">
          Produtos
        </Typography>
        <Link href="/addProducts">
          <Button size="large" variant="contained" color="primary">Novo Produto</Button>
        </Link>
      </Box>
      {products.length > 0 ? <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 200 }}
                image={product.urlImagem}
                title={product.nome}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.nome}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '10%', marginBottom: 2 }}>
                    <Link href={`/editProducts?id=${product.id}`} passHref>
                      <EditIcon color='primary' style={{ cursor: "pointer" }} />
                    </Link>
                    <DeleteIcon color='error' onClick={() => handleDeleteProduct(product.id)} style={{ cursor: "pointer" }} />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {product.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Button size="small" variant="contained" color="success">Comprar</Button>
                  <Typography variant="h5" component="h2">
                    R$ {product.preco}
                  </Typography>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> : <Typography variant="h2" align="center" component="h2">
        Sem produtos
      </Typography>
      }

    </Container>
  );
}
