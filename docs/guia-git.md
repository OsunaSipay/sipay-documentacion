---
sidebar_position: 10
sidebar_label: 'Guía Git y Desarrollo'
---

# Guía de desarrollo: Iniciar proyecto y subir cambios

Esta guía explica cómo iniciar el proyecto de documentación y cómo subir las modificaciones a GitHub.

---

## Cómo iniciar el proyecto

### 1. Abrir la terminal

Abre una terminal en tu equipo (en Cursor puedes usar `` Ctrl+` `` o el menú Terminal → Nueva terminal).

### 2. Navegar a la carpeta del proyecto

```bash
cd ~/Docosaurus/Docosaurus
```

O la ruta donde tengas el proyecto guardado.

### 3. Instalar dependencias (solo la primera vez o si cambian)

Si es la primera vez que clonas el proyecto o alguien añadió nuevas dependencias:

```bash
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm start
```

El sitio se abrirá automáticamente en **http://localhost:3000**. Los cambios que hagas en los archivos se verán en tiempo real (hot reload).

### 5. Parar el servidor

Pulsa `Ctrl + C` en la terminal para detener el servidor.

### Resumen: Iniciar proyecto

| Paso | Comando |
|------|---------|
| Ir a la carpeta | `cd ~/Docosaurus/Docosaurus` |
| Instalar dependencias | `npm install` |
| Iniciar servidor | `npm start` |
| Parar servidor | `Ctrl + C` |

---

## Cómo subir cambios a GitHub

Cuando modifiques archivos y quieras guardarlos en GitHub, sigue estos pasos.

### 1. Ver qué has cambiado

```bash
git status
```

Muestra los archivos modificados, nuevos o eliminados.

### 2. Añadir los archivos al área de preparación

```bash
# Añadir todos los archivos modificados
git add .

# O añadir archivos concretos
git add docs/intro.md docusaurus.config.js
```

### 3. Crear un commit (guardar con mensaje)

```bash
git commit -m "Descripción corta de los cambios"
```

**Ejemplos de mensajes útiles:**
- `git commit -m "Añadido logo de Sipay al navbar"`
- `git commit -m "Actualizada documentación de introducción"`
- `git commit -m "Nueva página de tutorial"`

### 4. Subir los cambios a GitHub

```bash
git push
```

Si es la primera vez que subes una rama:

```bash
git push -u origin main
```

### Resumen: Subir cambios

| Paso | Comando |
|------|---------|
| Ver cambios | `git status` |
| Añadir | `git add .` |
| Guardar | `git commit -m "mensaje"` |
| Subir | `git push` |

---

## Configuración inicial de Git (solo la primera vez)

Si Git te pide que configures tu identidad:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

Usa el mismo email que tu cuenta de GitHub.

---

## Consejos

- **Haz commits frecuentes** con mensajes descriptivos
- Usa `git status` antes de añadir para revisar los cambios
- Para descartar cambios en un archivo (antes de hacer add): `git restore nombre-archivo`
- Mantén el servidor corriendo con `npm start` mientras editas para ver los cambios al instante
