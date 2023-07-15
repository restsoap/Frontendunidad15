import React, { useState, useEffect, FormEvent, MouseEvent } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import {
  validateNombre,
  validateApellido,
  validateConsultorio,
  validateCorreo,
  validateIdEspecialidad,
} from "../validations/validationsFormDoctores";

interface Especialidad {
  id: number;
  nombreEspecialidad: string;
}

interface FormData {
  nombre: string;
  apellido: string;
  idespecialidad: string;
  consultorio: string;
  correo: string;
}

interface DoctoresFormProps {
  handleGuardarRegistro: () => void;
}

function DoctoresForm({ handleGuardarRegistro }: DoctoresFormProps) {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    idespecialidad: "",
    consultorio: "",
    correo: "",
  });

  const [errores, setErrores] = useState<FormData>({
    nombre: "",
    apellido: "",
    idespecialidad: "",
    consultorio: "",
    correo: "",
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name || ""]: value as string });
  };

  const handleMenuItemClick = (event: MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.getAttribute("data-value");
    setFormData({ ...formData, idespecialidad: value || "" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const erroresFormulario = {
      nombre: validateNombre(formData.nombre),
      apellido: validateApellido(formData.apellido),
      idespecialidad: validateIdEspecialidad(formData.idespecialidad),
      consultorio: validateConsultorio(formData.consultorio),
      correo: validateCorreo(formData.correo),
    };

    setErrores(erroresFormulario);

    if (Object.values(erroresFormulario).every((error) => !error)) {
      fetch("http://localhost:3000/api/doctores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del API:", data);
          handleGuardarRegistro();
        })
        .catch((error) => {
          console.error("Error al enviar los datos:", error);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/especialidades")
      .then((response) => response.json())
      .then((data) => {
        setEspecialidades(data);
      })
      .catch((error) => {
        console.error("Error al obtener las especialidades:", error);
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
          error={!!errores.nombre}
          helperText={errores.nombre}
        />
        <TextField
          name="apellido"
          label="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
          error={!!errores.apellido}
          helperText={errores.apellido}
        />
        <FormControl
          fullWidth
          margin="normal"
          required
          error={!!errores.idespecialidad}
        >
          <InputLabel id="idespecialidad-label">Especialidad</InputLabel>
          <Select
            labelId="idespecialidad-label"
            id="idespecialidad"
            name="idespecialidad"
            value={formData.idespecialidad}
            fullWidth
            margin="dense"
            renderValue={(selected) => (
              <span>
                {selected
                  ? especialidades.find((e) => e.id === parseInt(selected as string))?.nombreEspecialidad
                  : ""}
              </span>
            )}
          >
            <MenuItem value="">
              <em>Seleccionar</em>
            </MenuItem>
            {especialidades.map((especialidad) => (
              <MenuItem
                key={especialidad.id}
                value={especialidad.id.toString()}
                onClick={handleMenuItemClick}
              >
                {especialidad.nombreEspecialidad}
              </MenuItem>
            ))}
          </Select>
          {!!errores.idespecialidad && <div>{errores.idespecialidad}</div>}
        </FormControl>
        <TextField
          name="consultorio"
          label="Consultorio"
          value={formData.consultorio}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
          error={!!errores.consultorio}
          helperText={errores.consultorio}
        />
        <TextField
          name="correo"
          label="Correo"
          value={formData.correo}
          onChange={handleChange}
          fullWidth
          required
          type="email"
          margin="dense"
          error={!!errores.correo}
          helperText={errores.correo}
        />
        <Button variant="contained" color="primary" type="submit">
          Registrar
        </Button>
      </form>
    </div>
  );
}

export default DoctoresForm;