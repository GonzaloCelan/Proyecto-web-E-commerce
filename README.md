# E-Commerce GLG 🛒

> **Nota:** Este README fue generado con la asistencia de Claude AI para documentar de manera profesional el proyecto.

## 📋 Descripción

Aplicación web de e-commerce desarrollada como proyecto académico utilizando tecnologías web fundamentales (HTML, CSS y JavaScript vanilla). Este sitio permite navegar un catálogo de productos, agregar items al carrito de compras, gestionar una lista de favoritos y simular compras con confirmaciones visuales.

El proyecto integra datos desde la API pública **FakeStore API** y utiliza **LocalStorage** para mantener la persistencia de datos entre sesiones del navegador.

🔗 **Repositorio:** [https://github.com/GonzaloCelan/Proyecto-web-E-commerce](https://github.com/GonzaloCelan/Proyecto-web-E-commerce)

---

## 👥 Equipo de Desarrollo

### **Gonzalo Ezequiel Celan** [@GonzaloCelan](https://github.com/GonzaloCelan)
**Responsable del Sistema de Carrito de Compras**

- Implementación completa del carrito de compras con sidebar deslizante
- Desarrollo de la funcionalidad de agregar/eliminar productos del carrito
- Sistema de incremento y decremento de cantidades desde el carrito
- Inicialización y gestión del localStorage para persistencia del carrito
- Integración de actualización automática del carrito en tiempo real
- Cálculo dinámico de subtotales y total del carrito
- Gestión de Pull Requests y merges de la rama `carrito`

### **Augusto Nicolas Gonzalez** [@AugustoNGonzalez](https://github.com/AugustoNGonzalez)
**Responsable de UI/UX, Favoritos y Perfil**

- Diseño y desarrollo del navbar principal
- Maquetado de las tarjetas de producto (cards)
- Implementación completa del sistema de favoritos/wishlist
- Sidebar de favoritos con funcionalidad de agregar/eliminar
- Badge indicador de cantidad de favoritos
- Desarrollo del simulador de perfil de usuario (login/logout)
- Validación de nombre de usuario (límite de 50 caracteres)
- Integración de SweetAlert2 para notificaciones visuales
- Confirmación extra al finalizar compra
- Mejoras de consistencia de colores y estética general

### **Leandro Glassman** [@LeandroGlassman](https://github.com/LeandroGlassman)
**Responsable de Búsqueda, Modal y Mejoras de UX**

- Implementación del sistema de búsqueda/filtrado en tiempo real
- Búsqueda case-insensitive con mensaje informativo cuando no hay resultados
- Modal de detalle de producto al hacer clic en imagen
- Integración con Bootstrap Modal
- Badge visual mostrando cantidad de items en el carrito
- Deshabilitación de botones cuando el carrito está vacío
- Efecto hover en imágenes de productos
- Ajustes finales y correcciones para cumplimiento de requisitos

---

## ✨ Características

### 🛍️ Catálogo de Productos
- Visualización de productos en formato de tarjetas (cards)
- Información detallada: título, precio, categoría e imagen
- Imágenes con efecto hover
- Modal con vista detallada al hacer clic en la imagen
- Integración con **FakeStore API** (20 productos)

### 🔍 Búsqueda y Filtrado
- Barra de búsqueda en tiempo real
- Filtrado case-insensitive (no distingue mayúsculas/minúsculas)
- Mensaje informativo cuando no se encuentran productos

### 🛒 Carrito de Compras
- Sidebar lateral deslizante con overlay
- Agregar productos desde las tarjetas (+1 unidad)
- Agregar productos desde el modal (cantidad personalizada)
- Incrementar/decrementar cantidad directamente en el carrito
- Eliminar productos individuales
- Vaciar todo el carrito
- Cálculo automático de subtotales y total
- Badge indicador de cantidad total de items
- Botones deshabilitados cuando el carrito está vacío
- Confirmación de compra con detalle de productos
- Persistencia con LocalStorage

### ❤️ Sistema de Favoritos
- Agregar/quitar productos de favoritos con botón de corazón
- Sidebar lateral de favoritos
- Badge indicador de cantidad de favoritos
- Sincronización visual en todas las tarjetas
- Clic en favorito abre el modal del producto
- Eliminar todos los favoritos a la vez
- Persistencia con LocalStorage

### 👤 Perfil de Usuario
- Simulador de login/logout
- Menú desplegable de perfil
- Mensaje de bienvenida personalizado
- Validación de longitud de nombre (máximo 50 caracteres)
- Persistencia del nombre con LocalStorage

### 💳 Funcionalidad de Compra
- Botón "Comprar ahora" en cada tarjeta de producto
- Confirmación de compra con SweetAlert2
- Detalle de productos y total antes de confirmar
- Finalizar compra desde el carrito
- Doble confirmación para evitar compras accidentales

### 📱 Diseño Responsive
- Navbar adaptable a diferentes tamaños de pantalla
- Diseño mobile-friendly
- Media queries para pantallas pequeñas (breakpoint 600px)
- Sidebar y overlays optimizados para móviles

### 🎨 UX/UI
- Efectos hover en botones, iconos e imágenes
- Transiciones y animaciones suaves
- Overlays semitransparentes para sidebars
- Cerrar modal con tecla ESC
- Notificaciones visuales con SweetAlert2
- Iconos de Bootstrap Icons

---

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos personalizados y responsive design
- **JavaScript ES6+** - Lógica de aplicación con módulos

### Frameworks y Librerías
- **Bootstrap 5.3.3** - Framework CSS para diseño responsive
- **Bootstrap Icons 1.11.1** - Biblioteca de iconos
- **SweetAlert2 v11** - Notificaciones y alertas elegantes

### API Externa
- **FakeStore API** - Proveedor de datos de productos
  - Endpoint: `https://fakestoreapi.com/products`

### Almacenamiento
- **LocalStorage API** - Persistencia de carrito, favoritos y usuario

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **GitHub** - Repositorio remoto y colaboración
- **Pull Requests** - Workflow de integración de código

---

## 📁 Estructura del Proyecto

```
Proyecto-web-E-commerce/
│
├── Index.html                    # Punto de entrada - Estructura HTML principal
├── index.js                      # Lógica principal, renderizado y coordinación
├── README.md                     # Este archivo
│
├── estilos/
│   └── Styles.css               # Estilos personalizados y responsive design
│
├── api/
│   └── api.js                   # Integración con FakeStore API
│
├── componentes/
│   ├── carrito.js               # Funcionalidad del carrito de compras
│   ├── favoritos.js             # Sistema de favoritos/wishlist
│   └── modal.js                 # Funcionalidad del modal de productos
│
└── storage/
    └── storage.js               # Utilidades de gestión de localStorage
```

### Arquitectura Modular

El proyecto sigue una arquitectura basada en **ES6 Modules** con separación clara de responsabilidades:

- **index.js** - Módulo central que coordina todos los demás
- **api.js** - Capa de comunicación con API externa
- **storage.js** - Capa de persistencia con LocalStorage
- **carrito.js** - Lógica de negocio del carrito
- **favoritos.js** - Lógica de negocio de favoritos
- **modal.js** - Gestión de modales y UI

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para CDNs de Bootstrap y API de productos)

