# 📦 Sistema de Inventario CRUD

Un sistema completo de gestión de inventario desarrollado con tecnologías web modernas que permite realizar operaciones CRUD (Create, Read, Update, Delete) para la administración de productos.

## 🚀 Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- 🎨 **Interfaz Moderna**: Diseño responsive con Bootstrap
- 🔄 **Actualizaciones en Tiempo Real**: Interfaz dinámica y reactiva
- ⚠️ **Manejo de Errores**: Validaciones y notificaciones informativas
- 📱 **Responsive Design**: Adaptable a diferentes dispositivos
- 🎯 **Experiencia de Usuario**: Notificaciones elegantes con SweetAlert2

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - HTML5 & CSS3
  - JavaScript ES6+
  - Bootstrap 5
  - SweetAlert2
  - Vite (Build Tool)

- **Backend:**
  - JSON Server (Mock API)
  - Axios (HTTP Client)

## 📋 Funcionalidades

### Gestión de Productos
- Agregar nuevos productos con información completa
- Visualizar lista de productos en tabla dinámica
- Actualizar información de productos existentes
- Eliminar productos del inventario
- Filtrado por categorías (Ropa, Comida, Tecnología, Automóviles)

### Campos de Producto
- **Nombre**: Identificación del producto
- **Cantidad**: Stock disponible
- **Precio**: Valor unitario
- **Empresa**: Proveedor o fabricante
- **Categoría**: Clasificación del producto

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Luisr26/crud-users.git
cd SPA_Inventory
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar JSON Server**
```bash
# Instalar JSON Server globalmente
npm install -g json-server

# Crear archivo db.json para la base de datos mock
echo '{"products": []}' > db.json
```

4. **Ejecutar el proyecto**
```bash
# Terminal 1: Iniciar JSON Server
json-server --watch db.json --port 3000

# Terminal 2: Iniciar servidor de desarrollo
npm run dev
```

## 📁 Estructura del Proyecto

```
sistema-inventario-crud/
│
├── src/
│   ├── js/
│   │   └── main.js
│   └── styles/
│       └── styles.css
│
├── index.html
├── package.json
├── db.json
├── vite.config.js
└── README.md
```

## 💻 Uso

1. **Agregar Producto**: Completa el formulario con la información del producto y haz clic en "Save"
2. **Ver Productos**: Los productos se muestran automáticamente en la tabla
3. **Actualizar Producto**: Haz clic en el botón "Update" de cualquier producto para modificar sus datos
4. **Eliminar Producto**: Usa el botón "Delete" para remover productos del inventario
5. **Limpiar Formulario**: Utiliza el botón "Clear" para resetear todos los campos

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Luis Alfredo Orozco**
- 🏢 Clan Ciénaga
- 📱 Teléfono: 3045233125
- 📧 Email: [luisoro009@gmail.com]

## 🙏 Agradecimientos

- Bootstrap por el framework CSS
- SweetAlert2 por las notificaciones elegantes
- Vite por la herramienta de construcción
- JSON Server por el mock API

---

⭐ **¡Dale una estrella a este proyecto si te ha sido útil!** ⭐
