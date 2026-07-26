# La Adrada · vídeos del incendio

Mapa vecinal: cada punto del mapa abre los vídeos grabados en esa zona.
Sitio 100 % estático, sin base de datos, sin servidor y sin claves de API.

```
index.html      la web entera (no hace falta tocarla)
editor.html     editor visual: crea zonas sobre el mapa y exporta zonas.js
zonas.js        los puntos y sus vídeos  ← los datos
videos/         los vídeos ya comprimidos que se publican
originales/     vídeos tal como llegaron (no se publica)
comprimir.ps1   comprime originales/ → videos/ en lote
RECOPILAR.md    cómo reunir, nombrar y ubicar muchos vídeos
PUBLICAR.md     cómo ponerlo online y actualizarlo
CLAUDE.md       contexto del proyecto para Claude Code
```

**Si tienes muchas zonas, no edites `zonas.js` a mano: abre `editor.html`.**
Creas los puntos haciendo clic en el mapa, rellenas el formulario, arrastras los archivos
de vídeo para coger sus nombres, y te exporta el `zonas.js` completo.

Para verlo en local: **abre `index.html` con doble clic**. Funciona tal cual,
sin `npm install` ni servidor. Si prefieres servidor: `npx serve .`

---

## 1. Añadir una zona

1. Abre la web y pulsa **Añadir zona** (abajo a la derecha).
2. Haz clic en el mapa donde se grabó el vídeo. Te aparece un bloque de código ya escrito.
3. **Copiar**, y pégalo dentro de `ZONAS` en `zonas.js`, justo antes del `];` final.
4. Rellena `nombre`, `descripcion`, `autor` y el nombre del archivo de vídeo.

Borra las dos zonas de ejemplo cuando tengas las tuyas.

### Vídeo local

```js
videos: [{ src: "videos/pinar-chorrera.mp4", titulo: "Desde la pista" }]
```

### Vídeo de YouTube (recomendado si pesa mucho)

```js
videos: [{ youtube: "dQw4w9WgXcQ", titulo: "Misma zona por la tarde" }]
```

El ID es lo que va después de `v=` en la URL de YouTube.

### Varios vídeos en la misma zona

```js
videos: [
  { src: "videos/toma-1.mp4", titulo: "Mañana", autor: "Vecino" },
  { src: "videos/toma-2.mp4", titulo: "Tarde" }
]
```

### Perímetro quemado aproximado

Opcional. Con el modo **Añadir zona** ve capturando puntos del contorno y ponlos en `area`:

```js
area: [[40.3120, -4.6460], [40.3130, -4.6370], [40.3070, -4.6350]]
```

### Compartir un punto concreto

La URL cambia sola al abrir una zona: `.../#z=3`. Ese enlace abre directamente ese vídeo.
Útil para los grupos de WhatsApp del pueblo.

### Punto de posible reactivación (sin vídeo)

Para marcar un sitio donde el fuego se pudo haber reavivado, sin necesidad de vídeo,
añade `tipo: "reactivacion"`. Sale en el mapa en rojo con una llama, en vez del número normal:

```js
{
  id: 15,
  nombre: "Ladera detrás del pinar",
  fecha: "2026-07-27",
  descripcion: "Se ve humo de nuevo desde la carretera",
  tipo: "reactivacion",
  coords: [40.3050, -4.6400]
}
```

En la propia web pública hay un botón **"Posible reactivación"** junto a "Añadir zona" que
genera este mismo bloque solo con hacer clic en el mapa.

---

## 2. Comprimir los vídeos (importante)

Un vídeo de móvil sin tocar puede pesar 200 MB. La gente lo va a abrir con datos móviles.
Con [ffmpeg](https://ffmpeg.org/):

```bash
ffmpeg -i original.mp4 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow \
       -c:a aac -b:a 96k -movflags +faststart videos/salida.mp4
```

- `scale=-2:720` → baja a 720p, más que suficiente.
- `crf 28` → sube a 30-32 si necesitas menos peso; baja a 24 si quieres más calidad.
- `+faststart` → empieza a reproducirse sin descargar el archivo entero. No lo quites.

Todos los `.mp4` de una carpeta a la vez:

```bash
for f in *.mp4; do
  ffmpeg -i "$f" -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow \
         -c:a aac -b:a 96k -movflags +faststart "videos/${f%.*}-web.mp4"
done
```

Objetivo razonable: **menos de 15 MB por vídeo**. Si alguno no baja de ahí, súbelo a YouTube
y usa el campo `youtube`.

---

## 3. Publicarlo gratis

### Opción A — GitHub Pages

1. Crea un repositorio **público** en GitHub (por ejemplo `mapa-incendio-la-adrada`).
2. Sube la carpeta completa (arrastrando los archivos en *Add file → Upload files*, o con git).
3. *Settings → Pages → Source: Deploy from a branch → main / (root) → Save*.
4. En un minuto está en `https://tu-usuario.github.io/mapa-incendio-la-adrada/`.

Límites: **100 MB por archivo**, y conviene no pasar de ~1 GB de repositorio.
Con los vídeos comprimidos entran de sobra unas cuantas decenas.

### Opción B — Vercel

Entra en `vercel.com/new`, arrastra la carpeta y listo. Sin configuración: detecta que es
estático. Plan Hobby: gratis, 100 GB de tráfico al mes.
Para actualizar, si lo conectas al repo de GitHub se redespliega solo en cada commit.

Con cualquiera de las dos puedes poner un dominio propio más adelante.

---

## 4. Un par de cosas antes de publicar

- **Pide permiso** a quien grabó cada vídeo y ponle su crédito en `autor`. Muchos circulan
  por WhatsApp sin saber de quién son.
- Revisa que no se vean **matrículas, caras identificables o interiores de casas** de terceros.
- El pie de la lista ya incluye un aviso para que cualquiera pueda pedir que se retire su vídeo.
- Si el ayuntamiento o la asociación de vecinos lo quiere asumir, el proyecto se traspasa
  cambiando de cuenta el repositorio, sin tocar nada del código.

---

## Detalles técnicos

- Mapa: [Leaflet](https://leafletjs.com/) 1.9.4 desde CDN.
- Capas: OpenStreetMap y ortofoto de Esri World Imagery. Las dos gratuitas y sin clave.
  El botón **Satélite** ayuda mucho a reconocer parcelas y pistas forestales.
- Sin cookies, sin analítica, sin dependencias que instalar.
- Los vídeos usan `preload="metadata"`: no se descargan hasta que alguien le da al play.
- Funciona con teclado (Esc cierra) y en móvil (la lista y el vídeo suben como panel inferior).
