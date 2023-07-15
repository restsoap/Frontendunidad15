export const validateNombre = (nombre: string): string => {
  if (!nombre.trim()) {
    return "El nombre es requerido";
  } else if (/\d/.test(nombre)) {
    return "El nombre no debe contener números";
  }
  return "";
}

export const validateCedula = (cedula: string): string => {
  if (!cedula.trim()) {
    return "La cédula es requerida";
  } else if (!/^\d+$/.test(cedula)) {
    return "La cédula debe contener solo números";
  }
  return "";
};

export const validateApellido = (apellido: string): string => {
  if (!apellido.trim()) {
    return "El apellido es requerido";
  } else if (/\d/.test(apellido)) {
    return "El apellido no debe contener números";
  }
  return "";
}

export function validateEdad(edad: string): string {
  if (!edad.trim()) {
    return "La edad es requerida";
  }

  const edadRegex = /^[0-9]{1,2}$/;
  if (!edadRegex.test(edad)) {
    return "La edad debe ser un número entre 1 y 99";
  }

  return "";
}

export const validateTelefono = (telefono: string): string => {
  if (!telefono.trim()) {
    return "El teléfono es requerido";
  } else if (!/^\d+$/.test(telefono)) {
    return "El teléfono debe contener solo números";
  }
  return "";
};
