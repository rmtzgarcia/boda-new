# Boda Ricardo & Luisa — contexto del proyecto

Web de invitación y guía de viaje para la boda.
**2 de abril de 2027 (viernes) · Finca La Victoria, Subachoque, Cundinamarca, Colombia.**

Este archivo es la memoria compartida del proyecto. Lo leen los dos, y lo lee
Claude al empezar cualquier sesión. **Si cambias algo importante, actualízalo.**

---

## Quiénes editan

Ricardo y Luisa trabajan sobre el mismo repositorio, cada uno desde su propio
Claude. Antes de empezar a trabajar: `git pull`. Al terminar: `commit` y `push`.
Si los dos vais a tocar la web el mismo día, decíroslo — así nadie pierde trabajo.

---

## Archivos

| Archivo | Qué es | Quién lo toca |
|---|---|---|
| `index.html` | Los **textos** y la estructura de la página | Cualquiera |
| `estilo.css` | Colores, tipografías, espacios | Con más cuidado |
| `guion.js` | Carrusel, cuenta atrás, música, envío del RSVP | Con más cuidado |
| `fotos/` | Las 3 fotos del carrusel de portada | — |
| `tips-colombia-luisa-ricardo-v2.html` | **Guía del invitado**: consejos, programa, vestuario y dudas | Cualquiera |

`index.html` no funciona solo: necesita `estilo.css`, `guion.js` y `fotos/`
en la misma carpeta.

---

## Decisiones ya tomadas (no rehacer)

- **Paleta**: sacada de un moodboard de tierras, oliva y bosque. Está en el
  bloque `:root` de `estilo.css` como variables `--p-*`. Fondo muy claro
  (marfil) por preferencia expresa. Contraste comprobado en las 12
  combinaciones de texto y fondo: todas pasan el mínimo de accesibilidad.
- **Música**: «Asilo», de Jorge Drexler y Mon Laferte, con el reproductor
  oficial de Spotify. Se descartó alojar un MP3 por derechos de autor: la web
  va a ser pública. Un clic en la clave de sol arranca la canción vía la API
  de embeds. **Quien no tenga sesión de Spotify oye solo unos 30 segundos** —
  limitación de Spotify, no del código.
- **Carrusel**: 3,2 segundos por foto, rota siempre (no se pausa al pasar el
  ratón, fue una petición explícita). Velocidad en `CAR_MS` dentro de `guion.js`.
- **Fotos**: reducidas a 1200 px y **sin metadatos EXIF**. Los originales
  llevaban coordenadas GPS. Si añades fotos nuevas, quítaselos igual.
- **Consejos de seguridad**: la sección "Cuatro cositas de nada" viene del
  flyer impreso. La tarjeta de "Seguridad" en Colombia práctica se recortó
  a propósito para no repetir lo mismo dos veces.
- **El sitio se llama «Hacienda La Victoria»**, no Finca (corregido en agosto
  de 2026). Ojo al escribir textos nuevos.
- **La sección «Detalles del evento»** (id `lugar` en el HTML) concentra ahora
  ceremonia, ubicación, parqueadero, transporte y vestuario. La ceremonia es
  **religiosa**; la hora, 4:00 p.m., sigue siendo tentativa y está marcada
  como dato por confirmar.
  Va en **cuatro tarjetas, rejilla de 2×2**. Se quitó el mapa incrustado de
  Google porque descuadraba la sección; queda el enlace a Google Maps y las
  coordenadas dentro de la tarjeta «Dónde es». Si añadís una quinta tarjeta,
  la fila de abajo queda coja: mejor fusionarla con otra o añadir dos.
- **Transporte**: no hay buses de la boda. Quien quiera puede contratarlo por
  su cuenta con **TransRubio** (cotizaciones@transrubio.com.co). Es una
  gestión independiente, y así está redactado en la web para que nadie
  entienda que lo organizamos nosotros.
- **Programa, vestuario y preguntas frecuentes: eliminados** (decisión de
  agosto de 2026). Esas tres secciones ya no existen en ningún sitio — ni en
  la web ni en el flyer. Se borraron también sus estilos del CSS.
  **El flyer `tips-colombia-luisa-ricardo-v2.html`** es una hoja suelta
  imprimible con los cuatro consejos de seguridad y nada más. En agosto de
  2026 dejó de ser intocable: ahora está también en inglés (ver más abajo).
  Su contenido sigue sin ampliarse: solo los cuatro consejos.
  Se enlaza desde dos sitios de la web: la entrada "Tips básicos" del menú
  y el botón del final de "Cuatro cositas de nada".
  Si algún día hace falta publicar horarios o código de vestimenta, habrá que
  crear una página nueva, no reutilizar el flyer.

- **La web va por pestañas, no por scroll** (agosto de 2026). Cada sección
  vive dentro de un `<div class="vista">` y el menú cambia de una a otra.
  El bloque **VISTAS** de `guion.js` hace el cambio, guiándose por el hash de
  la URL, así que `#rsvp`, `#hospedaje`… siguen funcionando y los botones
  atrás/adelante del navegador también.
  **Si el JavaScript falla, se ven todas las secciones seguidas** y la web
  vuelve a ser de scroll: el `<body>` solo recibe la clase `pestanas` cuando
  el JS llega hasta el final. Es una red de seguridad, no un descuido.
  La portada completa (fotos, cuenta regresiva, fecha y botones) solo se ve
  en la pestaña de Inicio; en las demás queda la firma con los nombres.

