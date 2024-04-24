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
import Modal from '@mui/material/Modal';
import DrawerRoutes from '../components/drawerRoutes';
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Products() {

  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [idproduct, setIdproduct] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Busca os produtos armazenados no localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleDeleteProduct = (id) => {
    setIdproduct(id)
    handleOpen();
  };

  function deleteProduct() {
    if (open) {
      // Filtra os produtos, mantendo apenas aqueles que não correspondem ao ID excluído
      const updatedProducts = products.filter(product => product.id !== idproduct);
      // Atualiza o estado com os produtos restantes
      setProducts(updatedProducts);
      // Atualiza o localStorage com os produtos restantes
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      handleClose()
    }
  }


  const handleBuyProduct = (id) => {
    if (id) {
      // Função para buscar o produto pelo ID no LocalStorage
      const getProductById = (productId) => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const foundProduct = storedProducts.find(product => product.id === productId);
        if (foundProduct) {
          // Obtém os produtos existentes do localStorage
          const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

          // Verifica se o produto já existe nas orders
          const existingOrderIndex = existingOrders.findIndex(ordem => ordem.id_produto === foundProduct.id);

          if (existingOrderIndex !== -1) {
            // Produto já existe, aumenta a quantidade
            existingOrders[existingOrderIndex].quantidade += 1;
          } else {
            // Cria um novo objeto representando o produto, pois não existe nas orders
            const newOrdem = {
              id: uuidv4(),
              id_produto: foundProduct.id,
              nome: foundProduct.nome,
              descricao: foundProduct.descricao,
              preco: foundProduct.preco,
              quantidade: 1,
            };
            // Adiciona o novo produto ao array de produtos existentes
            existingOrders.push(newOrdem);
          }

          // Salva o array de produtos atualizado no localStorage
          localStorage.setItem('orders', JSON.stringify(existingOrders));
        }
      };

      getProductById(id);
    }
  };

  return (

    <Container fixed>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="text.primary">
            Tem certeza que deseja excluir este produto?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 2 }}>

            <Button size="small" variant="contained" color="primary" onClick={handleClose}>Cancelar</Button>


            <Button size="small" variant="contained" color="error" onClick={deleteProduct}>Excluir</Button>

          </Box>
        </Box>
      </Modal>
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
                  <Button size="small" variant="contained" onClick={() => handleBuyProduct(product.id)} color="success"><ShoppingCartIcon /> Comprar</Button>
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
