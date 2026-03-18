# GitHub Repository Finder — Rubidex

Aplicación web para buscar repositorios públicos de GitHub por usuario. Desarrollada como prueba técnica con React, TypeScript, TailwindCSS, React Query y Zustand.

## 🚀 Demo

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/github-repo-finder.git

# Instalar dependencias
cd github-repo-finder
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## ✨ Características

- 🔍 **Búsqueda de usuarios**: Busca cualquier usuario de GitHub
- 📋 **Listado de repositorios**: Muestra nombre, descripción, lenguaje y estrellas
- 🔗 **Enlaces directos**: Cada repo enlaza a GitHub
- 📜 **Historial persistente**: Las últimas búsquedas se guardan localmente
- 🎨 **Estados de UI**: Loading, error y resultados vacíos
- 📱 **Diseño responsivo**: Funciona en móvil, tablet y escritorio
- ⚡ **Rendimiento**: Caché con React Query, actualizaciones optimizadas

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Estilos**: TailwindCSS v4
- **Estado Global**: Zustand con persistencia
- **Data Fetching**: TanStack React Query + Axios
- **Build Tool**: Vite 6

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes UI reutilizables
│   ├── SearchBar.tsx   # Barra de búsqueda
│   ├── RepoList.tsx    # Contenedor de repositorios
│   ├── RepoCard.tsx    # Tarjeta individual de repo
│   ├── HistoryList.tsx # Historial de búsquedas
│   └── Loader.tsx      # Spinner de carga
├── hooks/               # Custom hooks
│   └── useSearchRepos.ts # Lógica de búsqueda con React Query
├── store/               # Estado global con Zustand
│   └── historyStore.ts  # Store del historial
├── types/               # Tipos de TypeScript
│   ├── repository.ts    # Tipo Repository (con starnumbers)
│   └── github.ts        # Tipo GitHub API response
├── pages/               # Páginas
│   └── Home.tsx         # Página principal
├── App.tsx              # Componente raíz
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales (Tailwind)
```

## 🧠 Decisiones Técnicas

### 🔄 **React Query vs Fetch manual**
- Caché automático de peticiones
- Estados de loading/error integrados
- Refetch optimizado
- Stale-while-revalidate por defecto

### 🎭 **Zustand vs Context API**
- Más liviano y con menos boilerplate
- Middleware de persistencia incluido
- Actualizaciones selectivas (solo componentes que usan el estado)
- Fácil integración con TypeScript

### 🌐 **Axios vs Fetch nativo**
- Interceptores para manejo global de errores
- Tipado automático de respuestas
- Configuración más limpia (params, headers)
- Mejor soporte para TypeScript

### 🎨 **TailwindCSS v4**
- Configuración simplificada (solo @import)
- Sin necesidad de postcss.config.js
- Build más rápido
- Diseño 100% personalizado (sin librerías UI)

### 📱 **Diseño Responsivo**
- Mobile-first con menú hamburguesa
- Columnas adaptativas (1/3 - 2/3 en desktop)
- Overlay en móvil cuando el menú está abierto
- Breakpoints personalizados para diferentes dispositivos

## 🔍 API de Referencia

```
GET https://api.github.com/users/{username}/repos
```

La aplicación consume este endpoint público de GitHub para obtener los repositorios.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Vista previa del build
- `npm run lint` - Ejecuta ESLint

## 🎯 Funcionalidades Pendientes (Opcionales)

- [ ] Paginación de resultados
- [ ] Filtro por lenguaje
- [ ] Ordenamiento por estrellas/fecha
- [ ] Tema oscuro/claro
- [ ] Tests unitarios

## 📄 Licencia

MIT

## ✨ Agradecimientos

Proyecto desarrollado como parte de una prueba técnica. ¡Gracias por la oportunidad!

---

**Desarrollado con ❤️ por Santos Luna Arriaga**