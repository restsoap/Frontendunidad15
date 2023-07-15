import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateCedula } from "../validations/validacionFormPersonas";

interface Especialidad {
  id: number;
  nombreEspecialidad: string;
}

interface Doctor {
  id: number;
  nombre: string;
  apellido: string;
  idEspecialidad: number;
  consultorio: string;
  correo: string;
}

interface CrearCitaFormProps {
  handleGuardarRegistro: () => void;
}

function CrearCitaForm({ handleGuardarRegistro }: CrearCitaFormProps) {
  const [cedula, setCedula] = useState("");
  //const [especialidad, setEspecialidad] = useState("");
  const [especialidad, setEspecialidad] = useState<number | "">("");
  const [doctor, setDoctor] = useState<number | "">("");
  const [doctores, setDoctores] = useState<Doctor[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  const [error, setError] = useState("");

  const handleChange = (event: SelectChangeEvent<{ value: unknown }>) => {
    setEspecialidad(event.target.value as number | "");
  };

  const [formData, setFormData] = useState({
    cedula: "",
    idEspecialidad: "",
    idDoctor: "",
  });

  const [formErrors, setFormErrors] = useState({
    cedula: "",
  });

  useEffect(() => {
    obtenerDoctores();
    obtenerEspecialidades(); // Agregar esta línea
  }, [especialidad]);

  const obtenerDoctores = () => {
    const url = especialidad
      ? `http://localhost:3000/api/doctores/especialidad/${especialidad}`
      : "http://localhost:3000/api/doctores";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDoctores(data); // Verifica que `data` contenga los doctores filtrados
      })
      .catch((error) => {
        console.error("Error al obtener los doctores:", error);
      });
  };

  const obtenerEspecialidades = () => {
    fetch("http://localhost:3000/api/especialidades")
      .then((response) => response.json())
      .then((data) => {
        setEspecialidades(data);
      })
      .catch((error) => {
        console.error("Error al obtener las especialidades:", error);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validar la cédula aquí o en el backend

    // Enviar los datos al API

    fetch("http://localhost:3000/api/citas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cedulaPaciente: cedula,
        idEspecialidad: especialidad,
        idDoctor: doctor,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del API:", data);
        handleGuardarRegistro();
        // Realizar acciones adicionales después del envío
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        // Manejar el error de envío
        setError("Error al crear la cita");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="dense"
          label="Cédula del Paciente"
          value={cedula}
          onChange={(event) => setCedula(event.target.value)}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="idespecialidad-label">Especialidad</InputLabel>
          <Select
            labelId="idespecialidad-label"
            id="idespecialidad"
            name="idespecialidad"
            value={especialidad}
            onChange={(event) =>
              setEspecialidad(event.target.value as number | "")
            }
            fullWidth
            margin="dense"
            required
          >
            {especialidades.map((especialidad) => (
              <MenuItem key={especialidad.id} value={especialidad.id}>
                {especialidad.nombreEspecialidad}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required fullWidth margin="dense">
          <InputLabel>Doctor</InputLabel>
          <Select
            value={doctor}
            onChange={(event) => setDoctor(event.target.value as number | "")}
          >
            {doctores.map((doctor) => (
              <MenuItem key={doctor.id} value={doctor.id}>
                {doctor.nombre} {doctor.apellido}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit">
          Crear Cita
        </Button>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default CrearCitaForm;
