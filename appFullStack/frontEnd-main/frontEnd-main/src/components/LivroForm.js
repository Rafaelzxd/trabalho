import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

// Estilos CSS para o componente de formulário
const formStyle = {
  backgroundColor: "#e9f6f7",
  padding: "16px",
  maxWidth: "400px",
  margin: "auto"
};

// Estilo CSS para os botões do formulário
const buttonStyle = {
  marginRight: "8px"
};

// Componente LivroForm responsável por adicionar um novo livro
function AtivForm({ handleAddGame, setShowForm }) {
  // Estado local para armazenar os dados do novo livro
  const [newGame, setNewGame] = useState({ title: "", description: "", taught: ""});

  // Função para atualizar o estado quando os campos do formulário são preenchidos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o recarregamento da página após o envio
    handleAddGame  (newGame); // Chama a função para adicionar um livro
    setNewGame({ title: "", description: "", taught: ""}); // Limpa os campos do formulário
  };

  return (
    <Paper elevation={3} style={formStyle}>
      <Typography variant="h6" gutterBottom>
        Adicionar Livro
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome da atividade"
              name="title"
              value={newGame.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Escola"
              name="description"
              value={newGame.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Professor"
              name="taught"
              value={newGame.taught}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={buttonStyle}
          >
            Adicionar
          </Button>
          <Button onClick={() => setShowForm(false)} style={buttonStyle}>
            Cancelar
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default LivroForm; // Exportação do componente LivroForm
