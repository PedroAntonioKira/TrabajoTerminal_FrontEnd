@echo off
echo ========================================
echo 🚀 Iniciando proceso de despliegue...
echo ========================================

:: Moverse al directorio del script
cd /d "%~dp0"

:: Verificar si Node.js y AWS CLI están instalados
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js no está instalado. Instálalo desde https://nodejs.org/
    pause
    exit /b
)

where aws >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: AWS CLI no está instalado o no está configurado correctamente.
    echo 👉 Descárgalo desde https://aws.amazon.com/cli/
    pause
    exit /b
)

:: Generar el build de la aplicación
echo 🔨 Ejecutando "npm run build"...
npm run build
if %errorlevel% neq 0 (
    echo ❌ ERROR: Fallo en "npm run build". Revisa los errores.
    pause
    exit /b
)

:: Subir archivos a S3
echo 🔼 Subiendo archivos a S3...
aws s3 sync dist/ s3://mi-sitio-react-s301/ --delete
if %errorlevel% neq 0 (
    echo ❌ ERROR: Fallo al subir los archivos a S3.
    pause
    exit /b
)

echo ========================================
echo ✅ ¡Despliegue completado exitosamente!
echo ========================================
pause
exit

