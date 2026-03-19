// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
 const sidebars = {
  // La barra lateral "tutorialSidebar" se usa por defecto
  tutorialSidebar: [
    'intro',           // docs/intro.md
    'hello',
    'guia-git',        // Guía para iniciar proyecto y subir cambios a Git
    {
      type: 'category',
      label: 'Tutorial',  // Nombre de la categoría
      items: ['tutorial-basics/create-a-document', 'tutorial-basics/create-a-page'],
    },
  ],
};

export default sidebars;
