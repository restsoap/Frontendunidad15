import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import PersonasPage from './personas';
import React, { useState } from "react";
import DoctoresPage from './doctores';
import CitasPage from './citaMedica';

export default function Home() {
  const [showPersonasPage, setShowPersonasPage] = useState(false);
  const [showDoctoresPage, setShowDoctoresPage] = useState(false);
  const [showCitasPage, setShowCitasPage] = useState(false);

  // Funcion para cambiar el estado
  const handleShowPersonasPage = () => {
    setShowPersonasPage(true);
    setShowDoctoresPage(false); 
    setShowCitasPage(false);
  };

  const handleShowDoctoresPage = () => {
    setShowDoctoresPage(true);
    setShowPersonasPage(false);
    setShowCitasPage(false);
  };

  const handleShowCitasPage = () => {
    setShowCitasPage(true);
    setShowDoctoresPage(false);
    setShowPersonasPage(false);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Hospitales
          </Typography>
          <Button color="inherit" onClick={handleShowPersonasPage}>
            Personas
          </Button>
          <Button color="inherit" onClick={handleShowDoctoresPage}>
            Doctores
          </Button>
          <Button color="inherit" onClick={handleShowCitasPage}>
            Citas Medicas
          </Button>
        </Toolbar>
      </AppBar>
      {/* 
      <Component {...pageProps} /> */}
      {showPersonasPage && <PersonasPage />}
      {showDoctoresPage && <DoctoresPage />}
      {showCitasPage && <CitasPage />}
    </div>
  );
}