### Pasos para Ejecutar

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/GonzaloCelan/Proyecto-web-E-commerce.git
   ```

2. **Navegar al directorio del proyecto**
   ```bash
   cd Proyecto-web-E-commerce
   ```

3. **Abrir en el navegador**
   - **Opción A:** Hacer doble clic en `Index.html`
   - **Opción B:** Usar Live Server en VS Code
   - **Opción C:** Usar cualquier servidor local (Python, Node, etc.)

   Ejemplo con Python:
   ```bash
   # Python 3
   python -m http.server 8000

   # Luego abrir: http://localhost:8000
   ```

4. **¡Listo!** El sitio debería cargarse correctamente con los productos de la API.

---

## 💡 Funcionalidades Detalladas

### Flujo de Usuario Típico

1. **Explorar productos**: El usuario ve 20 productos cargados desde FakeStore API
2. **Buscar**: Puede filtrar productos escribiendo en la barra de búsqueda
3. **Ver detalles**: Hacer clic en una imagen abre un modal con descripción completa
4. **Agregar al carrito**:
   - Desde la tarjeta: botón `+` agrega 1 unidad
   - Desde el modal: elegir cantidad y agregar
5. **Gestionar favoritos**: Hacer clic en el corazón para marcar/desmarcar
6. **Revisar carrito**: Clic en el ícono del carrito abre el sidebar
7. **Modificar cantidades**: Usar botones +/- en el carrito
8. **Finalizar compra**: Botón "Finalizar Compra" muestra confirmación
9. **Perfil**: Guardar nombre de usuario para personalizar la experiencia

### Persistencia de Datos

El proyecto utiliza **LocalStorage** con tres claves principales:

- `cart` - Array de productos en el carrito con cantidades
- `favoritos` - Array de productos marcados como favoritos
- `username` - Nombre del usuario logueado

Los datos persisten entre sesiones del navegador y se sincronizan automáticamente en toda la interfaz.

---

## 📚 Aprendizajes Clave

Este proyecto académico permitió al equipo desarrollar competencias en:

- **Trabajo colaborativo** con Git y GitHub (branches, pull requests, merges)
- **Arquitectura modular** con ES6 Modules
- **Manipulación del DOM** de forma eficiente
- **Gestión de estado** con LocalStorage
- **Consumo de APIs RESTful** con `fetch`
- **Diseño responsive** con media queries
- **UX/UI** con animaciones y transiciones
- **Debugging** y resolución de problemas en equipo

---

## 🔮 Posibles Mejoras Futuras

- Implementar autenticación real con backend
- Agregar sistema de paginación para más productos
- Integrar pasarela de pago simulada
- Agregar filtros por categoría y rango de precio
- Historial de compras del usuario
- Sistema de reviews y calificaciones
- Modo oscuro (dark mode)
- Internacionalización (i18n)
- Tests unitarios y de integración

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

## 📞 Contacto

Para consultas sobre el proyecto, puedes contactar a los desarrolladores a través de sus perfiles de GitHub:

- [@GonzaloCelan](https://github.com/GonzaloCelan)
- [@AugustoNGonzalez](https://github.com/AugustoNGonzalez)
- [@LeandroGlassman](https://github.com/LeandroGlassman)

---

<div align="center">

*Laboratorio Aplicaciones Web Cliente - ISTEA - 2025*

</div>