export const validateNombre = (nombre: string): string => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!nombre.trim()) {
      return "El nombre es requerido";
    } else if (!regex.test(nombre)) {
      return "El nombre no debe contener caracteres especiales ni números";
    }
    return "";
  };
  
  export const validateApellido = (apellido: string): string => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!apellido.trim()) {
      return "El apellido es requerido";
    } else if (!regex.test(apellido)) {
      return "El apellido no debe contener caracteres especiales ni números";
    }
    return "";
  };
  
  export const validateCorreo = (correo: string): string => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.trim()) {
      return "El correo es requerido";
    } else if (!regex.test(correo)) {
      return "El correo no es válido";
    }
    return "";
  };
  
  export const validateConsultorio = (consultorio: string): string => {
    const regex = /^\d+$/;
    if (!consultorio.trim()) {
      return "El consultorio es requerido";
    } else if (!regex.test(consultorio)) {
      return "El consultorio solo debe contener caracteres numéricos";
    }
    return "";
  };
  
  export const validateIdEspecialidad = (idEspecialidad: string): string => {
    if (!idEspecialidad) {
      return "Debe seleccionar una especialidad";
    }
    return "";
  };