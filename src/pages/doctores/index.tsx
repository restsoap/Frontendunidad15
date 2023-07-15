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
import DoctoresForm from "./DoctoresForm";

interface Doctor {
  id: number;
  nombre: string;
  apellido: string;
  idespecialidad: number;
  consultorio: string;
  correo: string;
  especialidad?: string; // Agregar la propiedad "especialidad" como opcional
}


interface Especialidad {
  id: number;
  nombreEspecialidad: string;
}

function DoctoresPage() {
  const [doctores, setDoctores] = useState<Doctor[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [error, setError] = useState(false);
  const [showDoctoresForm, setShowDoctoresForm] = useState(false);

  const handleShowDoctoresForm = () => {
    setShowDoctoresForm(true);
  };

  const handleCloseDoctoresForm = () => {
    setShowDoctoresForm(false);
  };

  useEffect(() => {
    obtenerDatosDoctores();
    obtenerDatosEspecialidades();
  }, []);

  const handleGuardarRegistro = () => {
    // Aquí puedes agregar la lógica para guardar la información en el API
    // Una vez guardada la información, cierra el formulario y recarga los datos de la tabla
    setShowDoctoresForm(false);
    handleCloseDoctoresForm();
    obtenerDatosDoctores();
  };

  const obtenerDatosEspecialidades = () => {
    fetch("http://localhost:3000/api/especialidades")
      .then((response) => response.json())
      .then((data) => {
        setEspecialidades(data);
      })
      .catch((error) => {
        console.log("Error al obtener especialidades", error);
      });
  };

  const obtenerDatosDoctores = () => {
    Promise.all([
      fetch("http://localhost:3000/api/doctores").then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          setError(true);
        } else {
          throw new Error("Error en la respuesta de la API");
        }
      }),
      fetch("http://localhost:3000/api/especialidades").then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error al obtener especialidades");
        }
      }),
    ])
      .then(([doctoresData, especialidadesData]: [Doctor[], Especialidad[]]) => {
        const doctoresConEspecialidad = doctoresData.map((doctor: Doctor) => {
          const especialidad = especialidadesData.find(
            (especialidad) => especialidad.id === doctor.idespecialidad
          );
          const nombreEspecialidad = especialidad
            ? especialidad.nombreEspecialidad
            : "";
          return {
            ...doctor,
            especialidad: nombreEspecialidad,
          };
        });
        setDoctores(doctoresConEspecialidad);
      })
      .catch((error) => {
        console.log("Error al obtener listado", error);
      });
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleShowDoctoresForm}
          style={{ margin: "10px" }}
        >
          Registro Doctores
        </Button>
        <Dialog
          open={showDoctoresForm}
          onClose={handleCloseDoctoresForm}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Registro de Doctor</DialogTitle>
          <DialogContent>
            <DoctoresForm handleGuardarRegistro={handleGuardarRegistro} />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {error ? (
          <p>No se encontraron datos de doctores</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Especialidad</TableCell>
                  <TableCell>Consultorio</TableCell>
                  <TableCell>Correo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctores.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.id}</TableCell>
                    <TableCell>{doctor.nombre}</TableCell>
                    <TableCell>{doctor.apellido}</TableCell>
                    <TableCell>{doctor.especialidad}</TableCell>
                    <TableCell>{doctor.consultorio}</TableCell>
                    <TableCell>{doctor.correo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default DoctoresPage;
