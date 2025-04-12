@echo off
echo Inicializando Git y creando ramas...

rem Verifica si ya hay un commit inicial
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ No hay commit inicial. Agregando archivos y realizando el primer commit...
    git add .
    git commit -m "🚀 Primer commit - Inicializando el repositorio"
)

echo Creando y cambiando a la rama developer...
git checkout -b developer
git push -u origin developer

echo Creando la rama QA desde developer...
git checkout -b QA
git push -u origin QA

echo Creando la rama master desde QA...
git checkout -b master
git push -u origin master

echo 🔥 Repositorio configurado correctamente en GitHub.
pause

