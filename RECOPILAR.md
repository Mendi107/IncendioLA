# Recopilar los vídeos sin perder el hilo

Con muchas zonas, el problema no es técnico: es no saber qué vídeo es cuál. El orden
que funciona es **recopilar → nombrar → comprimir → ubicar en el mapa**, y no mezclarlos.

Estructura de trabajo en `D:\IncendioLA`:

```
originales\     todo lo que te llegue, sin tocar (esto NO se publica)
videos\         los .mp4 comprimidos, ya con nombre definitivo
```

---

## 1. Sacar los vídeos de donde estén

**De WhatsApp (lo más habitual).** En el móvil, en cada chat: *Ajustes del chat →
Exportar chat → Incluir archivos*. Te da un ZIP con los vídeos y, muy importante, con la
hora de cada mensaje. Eso te sirve luego para saber a qué momento del incendio
corresponde cada uno. También los tienes en `WhatsApp\Media\WhatsApp Video`, pero ahí
pierdes el contexto de quién lo mandó.

**De WhatsApp Web**, si te viene mejor: `web.whatsapp.com`, descargas uno a uno a
`originales\`.

**De redes sociales** (Twitter/X, Instagram, TikTok, Facebook), con
[yt-dlp](https://github.com/yt-dlp/yt-dlp):

```powershell
winget install yt-dlp.yt-dlp

cd D:\IncendioLA
yt-dlp -o "originales/%(uploader)s-%(id)s.%(ext)s" "URL_DEL_POST"
```

Varios de golpe: pon una URL por línea en un `enlaces.txt` y

```powershell
yt-dlp -a enlaces.txt -o "originales/%(uploader)s-%(id)s.%(ext)s"
```

Dejar el nombre del autor en el archivo te ahorra mucho después, cuando tengas que
acreditar a cada uno.

**Antes de publicar nada de redes**: pide permiso al autor. Un mensaje directo suele
bastar, y así puedes acreditarle con nombre en `zonas.js`. Si alguien no contesta o dice
que no, ese vídeo se queda fuera.

---

## 2. Llevar la cuenta

Con más de diez vídeos te vas a liar. Abre un `inventario.csv` o una hoja de cálculo con
estas columnas y ve rellenando **mientras** los descargas, no después:

```
archivo_original, autor, permiso, fecha_grabacion, que_se_ve, zona_aproximada, hecho
```

- `permiso`: sí / pedido / no. Si no es «sí», no se publica.
- `zona_aproximada`: con «pinar detrás del campo de fútbol» ya te vale para localizarlo
  luego en el mapa.
- `hecho`: lo marcas cuando ya está en el mapa.

Esta es la parte aburrida y es la que de verdad determina si el proyecto sale o se queda
a medias. El código ya está hecho.

---

## 3. Comprimir

Todo lo de `originales\` de una pasada:

```powershell
cd D:\IncendioLA
.\comprimir.ps1
```

Te deja los `.mp4` en `videos\` con nombres limpios y te avisa de los que sigan pesando
más de 15 MB. Si alguno se resiste:

```powershell
.\comprimir.ps1 -Crf 32          # más comprimido
.\comprimir.ps1 -Alto 480        # menos resolución
```

Los originales no se tocan, así que puedes repetir tantas veces como quieras.

---

## 4. Ubicarlos en el mapa

Abre **`editor.html`** con doble clic. No necesita servidor.

1. Clic en el mapa, en el sitio donde se grabó → se crea la zona.
2. Rellenas nombre, paraje, fecha, autor y descripción.
3. **Arrastras el archivo de vídeo desde `videos\` hasta el recuadro del formulario**:
   coge el nombre solo, sin subir nada. Es la forma rápida de encadenar muchos.
4. Si el punto no está fino, arrastras el marcador en el mapa y ya.
5. Cuando lleves un rato, **Descargar zonas.js** y sustituyes el archivo en
   `D:\IncendioLA`. Recarga el editor y sigue donde lo dejaste.

Consejo: descarga cada 10-15 zonas. El editor avisa si intentas cerrar con cambios sin
guardar, pero mejor no fiarse.

Un truco para ubicar: pon el mapa en **Satélite**. Reconocer una pista forestal o una
parcela concreta es muchísimo más fácil sobre la ortofoto que sobre el mapa de calles.

---

## 5. Publicar

Ver `PUBLICAR.md`. Resumido, una vez configurado:

```powershell
git add -A
git commit -m "Añadidas 8 zonas del pinar"
git push
```
