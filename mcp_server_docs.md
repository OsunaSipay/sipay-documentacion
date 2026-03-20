# Documentación del Servidor MCP Sipay

Este documento detalla la implementación, uso y herramientas disponibles en el servidor de Model Context Protocol (MCP) para la documentación de Sipay.

## 🚀 Arquitectura y Cambios

El servidor permite que herramientas de IA (como Cursor, Claude Code o Antigravity) consulten y busquen en la documentación del proyecto.

### Soporte Híbrido de Transporte
He implementado un sistema de **doble transporte** en [mcp-server.mjs](file:///home/adrianosuna/Docosaurus/Docosaurus/mcp-server.mjs):
1.  **Transporte SSE (HTTP):** El servidor escucha en el puerto `3456`. Es el modo ideal para **Cursor** y herramientas basadas en red.
2.  **Transporte Stdio:** El servidor se comunica a través de la entrada/salida estándar. Es el modo requerido por el sistema **Antigravity**.

El modo se activa automáticamente según la variable de entorno `MCP_TRANSPORT`.

## 🛠️ Cómo Usar

### 1. Iniciar el Servidor (Modo Desarrollo)
Para que tanto Cursor como Antigravity tengan acceso a la última versión de la documentación, el servidor debe estar ejecutándose:

```bash
npm run mcp:dev
```
*Este comando genera el build de Docusaurus y arranca el servidor en el puerto 3456.*

### 2. Uso en Cursor
Asegúrate de tener la siguiente configuración en **Settings → Tools → MCP**:
- **Name:** `sipay-docs`
- **Type:** `sse`
- **URL:** `http://localhost:3456`

### 3. Uso en Antigravity (Sistema Actual)
La configuración ya está aplicada en `~/.gemini/antigravity/mcp_config.json`. El sistema lanzará automáticamente un proceso `stdio` cuando necesite consultar la documentación, por lo que **no necesitas hacer nada adicional** aquí.

## 🧰 Herramientas Disponibles

El servidor expone dos herramientas principales que las IA utilizarán:

1.  **`docs_search`**:
    - **Uso:** Busca palabras clave o conceptos en toda la documentación.
    - **Resultado:** Devuelve una lista de páginas relevantes con fragmentos de texto y puntuación de relevancia.
2.  **`docs_fetch`**:
    - **Uso:** Obtiene el contenido completo de una página específica en formato Markdown.
    - **Resultado:** Devuelve el texto completo, títulos y estructura de la página solicitada.

## 📄 Archivos Clave
- **[mcp-server.mjs](file:///home/adrianosuna/Docosaurus/Docosaurus/mcp-server.mjs)**: Punto de entrada del servidor.
- **[mcp_config.json](file:///home/adrianosuna/.gemini/antigravity/mcp_config.json)**: Configuración para el agente de IA.
- **[package.json](file:///home/adrianosuna/Docosaurus/Docosaurus/package.json)**: Contiene los scripts `mcp:dev` y `mcp:serve`.

---

> [!NOTE] 
> Si realizas cambios en la documentación (archivos [.md](file:///home/adrianosuna/Docosaurus/Docosaurus/docs/mcp-setup.md)), recuerda reiniciar `npm run mcp:dev` para que el índice de búsqueda se actualice.
