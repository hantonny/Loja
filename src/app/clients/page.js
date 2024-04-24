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
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';


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

export default function Clients() {

  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [idclient, setIdClient] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Busca os clientes armazenados no localStorage
    const storedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(storedClients);
  }, []);

  const handleDeleteClients = (id) => {
    setIdClient(id);
    handleOpen()

  };

  function deleteClient() {
    if (open) {
      // Filtra os clientes, mantendo apenas aqueles que não correspondem ao ID excluído
      const updatedClientes = clients.filter(client => client.id !== idclient);
      // Atualiza o estado com os clientes restantes
      setClients(updatedClientes);
      // Atualiza o localStorage com os clientes restantes
      localStorage.setItem('clients', JSON.stringify(updatedClientes));
      handleClose()
    }
  }




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
            Tem certeza que deseja excluir este cliente?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 2 }}>
            <Button size="small" variant="contained" color="primary" onClick={handleClose}>Cancelar</Button>
            <Button size="small" variant="contained" color="error" onClick={deleteClient}>Excluir</Button>
          </Box>
        </Box>
      </Modal>
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
