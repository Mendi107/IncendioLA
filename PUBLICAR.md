# Publicar el mapa

Objetivo: una URL pública que cualquiera del pueblo pueda abrir desde el móvil. Gratis.

Hay dos caminos. **Si es tu primera vez, haz el A**: son cinco minutos y no necesitas
instalar nada. El B es para las actualizaciones del día a día.

---

## A. La primera publicación (por la web, sin instalar nada)

1. Crea una cuenta en [github.com](https://github.com) si no tienes.
2. Arriba a la derecha, **+ → New repository**.
   - Nombre: `mapa-incendio-la-adrada`
   - Marca **Public** (obligatorio: con cuenta gratuita, Pages solo funciona en repos públicos).
   - No marques nada más. **Create repository**.
3. En la página que sale, pincha en **uploading an existing file**.
4. Arrastra desde `D:\IncendioLA` **el contenido** de la carpeta: `index.html`, `zonas.js`,
   `editor.html`, `README.md`, y la carpeta `videos`.
   **No arrastres la carpeta `originales`**: pesa muchísimo y no hace falta.
   Ojo: hay que subir los archivos sueltos y la carpeta `videos`, no una carpeta que los
   contenga a todos, o el sitio quedará en una subruta.
5. Abajo, **Commit changes**.
6. Ve a **Settings** (pestaña de arriba) → **Pages** (menú izquierdo).
   - *Source*: `Deploy from a branch`
   - *Branch*: `main` y carpeta `/ (root)` → **Save**
7. Espera un minuto y recarga esa página. Aparecerá el enlace:

```
https://TU-USUARIO.github.io/mapa-incendio-la-adrada/
```

Ese es el enlace que pasas por WhatsApp. Ya está público.

---

## B. Actualizar desde tu PC (lo que harás cada día)

Una vez publicado, subir cambios es un comando. Necesitas Git instalado:

```powershell
winget install Git.Git
```

Cierra PowerShell, abre otro, y **la primera vez** conecta la carpeta con el repositorio:

```powershell
cd D:\IncendioLA
git init
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mapa-incendio-la-adrada.git
git add -A
git commit -m "Estado inicial del mapa"
git push -u origin main
```

Te pedirá autenticarte con GitHub la primera vez (se abre el navegador).

**A partir de ahí, cada vez que añadas zonas o vídeos:**

```powershell
cd D:\IncendioLA
git add -A
git commit -m "Añadidas 6 zonas del pinar norte"
git push
```

En un minuto está online. No hay que tocar nada más.

Si usas Claude Code en esta carpeta, con decir «publica los cambios» hace estos tres
comandos por ti y escribe el mensaje del commit.

---

## Límites que conviene tener presentes

| | Límite |
|---|---|
| Tamaño de un archivo | **100 MB** (GitHub lo rechaza sin más) |
| Tamaño del repositorio | 1 GB recomendado, avisan a partir de ahí |
| Tráfico | 100 GB al mes (de sobra para un pueblo) |

Con los vídeos a 720p y unos 10 MB cada uno, caben tranquilamente 60-80 vídeos.
Cuando te acerques al límite, los más pesados a YouTube y en `zonas.js` usas
`{ youtube: "ID" }` en lugar de `{ src: "videos/..." }`.

---

## Si algo va mal

**Sale un 404 al abrir la URL.**
`index.html` tiene que estar en la raíz del repositorio, no dentro de una subcarpeta.
Si al subir se creó una carpeta intermedia, la URL será
`.../mapa-incendio-la-adrada/nombre-de-la-carpeta/`.

**El mapa aparece pero los vídeos no cargan.**
Comprueba que la ruta en `zonas.js` coincide **exactamente** con el nombre del archivo,
incluidas mayúsculas: en GitHub `Pinar.mp4` y `pinar.mp4` son archivos distintos, aunque
en Windows te funcionase.

**El vídeo tarda mucho en arrancar.**
Le falta el `-movflags +faststart` al comprimirlo. Vuelve a pasarlo con `comprimir.ps1`.

**Un vídeo no se reproduce en iPhone.**
Tiene que ser H.264 + AAC en `.mp4`. `comprimir.ps1` ya lo deja así; el problema suele
ser haber subido el original sin comprimir.

**He subido los cambios y sigo viendo lo de antes.**
Caché del navegador. Recarga con Ctrl+F5, o en el móvil espera un par de minutos.

---

## Más adelante

- **Dominio propio**: si compras algo tipo `incendiolaadrada.es`, se apunta desde
  *Settings → Pages → Custom domain*. GitHub da el certificado HTTPS gratis.
- **Traspasarlo al ayuntamiento o a la asociación de vecinos**: *Settings → Transfer
  ownership*. Cambia de dueño el repositorio y la web sigue funcionando; solo cambia la
  parte del usuario en la URL.
