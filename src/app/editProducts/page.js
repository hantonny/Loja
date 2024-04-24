"use client"

import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import DrawerRoutes from '../components/drawerRoutes';
import Alert from '@mui/material/Alert';

export default function EditProducts() {

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [urlImagem, setUrlImagem] = useState('');

  const [alertSuccess, setAlertSuccess] = useState('none')
  const [alertError, setAlertError] = useState('none')

  useEffect(() => {

    const getQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      return queryParams.get('id');
    };

    const idFromUrl = getQueryParams();
    if (idFromUrl) {
      setId(idFromUrl);
      if (id) {
        // Função para buscar o produto pelo ID no LocalStorage
        const getProductById = (productId) => {
          const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
          const foundProduct = storedProducts.find(product => product.id === productId);
          if (foundProduct) {
            setNome(foundProduct.nome);
            setDescricao(foundProduct.descricao);
            setPreco(foundProduct.preco);
            setUrlImagem(foundProduct.urlImagem);
          }
        };

        getProductById(id);
      }
    }

  }, [id]);

  // Funções de manipulação de estado dos campos de entrada
  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handlePrecoChange = (event) => {
    setPreco(event.target.value);
  };

  const handleUrlImagemChange = (event) => {
    setUrlImagem(event.target.value);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    try {
      event.preventDefault();

      // Verifica se os campos estão vazios
      if (!nome || !descricao || !preco || !urlImagem) {
        setAlertError("flex")
        setAlertSuccess("none")
        return;
      }

      const newProduct = {
        id: id,
        nome: nome,
        descricao: descricao,
        preco: preco,
        urlImagem: urlImagem
      };

      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = [...existingProducts.filter(product => product.id !== id), newProduct];

      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setAlertSuccess("flex")
      setAlertError("none")
    } catch (error) {
      setAlertError("flex")
      setAlertSuccess("none")
    }



  };

  return (
    <Container fixed>
      <DrawerRoutes />
      <Alert variant="filled" severity="success" style={{ display: alertSuccess }}>
        Produto editado com sucesso!
      </Alert>
      <Alert variant="filled" severity="error" style={{ display: alertError }}>
        Erro ao editar produto!
      </Alert>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2, marginTop: 10 }}>
        <Typography variant="h4" component="h2">
          Editar Produto
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        style={{ backgroundColor: "#FFF", padding: 20 }}
      >
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          value={nome}
          onChange={handleNomeChange}
        />
        <TextField
          id="descricao"
          label="Descrição"
          variant="outlined"
          value={descricao}
          onChange={handleDescricaoChange}
        />
        <TextField
          id="preco"
          label="Preço"
          variant="outlined"
          value={preco}
          onChange={handlePrecoChange}
        />
        <TextField
          id="urlImagem"
          label="URL Imagem"
          variant="outlined"
          value={urlImagem}
          onChange={handleUrlImagemChange}
        />
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
}
