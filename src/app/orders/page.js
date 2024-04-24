"use client"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DrawerRoutes from '../components/drawerRoutes';
import { TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';

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


export default function Orders() {


  const [orders, setOrders] = useState([]);

  const [editOrderId, setEditOrderId] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');

  const [open, setOpen] = useState(false);
  const [idOrdem, setIdOrdem] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Busca os pedidos armazenados no localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);


  const handleEdit = (order) => {
    setEditOrderId(order.id);
    setEditQuantity(order.quantidade);
  };

  const handleChangeQuantity = (event) => {
    setEditQuantity(event.target.value);
  };

  const handleSave = (id) => {
    // Atualiza o array de ordens com a nova quantidade para o pedido especificado
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, quantidade: editQuantity } : order
    );

    // Atualiza o estado das ordens com o novo array de ordens
    setOrders(updatedOrders);

    // Limpa o estado de edição
    setEditOrderId(null);

    // Converte o array atualizado de ordens para uma string JSON e salva no localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };


  const handleDeleteOrdem = (id) => {
    setIdOrdem(id)
    handleOpen()
  };

  function deleteOrdem() {
    if (open) {
      // Filtra os pedidos, mantendo apenas aqueles que não correspondem ao ID excluído
      const updatedOrder = orders.filter(order => order.id !== idOrdem);
      // Atualiza o estado com os pedidos restantes
      setOrders(updatedOrder);
      // Atualiza o localStorage com os pedidos restantes
      localStorage.setItem('orders', JSON.stringify(updatedOrder));
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
            Tem certeza que deseja excluir este pedido?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 2 }}>

            <Button size="small" variant="contained" color="primary" onClick={handleClose}>Cancelar</Button>


            <Button size="small" variant="contained" color="error" onClick={deleteOrdem}>Excluir</Button>

          </Box>
        </Box>
      </Modal>
      <DrawerRoutes></DrawerRoutes>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '98%', marginBottom: 2 }}>
        <Typography variant="h4" component="h2">
          Pedidos
        </Typography>
      </Box>
      {orders.length > 0 ? <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>

              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center" colSpan={2}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nome}
                </TableCell>

                <TableCell align="center">{row.preco}</TableCell>
                <TableCell align="center"> {editOrderId === row.id ? (
                  <TextField
                    value={editQuantity}
                    onChange={handleChangeQuantity}
                    type="number"
                    size="small"
                  />
                ) : (
                  row.quantidade
                )}</TableCell>
                <TableCell align="center">{(parseInt(row.quantidade) * parseFloat(row.preco)).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 2 }}>

                    {editOrderId === row.id ? (
                      <CheckIcon color="primary" style={{ cursor: 'pointer' }} onClick={() => handleSave(row.id)} />
                    ) : (
                      <EditIcon color="primary" style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)} />
                    )}

                    <DeleteIcon color='error' onClick={() => handleDeleteOrdem(row.id)} style={{ cursor: "pointer" }} />
                  </Box>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : <Typography variant="h2" align="center" component="h2">
        Sem Pedidos
      </Typography>}

    </Container>


  );
}
