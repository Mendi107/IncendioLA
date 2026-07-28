/* Generado con editor.html — La Adrada, vídeos del incendio.
   Puedes seguir editando a mano; el formato es JavaScript normal.

   Puntos de servicio (ayuntamiento, centro médico, policía, protección civil,
   turismo...) usan el mismo array pero con "categoria" en vez de "videos".
   No cuentan en el resumen de "zonas documentadas": se muestran aparte en el
   mapa (icono propio, capa con botón "Servicios") y en la lista lateral. */

const ZONAS = [

  {
    id: 1,
    nombre: "Colegio Nuevo",
    fecha: "2026-07-26",
    coords: [40.29439, -4.62443],
    videos: [
      { src: "videos/cole-nuevo.mp4" },
      { src: "videos/cole02.mp4", autor: "María" }
    ]
  },

  {
    id: 2,
    nombre: "La Frisla",
    fecha: "2026-07-26",
    coords: [40.30422, -4.63705],
    videos: [
      { src: "videos/la-frisla.mp4" }
    ]
  },

  {
    id: 3,
    nombre: "Antigua Piscina La Nava / Calderón de la Barca",
    fecha: "2026-07-26",
    coords: [40.30361, -4.63076],
    videos: [
      { src: "videos/piscina-la-nava.mp4" },
      { src: "videos/calderon2.mp4", autor: "María" }
    ]
  },

  {
    id: 4,
    nombre: "Vereda Tío Julio / Urb. Grajera",
    fecha: "2026-07-26",
    coords: [40.30792, -4.64666],
    videos: [
      { src: "videos/vereda-tio-julio-con-urbanizacion-grajera.mp4" }
    ]
  },

  {
    id: 5,
    nombre: "Muro de la Vía / Moreras",
    fecha: "2026-07-26",
    coords: [40.30784, -4.63346],
    videos: [
      { src: "videos/via-moreras.mp4" },
      { src: "videos/via.mp4" }
    ]
  },

  {
    id: 6,
    nombre: "Pradollano / Los Barreros",
    fecha: "2026-07-26",
    descripcion: "Chalet afectado (sólo exterior)",
    coords: [40.30167, -4.62227],
    videos: [
      { src: "videos/pradollano.mp4" },
      { src: "videos/2026-07-26-18.mp4" }
    ]
  },

  {
    id: 7,
    nombre: "Urb. Solana ",
    fecha: "2026-07-26",
    coords: [40.30654, -4.62605],
    videos: [
      { src: "videos/2026-07-26-08.mp4" },
      { src: "videos/solana-2507.mp4" }
    ]
  },

  {
    id: 8,
    nombre: "Castaños de la Villa",
    fecha: "2026-07-26",
    autor: "Rafael",
    coords: [40.30773, -4.63534],
    videos: [
      { src: "videos/2026-07-26-13.mp4" }
    ]
  },

  {
    id: 9,
    nombre: "Cementerio / Fábrica Textil",
    fecha: "2026-07-26",
    autor: "María",
    coords: [40.29432, -4.64808],
    videos: [
      { src: "videos/2026-07-26-14.mp4" }
    ]
  },

  {
    id: 10,
    nombre: "Centro del Pueblo ",
    fecha: "2026-07-26",
    autor: "María",
    coords: [40.30132, -4.63664],
    videos: [
      { src: "videos/2026-07-26-15.mp4" }
    ]
  },

  {
    id: 11,
    nombre: "Quesería / Campamento",
    fecha: "2026-07-26",
    autor: "María",
    coords: [40.31219, -4.6582],
    videos: [
      { src: "videos/2026-07-26-17.mp4" }
    ]
  },

  {
    id: 12,
    nombre: "Camino Forestal / Martinete",
    fecha: "2026-07-26",
    coords: [40.31103, -4.63812],
    videos: [
      { src: "videos/2026-07-26-16.mp4" },
      { src: "videos/castanosd.mp4" }
    ]
  },

  {
    id: 13,
    nombre: "La Viña / Gasolinera",
    fecha: "2026-07-26",
    autor: "María",
    coords: [40.30551, -4.64608],
    videos: [
      { src: "videos/2026-07-26-11.mp4" }
    ]
  },

  {
    id: 14,
    nombre: "Ladera CARVIC",
    fecha: "2026-07-26",
    autor: "Aser",
    coords: [40.29486, -4.63252],
    videos: [
      { src: "videos/carvic.mp4" },
      { src: "videos/ladera.mp4", autor: "María" }
    ]
  },

  {
    id: 15,
    nombre: "La Alegría",
    fecha: "2026-07-26",
    coords: [40.30231, -4.64368],
    videos: [
      { src: "videos/alegria.mp4" },
      { src: "videos/alegria2.mp4", autor: "María" }
    ]
  },

  {
    id: 16,
    nombre: "La Cabaña",
    fecha: "2026-07-26",
    coords: [40.30768, -4.65739],
    videos: [
      { src: "videos/cabana.mp4" }
    ]
  },

  {
    id: 19,
    nombre: "El Chorrillo",
    fecha: "2026-07-26",
    coords: [40.30479, -4.6314],
    videos: [
      { src: "videos/chorrillo.mp4" }
    ]
  },

  {
    id: 21,
    nombre: "Los Barreros / Salida del Pueblo",
    fecha: "2026-07-26",
    coords: [40.30129, -4.62576],
    videos: [
      { src: "videos/barreros.mp4" }
    ]
  },

  {
    id: 22,
    nombre: "Vista desde los Depósitos",
    fecha: "2026-07-26",
    autor: "Juan",
    coords: [40.29981, -4.63994],
    videos: [
      { src: "videos/depositos.mp4" },
      { src: "videos/ana02.mp4" }
    ]
  },

  {
    id: 23,
    nombre: "Kioskos / Ermita",
    fecha: "2026-07-26",
    coords: [40.30283, -4.63531],
    videos: [
      { src: "videos/cruceermita.mp4" }
    ]
  },

  {
    id: 24,
    nombre: "El Cauce",
    fecha: "2026-07-26",
    autor: "Oscar",
    coords: [40.30317, -4.64034],
    videos: [
      { src: "videos/elcauce.mp4" }
    ]
  },

  {
    id: 25,
    nombre: "Urb. Ana",
    fecha: "2026-07-27",
    autor: "María",
    coords: [40.29931, -4.62937],
    videos: [
      { src: "videos/ana.mp4" }
    ]
  },

  {
    id: 26,
    nombre: "Martinete / Perrera",
    fecha: "2026-07-27",
    autor: "María",
    coords: [40.31493, -4.64355],
    videos: [
      { src: "videos/perrera.mp4" }
    ]
  },

  {
    id: 27,
    nombre: "Constitución / Góngora",
    fecha: "2026-07-27",
    autor: "María",
    coords: [40.3033, -4.63267],
    videos: [
      { src: "videos/gongora.mp4" }
    ]
  },

  {
    id: 28,
    nombre: "Pico Blanco",
    fecha: "2026-07-27",
    autor: "María",
    coords: [40.30393, -4.64138],
    videos: [
      { src: "videos/picoblanco.mp4" }
    ]
  },

  {
    id: 29,
    nombre: "La Picota",
    fecha: "2026-07-27",
    autor: "María",
    coords: [40.2985, -4.62699],
    videos: [
      { src: "videos/picota.mp4" }
    ],
    fotos: [
      { src: "videos/picota1.jpg", autor: "Aitor" },
      { src: "videos/picota2.jpg", autor: "Aitor" },
      { src: "videos/picota3.jpg", autor: "Aitor" }
    ]
  },

  {
    id: 30,
    nombre: "Carretera",
    fecha: "2026-07-27",
    autor: "Rubén Rua",
    coords: [40.31455, -4.67279],
    videos: [
      { src: "videos/carretera.mp4" }
    ]
  },

  {
    id: 31,
    nombre: "Castillo de La Adrada",
    categoria: "castillo",
    descripcion: "Foto provisional; se sustituirá por una propia.",
    coords: [40.29877, -4.64004],
    fotos: [
      { src: "videos/castillo-commons.jpg", autor: "M. Peinado, CC BY 3.0 / Wikimedia Commons" }
    ]
  },

  {
    id: 32,
    nombre: "Ermita de la Yedra",
    categoria: "religioso",
    coords: [40.30364, -4.63526]
  },

  {
    id: 33,
    nombre: "Iglesia del Salvador",
    categoria: "religioso",
    coords: [40.29965, -4.63444]
  },

  {
    id: 9001,
    nombre: "PRUEBA Ayuntamiento",
    categoria: "ayuntamiento",
    coords: [40.29963, -4.63643]
  },

  {
    id: 9002,
    nombre: "PRUEBA Centro médico",
    categoria: "sanidad",
    coords: [40.30145, -4.63707]
  },

  {
    id: 9003,
    nombre: "PRUEBA Policía",
    categoria: "policia",
    coords: [40.30158, -4.63713]
  },

  {
    id: 9004,
    nombre: "PRUEBA Protección Civil",
    categoria: "proteccion-civil",
    coords: [40.3003, -4.63923]
  },

  {
    id: 9005,
    nombre: "PRUEBA Turismo",
    categoria: "turismo",
    descripcion: "Mirador con vistas al valle.",
    coords: [40.30198, -4.63548]
  },

  {
    id: 9007,
    nombre: "Puente Nuevo / Gorroneras",
    fecha: "2026-07-28",
    coords: [40.29945, -4.66516],
    videos: [
      { src: "videos/28puentenuevo.mp4" }
    ]
  },

  {
    id: 9008,
    nombre: "Carretera / Paraíso / Cabaña",
    fecha: "2026-07-28",
    coords: [40.30867, -4.65289],
    videos: [
      { src: "videos/27cabanaparaiso.mp4" }
    ]
  },

  {
    id: 9009,
    nombre: "Pilón",
    fecha: "2026-07-28",
    autor: "Lopez",
    coords: [40.29611, -4.63967],
    videos: [
      { src: "videos/28pilon.mp4" }
    ]
  },

  {
    id: 9010,
    nombre: "I.E.S. Sierra del Valle",
    fecha: "2026-07-28",
    autor: "María",
    coords: [40.29843, -4.6317],
    videos: [
      { src: "videos/27insti.mp4" }
    ]
  },

  {
    id: 9011,
    nombre: "Navalpino",
    fecha: "2026-07-28",
    autor: "María",
    coords: [40.306, -4.64855],
    videos: [
      { src: "videos/28navalpino.mp4" }
    ]
  }

];
