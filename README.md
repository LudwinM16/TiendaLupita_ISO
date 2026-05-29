# TiendaLupita_ISO
---

# SILC - Sistema de Inventario y Liquidación para Comercios 🛒

SILC es una solución tecnológica web diseñada para automatizar y optimizar la gestión de inventario y el proceso de liquidación de ventas en establecimientos de comercio al por menor. Este proyecto fue desarrollado específicamente para "Tienda Lupita", una microempresa salvadoreña, con el objetivo de reducir errores operativos, evitar pérdidas económicas y mejorar la toma de decisiones comerciales.

Proyecto desarrollado para la cátedra de **Ingeniería de Software** de la **Universidad Don Bosco, El Salvador**.

## 🚀 Características Principales

* **Gestión de Inventario (CRUD):** Permite registrar, consultar, agregar y editar el stock de productos en tiempo real.


* **Punto de Venta (POS):** Módulo de ventas con búsqueda rápida de productos, cálculo automático de totales y descuento inmediato de las existencias en inventario.


* **Alertas Visuales Automáticas:** Notificaciones dinámicas y resaltado en color rojo para productos que cuentan con un stock bajo (menos de 3 unidades en existencia).


* **Generación de Reportes:** Capacidad para generar informes de los productos más vendidos y exportarlos en formato PDF.


* **Interfaz Responsiva:** Diseño accesible, moderno e intuitivo, pensado para usuarios sin conocimientos técnicos avanzados.



## 🛠️ Stack Tecnológico

El proyecto utiliza un entorno de desarrollo basado en tecnologías de fácil acceso y de código abierto:

* **Frontend:** HTML5, CSS3, JavaScript, Bootstrap.


* **Backend:** PHP.


* **Base de Datos:** MySQL (gestionada mediante phpMyAdmin).


* **Entorno Local:** XAMPP o WAMP.


* **Despliegue Planificado:** x10hosting (Hosting gratuito).



## 📂 Estructura del Repositorio

La arquitectura del proyecto está organizada de la siguiente manera:

```text
/
├── css/             # Hojas de estilo CSS personalizadas y Bootstrap
├── database/        # Scripts SQL para la creación y población de la base de datos
├── docs/            # Documentación técnica del proyecto (diagramas, manuales)
├── js/              # Scripts JavaScript para la interactividad del frontend
├── php/             # Lógica de negocio del backend (inventario, ventas, reportes, conexión)
├── app.html         # Interfaz principal de la aplicación
├── index.html       # Pantalla de acceso / Login
└── README.md        # Documentación del repositorio

```

## ⚙️ Instalación y Uso Local

Para ejecutar este proyecto en un entorno local, sigue los siguientes pasos:

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/TiendaLupita_ISO.git

```


2. **Preparar el entorno del servidor:**
* Mueve la carpeta del proyecto al directorio raíz de tu servidor local (por ejemplo, `htdocs` en XAMPP o `www` en WAMP).




3. **Configurar la Base de Datos:**
* Abre phpMyAdmin en tu navegador (usualmente `http://localhost/phpmyadmin`).


* Crea una base de datos nueva.
* Importa el archivo `.sql` ubicado dentro de la carpeta `database/`.




4. **Configurar la Conexión:**
* Dirígete a la carpeta `php/` y abre el archivo `config.php` (o `conexion.php`).
* Actualiza las credenciales de conexión (usuario, contraseña, nombre de la base de datos) para que coincidan con tu configuración local.




5. **Ejecutar el sistema:**
* Abre tu navegador web e ingresa a `http://localhost/TiendaLupita_ISO/index.html`.



## 👥 Equipo de Desarrollo

Este sistema fue desarrollado bajo el marco de trabajo **Scrum** por el siguiente equipo universitario:

* **Herbert William Solano Vasquez** - *Scrum Master / Gestor del Proyecto* 


* **Carlos Adalberto Campos Hernandez** - *Product Owner / Analista de Sistemas* 


* **Fernando David Juarez Dimas** - *Desarrollador Front End y Diseñador UI/UX* 


* **Ludwin Enrique Martinez Alfaro** - *Desarrollador Backend* 


* **Roger Eduardo Vasquez Portillo** - *Administrador de Base de Datos y Control de Calidad (QA)* 



**Docente Asesor:** Guillermo David González Monterroza.

## 📄 Licencia y Aspectos Legales

El código fuente, el diseño de interfaces y la documentación técnica son propiedad intelectual del equipo de desarrollo, protegidos bajo la Ley de Propiedad Intelectual de El Salvador. Se concede a Tienda Lupita una licencia de uso gratuita, no exclusiva y no transferible con fines no comerciales.

Las bibliotecas y frameworks utilizados (Bootstrap, PHP, MySQL) se rigen por sus respectivas licencias de código abierto.
