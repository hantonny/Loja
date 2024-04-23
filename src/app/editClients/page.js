"use client"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DrawerRoutes from '../components/drawerRoutes';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

export default function EditClients() {

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {

    const getQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      return queryParams.get('id');
    };

    const idFromUrl = getQueryParams();
    if (idFromUrl) {
      setId(idFromUrl);
      if (id) {
        // Função para buscar o cliente pelo ID no LocalStorage
        const getClientById = (clientId) => {
          const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
          const foundClient = storedClients.find(client => client.id === clientId);
          if (foundClient) {
            setNome(foundClient.nome);
            setEmail(foundClient.email);
            setTelefone(foundClient.telefone);
            setEndereco(foundClient.endereco);
          }
        };

        getClientById(id);
      }
    }

  }, [id]);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefone(event.target.value);
  };

  const handleEnderecoChange = (event) => {
    setEndereco(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nome || !email || !telefone || !endereco) {
      return;
    }

    const updatedClient = {
      id: id,
      nome: nome,
      email: email,
      telefone: telefone,
      endereco: endereco
    };


    const existingClients = JSON.parse(localStorage.getItem('clients')) || [];
    const updatedClients = [...existingClients.filter(client => client.id !== id), updatedClient];

    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  return (
    <Container fixed>
      <DrawerRoutes />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2, marginTop: 10 }}>
        <Typography variant="h4" component="h2">
          Editar Cliente
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
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          id="telefone"
          label="Telefone"
          variant="outlined"
          value={telefone}
          onChange={handleTelefoneChange}
        />
        <TextField
          id="endereco"
          label="Endereço"
          variant="outlined"
          value={endereco}
          onChange={handleEnderecoChange}
        />
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </Container >
  );
}
