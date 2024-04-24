"use client"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import DrawerRoutes from '../components/drawerRoutes';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function AddProducts() {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('none')
  const [alertError, setAlertError] = useState('none')

  // Funções para atualizar o estado quando o usuário digitar nos campos
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
      // Verifica se os campos estão vazios
      if (!nome || !descricao || !preco || !urlImagem) {
        setAlertError("flex")
        setAlertSuccess("none")
        return;
      }
      event.preventDefault();

      // Cria um novo objeto representando o produto
      const newProduct = {
        id: uuidv4(),
        nome: nome,
        descricao: descricao,
        preco: preco,
        urlImagem: urlImagem
      };

      // Obtém os produtos existentes do localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

      // Adiciona o novo produto ao array de produtos existentes
      const updatedProducts = [...existingProducts, newProduct];

      // Salva o array de produtos atualizado no localStorage
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // Limpa os campos após o envio
      setNome('');
      setDescricao('');
      setPreco('');
      setUrlImagem('');
      setAlertSuccess("flex")
      setAlertError("none")
    } catch (error) {
      setAlertError("flex")
      setAlertSuccess("none")
    }

  };


  return (
    <Container fixed>
      <DrawerRoutes></DrawerRoutes>
      <Alert variant="filled" severity="success" style={{ display: alertSuccess }}>
        Produto cadastrado com sucesso!
      </Alert>
      <Alert variant="filled" severity="error" style={{ display: alertError }}>
        Erro ao cadastrar produto!
      </Alert>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2, marginTop: 10 }}>
        <Typography variant="h4" component="h2">
          Adicionar Produtos
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
          Salvar
        </Button>
      </Box>



    </Container >
  );
}