- **Español e inglés en la misma página** (agosto de 2026). Cada texto está
  escrito **dos veces**, con `lang="es"` y `lang="en"` uno al lado del otro,
  y el CSS esconde el que no toca. Al editar un texto **hay que cambiar las
  dos versiones**: están pegadas justo para que no se olvide.
  El español es siempre lo que se ve primero. La elección se guarda en el
  navegador del invitado y **se comparte con el flyer**: quien pone la web en
  inglés abre la hoja de consejos también en inglés.
  ⚠ Los botones del selector ES|EN **no llevan `lang`**: si lo llevaran, se
  esconderían a sí mismos al cambiar de idioma.
  ⚠ Las opciones del desplegable "¿Nos acompañas?" van **en los dos idiomas
  a la vez** ("Sí, allí estaré / Yes, I will be there") y con `value=` fijo en
  español. Si cambiaran según el idioma, las respuestas en inglés no
  coincidirían con el Google Form y **se perderían sin aviso**.

- **Caché: `?v=N` en el CSS y el JS.** `index.html` enlaza
  `estilo.css?v=7` y `guion.js?v=7`. Netlify cachea esos archivos con fuerza,
  así que **si cambias uno de los dos y no ves el cambio, sube el número**.
  Sin eso, hay invitados que seguirían viendo la versión anterior.

- **No hay buses** (agosto de 2026). La sección de hospedaje prometía
  "los buses de la boda" desde Bogotá; se quitó porque no va a haber.
  No queda ninguna mención en la web ni en el flyer.

- **El teléfono de la wedding planner no es público.** En el pie solo aparece
  su nombre y que ella contactará a los invitados. El WhatsApp que sigue en
  la web (sección RSVP) hay que revisarlo: es el mismo número.

- **Apps de transporte: Uber, DiDi, Yango e InDrive.** Cabify se eliminó de
  todas partes por estar desactualizada.

---

## RSVP — cómo funciona

El formulario de la web envía por detrás a un Google Form; las respuestas caen
en su hoja de cálculo. La configuración está en `guion.js`, bloque
**ENVÍO DEL RSVP**: `GFORM` (la URL) y `CAMPOS` (un identificador por pregunta).

Son **7 preguntas**: nombre, correo, si nos acompaña, número de personas,
procedencia, alergias y comentarios.

**Reglas del Google Form que no se pueden romper:**

- Todas las preguntas de tipo *respuesta corta* (la última, párrafo).
  Si alguna se pone como opción múltiple, rechaza los textos que no coincidan
  exactamente y esas respuestas **se pierden sin ningún aviso**.
- Ninguna pregunta obligatoria.
- "Recopilar direcciones de correo" en **No recopilar**, y sin limitar a una
  respuesta por persona: ambas obligan a iniciar sesión en Google y bloquearían
  el envío desde la web.

**Aviso importante:** si algún día cambias las preguntas del formulario, los
identificadores dejan de coincidir y las confirmaciones se pierden en silencio,
sin que la web dé error. Después de tocar el formulario, haz siempre un envío
de prueba y comprueba que la fila aparece en la hoja.

---

## Qué falta por hacer

- [ ] **Número de WhatsApp**: sigue el relleno `+57 XXX XXX XXXX` en tres
      sitios de `index.html`. Es lo más urgente.
- [ ] **Decidir el WhatsApp del RSVP**: hoy es el número de Julieth. Cambiarlo
      por el vuestro, quitarlo, o dejarlo si es el canal oficial.
- [ ] Traducir al inglés los datos que faltan cuando se rellenen los `ph`
      (los textos ya están duplicados; falta el dato en sí).
- [ ] Dirección exacta de la finca y enlace real del pin de Google Maps.
- [ ] Fecha límite de confirmación (ahora puesta como 2 de enero de 2027).
- [ ] Datos para los regalos y enlace de la mesa de regalos.
- [ ] Borrar el aviso "Versión borrador" antes de publicar (`div.draft-banner`).
- [ ] **Quitar el bloqueo a buscadores** cuando la web esté lista: la etiqueta
      `<meta name="robots" content="noindex, nofollow">` de `index.html` y el
      archivo `robots.txt` entero. Si no, la web no aparecerá nunca en Google.
- [x] ~~Unificar el orden de los nombres.~~ Resuelto en agosto de 2026:
      **el orden oficial es "Luisa & Ricardo"**, como ya venía en el flyer.
      Cambiado en la web (título, portada, firma, textos alternativos),
      en el monograma (ahora "L & R") y en las invitaciones digitales.
      Si se añade cualquier material nuevo, respetar ese orden.

Los datos pendientes están marcados en la web con `class="ph"` y se ven en
pantalla con un subrayado punteado dorado. Para encontrarlos: buscar `class="ph"`.
Cuando un dato sea definitivo, quitar el `ph` de esa etiqueta.

---

## Notas de mantenimiento

- Antes de publicar, repasar que no queda ningún `ph` sin resolver.
- Una semana antes de la fecha límite del RSVP, repetir la prueba de envío.
- La web se despliega en Netlify desde este repositorio: al hacer `push`,
  el sitio se actualiza solo en un minuto.
