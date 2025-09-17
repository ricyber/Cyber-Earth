# 🚀 Roles Cyber - Portafolio Tecnológico Futurista

Un proyecto web interactivo y futurista que muestra 10 roles clave de la tecnología e informática a través de una línea curva interactiva con efectos visuales avanzados.

## ✨ Características Principales

### 🎨 Diseño y Estética
- **Tema Futurista**: Diseño cyberpunk con colores neón (cyan, magenta, verde)
- **Efectos Hacker**: Animaciones de glitch, scanlines y efectos de partículas sutiles
- **Tipografías**: Orbitron para títulos (futurista) y Rajdhani para contenido
- **Responsive**: Diseño adaptativo para todos los dispositivos

### 🌐 Funcionalidades
- **Doble Idioma**: Español e Inglés con toggle animado
- **Temas**: Modo claro/oscuro con transiciones suaves
- **Línea Curva Interactiva**: 10 puntos representando cada rol tecnológico
- **Modales Informativos**: Ventanas flotantes con información detallada de cada rol
- **Efectos de Blur**: Fondo borroso al abrir modales

### 🎭 Animaciones
- **GSAP**: Animaciones fluidas y profesionales
- **Three.js**: Efectos 3D sutiles en el fondo
- **Entrada Escalonada**: Los puntos aparecen secuencialmente
- **Hover Effects**: Interacciones visuales en todos los elementos

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, animaciones, efectos de blur
- **JavaScript ES6+**: Programación orientada a objetos
- **GSAP**: Biblioteca de animaciones profesionales
- **Three.js**: Gráficos 3D y efectos visuales
- **Google Fonts**: Orbitron y Rajdhani

## 📱 Roles Tecnológicos Incluidos

1. **🛡️ Ciberseguridad** - Protección de sistemas y redes
2. **💻 Programación** - Desarrollo de software y aplicaciones
3. **🌐 Redes** - Telecomunicaciones e infraestructura
4. **⚙️ Sistemas** - Administración de sistemas empresariales
5. **🗄️ Bases de Datos** - Gestión y optimización de datos
6. **🧠 IA & ML** - Inteligencia artificial y aprendizaje automático
7. **📊 Data Science** - Análisis y visualización de datos
8. **☁️ Cloud Computing** - Computación en la nube
9. **🥽 VR/AR/XR** - Realidad virtual y aumentada
10. **🤖 Robótica** - Sistemas autónomos e inteligentes

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno con soporte para ES6+
- Conexión a internet (para cargar CDNs de GSAP y Three.js)

### Pasos de Instalación
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. ¡Disfruta de la experiencia futurista!

### Estructura de Archivos
```
Roles-Cyber-7/
├── index.html          # Archivo principal HTML
├── styles.css          # Estilos CSS con variables y animaciones
├── script.js           # Lógica JavaScript y funcionalidades
└── README.md           # Documentación del proyecto
```

## 🎮 Controles de Usuario

### Toggle de Idioma (ES/EN)
- **Ubicación**: Esquina superior derecha
- **Función**: Cambia entre español e inglés
- **Animación**: Rotación 360° con efecto glitch

### Toggle de Tema (Claro/Oscuro)
- **Ubicación**: Esquina superior derecha
- **Función**: Alterna entre temas claro y oscuro
- **Animación**: Escalado y transición de colores

### Interacción con Puntos
- **Hover**: Efecto de escalado y cambio de color
- **Click**: Abre modal con información del rol
- **Cerrar Modal**: Botón X, clic en overlay o tecla Escape

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --text-primary-light: #00ffff;    /* Color principal */
    --accent-primary-light: #ff00ff;  /* Color de acento */
    --accent-secondary-light: #00ff00; /* Color secundario */
}
```

### Agregar Nuevos Roles
1. Añade el rol en el HTML dentro de `.curve-points`
2. Agrega la información en `CONFIG.roles` en `script.js`
3. Posiciona el punto editando las coordenadas CSS

### Cambiar Logos
Reemplaza los emojis en `.logo-placeholder` con:
- Imágenes SVG personalizadas
- Iconos de Font Awesome
- Logos de tu empresa o proyecto

## 🔧 Configuración Avanzada

### Ajustar Animaciones
Modifica los tiempos y efectos en `script.js`:
```javascript
// Cambiar duración de animaciones
gsap.from('.main-title', {
    duration: 2,        // Duración en segundos
    ease: 'power3.out'  // Tipo de easing
});
```

### Efectos de Partículas
Ajusta la cantidad y velocidad en `script.js`:
```javascript
const particleCount = 20;  // Número de partículas
this.vx = (Math.random() - 0.5) * 0.5;  // Velocidad horizontal
```

### Three.js Background
Modifica la geometría 3D en `setupThreeJS()`:
```javascript
const geometry = new THREE.PlaneGeometry(20, 20, 32, 32);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,     // Color de la malla
    opacity: 0.1         // Transparencia
});
```

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667+)

## 🚀 Mejoras Futuras Sugeridas

### Funcionalidades Adicionales
- **Modo VR**: Experiencia inmersiva con WebXR
- **Sonidos**: Efectos de audio cyberpunk
- **Gamificación**: Sistema de puntos por explorar roles
- **Exportación**: Generar PDF del portafolio

### Efectos Visuales
- **Shaders**: Efectos de post-procesamiento avanzados
- **Física**: Simulación de partículas más realista
- **3D Models**: Modelos 3D para cada rol
- **WebGL**: Efectos de distorsión y deformación

### Interactividad
- **Drag & Drop**: Reordenar roles interactivamente
- **Zoom**: Vista detallada de cada punto
- **Timeline**: Evolución histórica de cada tecnología
- **Comparación**: Comparar roles lado a lado

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Algunas ideas:
- Mejorar la accesibilidad
- Agregar más idiomas
- Optimizar el rendimiento
- Crear temas adicionales
- Añadir más efectos visuales

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales y comerciales.

## 👨‍💻 Autor

Desarrollado como portafolio tecnológico futurista con las últimas tecnologías web.

---

**¡Explora el futuro de la tecnología con Roles Cyber!** 🚀✨
