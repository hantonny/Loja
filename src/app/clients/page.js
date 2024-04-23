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
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Clients() {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Busca os clientes armazenados no localStorage
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(storedClients);
  }, []);

  const handleDeleteClients = (id) => {
    // Filtra os clientes, mantendo apenas aqueles que não correspondem ao ID excluído
    const updatedClientes = clients.filter(client => client.id !== id);
    // Atualiza o estado com os clientes restantes
    setClients(updatedClientes);
    // Atualiza o localStorage com os clientes restantes
    localStorage.setItem('clients', JSON.stringify(updatedClientes));
  };



  return (
    <Container fixed>
      <DrawerRoutes></DrawerRoutes>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
        <Typography variant="h4" component="h2">
          Clientes
        </Typography>
        <Link href="/addClients">
          <Button size="large" variant="contained" color="primary">Novo Cliente</Button>
        </Link>
      </Box>
      {clients.length > 0 ? <Grid container spacing={2}>
        {clients.map((client, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {client.nome}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '10%', marginBottom: 2 }}>
                    <Link href={`/editClients?id=${client.id}`} passHref>
                      <EditIcon color='primary' style={{ cursor: "pointer" }} />
                    </Link>
                    <DeleteIcon color='error' onClick={() => handleDeleteClients(client.id)} style={{ cursor: "pointer" }} />
                  </Box>
                </Box>
                <Typography variant="h6" color="text.secondary">
                  Email:  {client.email}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Telefone: {client.telefone}
                </Typography>
                <Typography variant="h7" color="text.secondary">
                  Endereço: {client.endereco}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> : <Typography variant="h2" align="center" component="h2">
        Sem Clientes
      </Typography>
      }
    </Container>
  );
}
