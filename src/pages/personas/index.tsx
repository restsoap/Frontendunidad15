import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
} from "@mui/material";
import RegistroForm from "./RegistroForm";

interface Persona {
  id: {
    timestamp: number;
    date: number;
  };
  nombre: string;
  apellido: string;
  cedula: string;
  edad: number;
  telefono: string;
}

function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [showRegistroForm, setShowRegistroForm] = useState(false);

  const handleShowRegistroForm = () => {
    setShowRegistroForm(true);
  };

  const handleCloseRegistroForm = () => {
    setShowRegistroForm(false);
  };

  useEffect(() => {
    obtenerDatosPersonas();

    // Limpia el temporizador al desmontar el componente
    return () => {
      // Limpiar recursos si es necesario
    };
  }, []);

  const handleGuardarRegistro = () => {
    // Aquí puedes agregar la lógica para guardar la información en el API
    // Una vez guardada la información, cierra el formulario y recarga los datos de la tabla
    setShowRegistroForm(false);
    obtenerDatosPersonas();
  };

  const obtenerDatosPersonas = () => {
    fetch("/api/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        // Mapea los datos recibidos del API para adaptarlos al formato de la interfaz Persona
        const personas = data.map((item: any) => ({
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido,
          cedula: item.cedula,
          edad: item.edad,
          telefono: item.telefono,
        }));
        setPersonas(personas);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };
  

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowRegistroForm}
          style={{ margin: "10px" }}
        >
          Registro personas
        </Button>
        <Dialog
          open={showRegistroForm}
          onClose={handleCloseRegistroForm}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Formulario de Registro</DialogTitle>
          <DialogContent>
            <RegistroForm handleGuardarRegistro={handleGuardarRegistro} />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table
            style={{ backgroundColor: "white" }}
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Teléfono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(personas) &&
                personas.map((persona) => (
                  <TableRow key={persona.id.timestamp}>
                    <TableCell>{persona.nombre}</TableCell>
                    <TableCell>{persona.apellido}</TableCell>
                    <TableCell>{persona.cedula}</TableCell>
                    <TableCell>{persona.edad}</TableCell>
                    <TableCell>{persona.telefono}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default PersonasPage;

