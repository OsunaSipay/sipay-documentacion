---
sidebar_position: 20
sidebar_label: 'Configurar MCP'
---

# Configurar MCP para la documentación

Esta guía explica cómo conectar Cursor a la documentación de Sipay mediante MCP.

## Configuración recomendada (Node.js)

Esta opción **no requiere** que Docusaurus esté sirviendo la web. Lee directamente de los archivos generados en el build.

### Pasos

#### 1. Iniciar el servidor MCP

En una terminal, ejecuta (y **déjala abierta**):

```bash
cd ~/Docosaurus/Docosaurus
npm run mcp:dev
```

Este comando genera el build y arranca el servidor MCP en el puerto 3456. **No cierres esta terminal.**

#### 2. Abrir Cursor

Abre Cursor con el proyecto. La configuración en `.cursor/mcp.json` ya está preparada.

#### 3. Comprobar la conexión

Ve a **Settings → Tools & MCP**. Debería aparecer **sipay-docs** sin errores.

#### 4. Probar

En el chat de Cursor, prueba preguntas como:

- "¿Qué métodos de pago ofrece Sipay?"
- "Busca en la documentación información sobre APIs"

---

## Importante: orden al reiniciar

Cada vez que reinicies el ordenador o Cursor:

1. **Primero:** Abre una terminal y ejecuta `npm run mcp:dev` (déjala abierta).
2. **Después:** Abre Cursor.

Si abres Cursor antes de que el servidor MCP esté corriendo, aparecerá un error. Cierra Cursor, ejecuta `npm run mcp:dev` y vuelve a abrirlo.

---

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run mcp:dev` | Genera el build y arranca el servidor MCP (recomendado) |
| `npm run mcp:serve` | Solo arranca el servidor MCP (requiere haber hecho `npm run build` antes) |
