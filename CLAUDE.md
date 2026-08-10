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
| `tips-colombia-luisa-ricardo-v2.html` | Flyer imprimible, se enlaza desde la web | — |

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
- [ ] Datos de la wedding planner (nombre y correo).
- [ ] Dirección exacta de la finca y enlace real del pin de Google Maps.
- [ ] Horarios definitivos del programa de los tres días.
- [ ] Hoteles con bloqueo de habitaciones y fecha límite de reserva.
- [ ] Decidir la política de niños (hay dos redacciones alternativas en el FAQ).
- [ ] Fecha límite de confirmación (ahora puesta como 2 de enero de 2027).
- [ ] Datos para los regalos y enlace de la mesa de regalos.
- [ ] Borrar el aviso "Versión borrador" antes de publicar (`div.draft-banner`).
- [ ] Unificar el orden de los nombres: la web dice "Ricardo & Luisa" y el
      flyer "Luisa y Ricardo".

Los datos pendientes están marcados en la web con `class="ph"` y se ven en
pantalla con un subrayado punteado dorado. Para encontrarlos: buscar `class="ph"`.
Cuando un dato sea definitivo, quitar el `ph` de esa etiqueta.

---

## Notas de mantenimiento

- Antes de publicar, repasar que no queda ningún `ph` sin resolver.
- Una semana antes de la fecha límite del RSVP, repetir la prueba de envío.
- La web se despliega en Netlify desde este repositorio: al hacer `push`,
  el sitio se actualiza solo en un minuto.
