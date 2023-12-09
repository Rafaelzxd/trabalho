// Importações necessárias do React e de outras bibliotecas
import React, { useState, useEffect } from "react";
import axios from "axios";
import LivroForm from "./components/LivroForm";
import LivroTable from "./components/LivroTable";

import {
  CssBaseline,
  Container,
  Typography,
  AppBar,
  Toolbar
} from "@mui/material";
import API_URL from "./config";

// Estilos CSS para elementos específicos do componente
const appBarStyle = {
  marginBottom: "20px"
};

const pageTitleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "20px"
};

// Componente principal da aplicação
function App() {
  // Estados locais para armazenar a lista de livros e controlar a exibição do formulário
  const [livros, setLivros] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Efeito colateral para buscar a lista de livros ao montar o componente
  useEffect(() => {
    fetchLivros();
  }, []);

  // Função assíncrona para buscar a lista de livros da API
  const fetchLivros = async () => {
    try {
      const response = await axios.get(`${API_URL}/livros`);
      setLivros(response.data);
    } catch (error) {
      console.error("Deu um erro doido aqui - ", error);
    }
  };

  // Função para adicionar um novo livro à coleção
  const handleAddLivro = async (newLivro) => {
    try {
      await axios.post(`${API_URL}/livros`, newLivro);
      fetchLivros(); // Atualiza a lista de livros após a adição
      setShowForm(false); // Fecha o formulário de adição
    } catch (error) {
      console.error("Deu erro aqui zé - ", error);
    }
  };

  // Função para excluir um livro da coleção
  const handleDeleteLivro = async (livroId) => {
    try {
      await axios.delete(`${API_URL}/livros/${livroId}`);
      fetchLivros(); // Atualiza a lista de livros após a exclusão
    } catch (error) {
      console.error("Deu erro de novo uai - ", error);
    }
  };

  // Renderização do componente
  return (
    <div>
      <CssBaseline />
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Typography variant="h6">Biblioteca</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" style={pageTitleStyle}>
          Biblioteca
        </Typography>
        {/* Condicional para renderizar o formulário ou a tabela de livros */}
        {showForm ? (
          <LivroForm handleAddLivro={handleAddLivro} setShowForm={setShowForm} />
        ) : (
          <LivroTable
            livros={livros}
            handleDeleteLivro={handleDeleteLivro}
            setShowForm={setShowForm}
          />
        )}
      </Container>
    </div>
  );
}

export default App; // Exportação do componente principal
