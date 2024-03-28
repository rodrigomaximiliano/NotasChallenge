#!/bin/bash

# Función para mostrar mensajes de error y salir
function error_exit {
    echo "$1" 1>&2
    exit 1
}

# Verificar si los directorios backend y frontend existen
[ -d "backend" ] || error_exit "Error: No se encontró el directorio backend."
[ -d "frontend" ] || error_exit "Error: No se encontró el directorio frontend."

# Instalar dependencias del backend
cd backend || error_exit "Error: No se pudo cambiar al directorio backend."
npm install || error_exit "Error: No se pudieron instalar las dependencias del backend."

# Compilar TypeScript a JavaScript (si es necesario)
npm run build || error_exit "Error: No se pudo compilar TypeScript a JavaScript."

# Ejecutar migraciones de la base de datos con Prisma
npx prisma migrate deploy || error_exit "Error: No se pudieron ejecutar las migraciones de la base de datos."

# Volver al directorio principal
cd ..

# Instalar dependencias del frontend
cd frontend || error_exit "Error: No se pudo cambiar al directorio frontend."
npm install || error_exit "Error: No se pudieron instalar las dependencias del frontend."

# Volver al directorio principal
cd ..

# Iniciar la aplicación
echo "Iniciando la aplicación..."
cd backend || error_exit "Error: No se pudo cambiar al directorio backend."
npm start || error_exit "Error: No se pudo iniciar la aplicación."
