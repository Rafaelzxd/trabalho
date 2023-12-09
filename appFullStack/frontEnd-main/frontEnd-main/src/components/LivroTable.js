// Importações necessárias do React e do Material-UI
import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


// Estilos CSS para elementos específicos do componente
const tableStyle = {
  backgroundColor: "#d3f5e5",
  minWidth: 650,
  margin: "auto",
  marginTop: "20px"
};

const headerCellStyle = {
  backgroundColor: "#7ee696",//"#f5f5f5",
  fontWeight: "bold"
};

// Componente AtivTable
function AtivTable({ games, handleDeleteGame, setShowForm}) {
  // Estados locais para controlar a abertura e o fechamento do diálogo de confirmação
  const [openDialog, setOpenDialog] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);

  // Função para confirmar a exclusão de um jogo
  const handleConfirmDelete = () => {
    if (gameToDelete) {
      handleDeleteGame(gameToDelete.id);
      setGameToDelete(null);
    }
    setOpenDialog(false); // Fecha o diálogo de confirmação
  };

  // Função para abrir o diálogo de confirmação antes de excluir um jogo
  const handleOpenDialog = (game) => {
    setGameToDelete(game);
    setOpenDialog(true);
  };


  return (
    <div>
      {/* Cabeçalho da tabela */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Lista das Atividades</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setShowForm(true)}>
          Adicionar Tarefa
        </Button>
      </Box>

      {/* Tabela de jogos */}
      <TableContainer component={Paper} style={tableStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle} align="center">
                Nome da Atividade
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Escola
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Professor
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Apagar Item
              </TableCell>
              <TableCell style={headerCellStyle} align="center">
                Editar Item
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.length === 0 ? ( // Verifica se a lista de jogos está vazia
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="subtitle1">
                    Não possui livros no momento.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              // Mapeia e exibe os jogos na tabela
              games.map((game) => (
                <TableRow key={game.id}>
                  <TableCell align="center">{game.title}</TableCell>
                  <TableCell align="center">{game.description}</TableCell>
                  <TableCell align="center">{game.taught}</TableCell>
                  <TableCell align="center">
                    {/* Botão para excluir um jogo */}
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenDialog(game)}
                    >
                      Excluir
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    {/* Botão para editar um jogo */}
                    <Button
                      variant="outlined"
                      color="info"
                      startIcon={<EditIcon />}
                      //onClick={() => handleEdit(game)}
                      >
                      Editar
                    </Button>

                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmação para excluir um jogo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza de que deseja excluir o livro "{gameToDelete?.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LivroTable; // Exportação do componente LivroTable
