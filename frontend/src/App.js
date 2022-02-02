import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import TodoList from './components/TodoList';

import './css/style.css';

function App() {

  return (
    <Container maxWidth='sm'>
      <Box sx={{ bgcolor: "#d4f5fc", paddingTop: 5 }}>
        <Box sx={{ textAlign: 'center' }}>
          <h1>My startup progress</h1>
        </Box>
        <TodoList />
      </Box>
    </Container>
  );
}

export default App;
