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


export default function AddClients() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const [alertSuccess, setAlertSuccess] = useState('none')
  const [alertError, setAlertError] = useState('none')

  // Funções para atualizar o estado quando o usuário digitar nos campos
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


  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    try {
      // Verifica se os campos estão vazios
      if (!nome || !email || !telefone || !endereco) {
        setAlertError("flex")
        setAlertSuccess("none")
        return;
      }
      event.preventDefault();

      // Cria um novo objeto representando o cliente
      const newClient = {
        id: uuidv4(),
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco
      };

      // Obtém os clientes existentes do localStorage
      const existingClients = JSON.parse(localStorage.getItem('clients')) || [];

      // Adiciona o novo cliente ao array de clientes existentes
      const updatedClients = [...existingClients, newClient];

      // Salva o array de clientes atualizado no localStorage
      localStorage.setItem('clients', JSON.stringify(updatedClients));

      // Limpa os campos após o envio
      setNome('');
      setEmail('');
      setTelefone('');
      setEndereco('');
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
        Cliente cadastrado com sucesso!
      </Alert>
      <Alert variant="filled" severity="error" style={{ display: alertError }}>
        Erro ao cadastrar cliente!
      </Alert>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2, marginTop: 10 }}>
        <Typography variant="h4" component="h2">
          Adicionar Clientes
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
