import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { validateNombre, validateCedula, validateApellido, validateEdad, validateTelefono } from "../validations/validacionFormPersonas"

interface RegistroFormProps {
  handleGuardarRegistro: () => void;
}

const RegistroForm: React.FC<RegistroFormProps> = ({
  handleGuardarRegistro,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    apellido: "",
    edad: "",
    telefono: "",
  });

  const [formErrors, setFormErrors] = useState({
    nombre: "",
    cedula: "",
    apellido: "",
    edad: "",
    telefono: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      // Enviar los datos al API
      fetch("http://localhost:3000/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del API:", data);
          // Realizar acciones adicionales después del envío

          // Cerrar el Dialog llamando a handleGuardarRegistro
          handleGuardarRegistro();
        })
        .catch((error) => {
          console.error("Error al enviar los datos:", error);
          // Manejar el error de envío
        });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      nombre: validateNombre(formData.nombre),
      cedula: validateCedula(formData.cedula),
      apellido: validateApellido(formData.apellido),
      edad: validateEdad(formData.edad),
      telefono: validateTelefono(formData.telefono),
    };
  
    if (errors.nombre || errors.cedula || errors.apellido || errors.edad || errors.telefono) {
      isValid = false;
    }
  
    setFormErrors(errors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "white" }}>
      <TextField
        name="nombre"
        label="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!formErrors.nombre}
        helperText={formErrors.nombre}
      />
      <TextField
        name="cedula"
        label="Cédula"
        value={formData.cedula}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!formErrors.cedula}
        helperText={formErrors.cedula}
      />
      <TextField
        name="apellido"
        label="Apellido"
        value={formData.apellido}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!formErrors.apellido}
        helperText={formErrors.apellido}
      />
      <TextField
        name="edad"
        label="Edad"
        value={formData.edad}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!formErrors.edad}
        helperText={formErrors.edad}
      />
      <TextField
        name="telefono"
        label="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!formErrors.telefono}
        helperText={formErrors.telefono}
      />
      <Button type="submit" variant="contained" color="primary">
        Registrar
      </Button>
    </form>
  );
};

export default RegistroForm;
