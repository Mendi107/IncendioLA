# Proyecto: mapa vecinal del incendio de La Adrada

Sitio **estático** que muestra un mapa de La Adrada (Ávila) donde cada punto abre los
vídeos grabados en esa zona durante el incendio. Se publica en GitHub Pages.

Carpeta de trabajo: `D:\IncendioLA`

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La web pública. Todo el CSS y JS va dentro. Sin build. |
| `editor.html` | Herramienta local para dar de alta zonas sobre el mapa y exportar `zonas.js`. **No se publica** (da igual si se sube, pero no se enlaza). |
| `zonas.js` | Los datos: `const ZONAS = [...]`. Es lo único que cambia a diario. |
| `videos/` | Los `.mp4` ya comprimidos que se publican. |
| `originales/` | Vídeos tal como llegaron. **No se sube al repositorio** (ver `.gitignore`). |
| `comprimir.ps1` | Comprime en lote `originales/` → `videos/`. |
| `README.md` | Instrucciones para cualquiera que herede el proyecto. |
| `PUBLICAR.md` | Cómo desplegar y actualizar. |

## Reglas del proyecto

- **Sin framework, sin build, sin dependencias que instalar.** Leaflet entra por CDN.
  Si algo se puede resolver con HTML y JS plano, se resuelve así. Nada de React aquí:
  la idea es que esto siga funcionando dentro de cinco años sin tocar nada.
- **No usar localStorage ni cookies.** No hay analítica ni rastreo.
- `zonas.js` es un `.js` normal (no JSON) a propósito: así `index.html` funciona
  abriéndolo con doble clic, sin servidor local y sin problemas de CORS.
- Cada zona necesita `id` único y numérico. Los ids no se reciclan: si se borra una
  zona, su id no se vuelve a usar (hay enlaces `#z=N` circulando por WhatsApp).
- Los nombres de archivo de vídeo van en minúsculas, sin acentos y sin espacios.
- En ffmpeg **nunca quitar `-movflags +faststart`**: sin eso el vídeo no empieza a
  reproducirse hasta descargarse entero.
- Límite duro de GitHub: **100 MB por archivo**. Objetivo práctico: menos de 15 MB por
  vídeo. Lo que no baje de ahí va a YouTube y se referencia con el campo `youtube`.
- Textos de la interfaz en español, tono sobrio. Esto documenta un incendio, no es un
  escaparate: sin emojis y sin lenguaje épico.

## Tareas habituales

Cosas que se piden a menudo en esta carpeta:

- «Comprime lo que hay en `originales/`» → `.\comprimir.ps1`
- «Añade estas zonas a `zonas.js`» → editar el array respetando el orden de campos que
  ya usa el archivo y verificando que no se repiten ids.
- «Revisa que todos los `src` de `zonas.js` existan en `videos/`» → comprobar rutas y
  listar las que falten y los vídeos huérfanos que no estén referenciados.
- «Publica los cambios» → `git add -A`, commit con mensaje descriptivo en español, `git push`.
  GitHub Pages redespliega solo en un minuto.

## Cosas que NO hay que hacer

- No añadir `originales/` a git.
- No renombrar archivos de `videos/` sin actualizar `zonas.js` a la vez.
- No meter datos personales de vecinos en `zonas.js` más allá del nombre con el que
  cada uno haya aceptado que se le acredite.
