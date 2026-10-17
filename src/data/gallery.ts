import type { StaticImageData } from "next/image";

// Static imports give Next.js intrinsic dimensions and blur placeholders.
import acoVopsit from "../../public/images/projekte/aco-vopsit.jpeg";
import acopFrumos from "../../public/images/projekte/acop-frumos.jpeg";
import acopJuma2 from "../../public/images/projekte/acop-juma-2.jpeg";
import acopJumateGata from "../../public/images/projekte/acop-jumate-gata.jpeg";
import acoperisCentral3 from "../../public/images/projekte/acoperis-central3.jpeg";
import acoperis from "../../public/images/projekte/acoperis.jpeg";
import acoperix from "../../public/images/projekte/acoperix.jpeg";
import asta444 from "../../public/images/projekte/asta444.jpeg";
import dulgherie3 from "../../public/images/projekte/dulgherie-3.jpeg";
import dulgherie from "../../public/images/projekte/dulgherie.jpeg";
import hidroizolatie2 from "../../public/images/projekte/hidroizolatie-2.jpeg";
import hidroizolatie from "../../public/images/projekte/hidroizolatie.jpeg";
import imbinareAcop from "../../public/images/projekte/imbinare-acop.jpeg";
import imbinareAcoperis from "../../public/images/projekte/imbinare-acoperis.jpeg";
import inac25 from "../../public/images/projekte/inac-25.jpeg";
import renoAcop01 from "../../public/images/projekte/reno-acop-01.jpeg";
import renoAcop02 from "../../public/images/projekte/reno-acop-02.jpeg";
import renoAcop03 from "../../public/images/projekte/reno-acop-03.jpeg";
import renoAcop20 from "../../public/images/projekte/reno-acop-20.jpeg";
import renoAcop21 from "../../public/images/projekte/reno-acop-21.jpeg";
import renoAcop22 from "../../public/images/projekte/reno-acop-22.jpeg";
import renoAcop31 from "../../public/images/projekte/reno-acop-31.jpeg";
import renoAcop32 from "../../public/images/projekte/reno-acop-32.jpeg";
import renoAcop33 from "../../public/images/projekte/reno-acop-33.jpeg";
import sistPluvial3 from "../../public/images/projekte/sist-pluvial-3.jpeg";
import sistPluvial4 from "../../public/images/projekte/sist-pluvial-4.jpeg";
import sistPluvial from "../../public/images/projekte/sist-pluvial.jpeg";
import sistemPluvial from "../../public/images/projekte/sistem-pluvial.jpeg";
import tablaAcop from "../../public/images/projekte/tabla-acop.jpeg";
import tabla from "../../public/images/projekte/tabla.jpeg";
import tiglaAranjata from "../../public/images/projekte/tigla-aranjata.jpeg";
import tiglaCeramica1 from "../../public/images/projekte/tigla-ceramica-1.jpeg";
import tiglaCeramica2 from "../../public/images/projekte/tigla-ceramica-2.jpeg";
import tiglaMetalica05 from "../../public/images/projekte/tigla-metalica-05grosime.jpeg";
import tiglaMetalica from "../../public/images/projekte/tigla-metalica.jpeg";
import tiglaTipSolzi from "../../public/images/projekte/tigla-tip-solzi.jpeg.jpeg";

/** Portfolio category ids used for Referenzen section anchors. */
export type PortfolioCategory =
  | "dachsanierung"
  | "ziegeldaecher"
  | "metalldaecher"
  | "flachdach"
  | "spengler"
  | "dachstuhl";

export type GalleryPhoto = {
  id: string;
  file: string;
  src: StaticImageData;
  alt: string;
  caption: string;
  category: PortfolioCategory;
  /** CSS object-position for responsive cropping when needed. */
  objectPosition?: string;
};

/** Helper keeps registry entries consistent and typed. */
function photo(
  id: string,
  file: string,
  src: StaticImageData,
  alt: string,
  caption: string,
  category: PortfolioCategory,
  objectPosition?: string,
): GalleryPhoto {
  return { id, file, src, alt, caption, category, objectPosition };
}

/** Full photo registry — filenames match files in public/images/projekte exactly. */
export const photos = {
  acoVopsit: photo(
    "aco-vopsit",
    "aco-vopsit.jpeg",
    acoVopsit,
    "Dachbeschichtung in Arbeit: orangefarbene Ziegel und frisch aufgetragene dunkelgraue Beschichtung",
    "Dachbeschichtung im Übergang",
    "dachsanierung",
  ),
  acopFrumos: photo(
    "acop-frumos",
    "acop-frumos.jpeg",
    acopFrumos,
    "Fertiges anthrazitfarbenes Metalldach auf einem modernen weißen Wohnhaus",
    "Fertiges Metalldach",
    "metalldaecher",
  ),
  acopJuma2: photo(
    "acop-juma-2",
    "acop-juma-2.jpeg",
    acopJuma2,
    "Rote Metalldachplatten und Unterspannbahn während der Montage",
    "Metalldach während der Eindeckung",
    "metalldaecher",
  ),
  acopJumateGata: photo(
    "acop-jumate-gata",
    "acop-jumate-gata.jpeg",
    acopJumateGata,
    "Teilweise neu eingedecktes Ziegeldach mit Dachfenstern und freiliegender Unterspannbahn",
    "Teilweise erneuerte Ziegeldeckung",
    "ziegeldaecher",
  ),
  acoperisCentral3: photo(
    "acoperis-central3",
    "acoperis-central3.jpeg",
    acoperisCentral3,
    "Luftaufnahme eines sanierten Ziegeldachs in einer historischen Straßenzeile",
    "Saniertes Ziegeldach aus der Luft",
    "ziegeldaecher",
  ),
  acoperis: photo(
    "acoperis",
    "acoperis.jpeg",
    acoperis,
    "Frisch verlegtes Ziegeldach auf einem Wohnhaus mit Baugerüst",
    "Neue Ziegeldeckung",
    "ziegeldaecher",
    "center 35%",
  ),
  acoperix: photo(
    "acoperix",
    "acoperix.jpeg",
    acoperix,
    "Fertiges anthrazitfarbenes Metalldach mit First und Anschlüssen",
    "Fertiges Metalldach mit Details",
    "metalldaecher",
  ),
  asta444: photo(
    "asta444",
    "asta444.jpeg",
    asta444,
    "Anthrazitfarbenes Metalldach mit Dachfenster und Firstabschluss",
    "Metalldach mit Dachfenster",
    "metalldaecher",
  ),
  dulgherie3: photo(
    "dulgherie-3",
    "dulgherie-3.jpeg",
    dulgherie3,
    "Unterspannbahn und Holzlattung während einer Dachsanierung",
    "Lattung und Unterkonstruktion",
    "dachstuhl",
  ),
  dulgherie: photo(
    "dulgherie",
    "dulgherie.jpeg",
    dulgherie,
    "Neu errichteter Dachstuhl aus Holz mit Gaube während der Bauphase",
    "Dachstuhl und Gaube",
    "dachstuhl",
  ),
  hidroizolatie2: photo(
    "hidroizolatie-2",
    "hidroizolatie-2.jpeg",
    hidroizolatie2,
    "Flachdachabdichtung mit Bitumenbahn in einer Innenecke",
    "Flachdachabdichtung Innenecke",
    "flachdach",
    "center center",
  ),
  hidroizolatie: photo(
    "hidroizolatie",
    "hidroizolatie.jpeg",
    hidroizolatie,
    "Professionelle Flachdachabdichtung mit Bitumenbahn an der Attika",
    "Flachdachabdichtung an der Attika",
    "flachdach",
    "center center",
  ),
  imbinareAcop: photo(
    "imbinare-acop",
    "imbinare-acop.jpeg",
    imbinareAcop,
    "First- und Gratanschlüsse sowie Schneefanghaken auf einem Metalldach",
    "First, Grat und Schneefang",
    "spengler",
  ),
  imbinareAcoperis: photo(
    "imbinare-acoperis",
    "imbinare-acoperis.jpeg",
    imbinareAcoperis,
    "Dachdecker bei der Montage eines anthrazitfarbenen Metalldachs mit Kaminanschluss",
    "Kaminanschluss und First",
    "spengler",
  ),
  inac25: photo(
    "inac-25",
    "inac-25.jpeg",
    inac25,
    "Stehfalzdach mit Solarmodulen und sauberen Blechanschlüssen",
    "Stehfalz mit Photovoltaik",
    "metalldaecher",
  ),
  renoAcop01: photo(
    "reno-acop-01",
    "reno-acop-01.jpeg",
    renoAcop01,
    "Neue Unterspannbahn und Konterlattung auf einem Holzbau mit montierter Dachrinne",
    "Unterspannbahn und Rinne",
    "dachsanierung",
  ),
  renoAcop02: photo(
    "reno-acop-02",
    "reno-acop-02.jpeg",
    renoAcop02,
    "Bestehende Bitumenschindeln und freigelegte Unterlage während einer Dacherneuerung",
    "Bestehende Deckung vor dem Austausch",
    "dachsanierung",
  ),
  renoAcop03: photo(
    "reno-acop-03",
    "reno-acop-03.jpeg",
    renoAcop03,
    "Fertiges anthrazitfarbenes Trapezblechdach auf einem Holzbau",
    "Trapezblechdach fertig eingedeckt",
    "metalldaecher",
  ),
  renoAcop20: photo(
    "reno-acop-20",
    "reno-acop-20.jpeg",
    renoAcop20,
    "Unterspannbahn und neue Lattung auf einem Wohnhaus während der Dachsanierung",
    "Lattung während der Sanierung",
    "dachsanierung",
  ),
  renoAcop21: photo(
    "reno-acop-21",
    "reno-acop-21.jpeg",
    renoAcop21,
    "Freigelegter Dachstuhl und Unterspannbahn während einer Dachsanierung",
    "Dachhaut abgetragen",
    "dachsanierung",
  ),
  renoAcop22: photo(
    "reno-acop-22",
    "reno-acop-22.jpeg",
    renoAcop22,
    "Fertig eingedecktes anthrazitfarbenes Metalldach auf einem sanierten Wohnhaus",
    "Fertige Neueindeckung",
    "dachsanierung",
  ),
  renoAcop31: photo(
    "reno-acop-31",
    "reno-acop-31.jpeg",
    renoAcop31,
    "Rote Metalldachplatten teilweise verlegt, Unterspannbahn und Lattung sichtbar",
    "Eindeckung in Arbeit",
    "dachsanierung",
  ),
  renoAcop32: photo(
    "reno-acop-32",
    "reno-acop-32.jpeg",
    renoAcop32,
    "Offener Dachanschluss am Kamin während der Neueindeckung mit rotem Metalldach",
    "Anschluss am Kamin in Arbeit",
    "dachsanierung",
  ),
  renoAcop33: photo(
    "reno-acop-33",
    "reno-acop-33.jpeg",
    renoAcop33,
    "Fertiges rotes Metalldach mit überdachter Terrasse und Kamin",
    "Fertiges Metalldach mit Terrasse",
    "dachsanierung",
  ),
  sistPluvial3: photo(
    "sist-pluvial-3",
    "sist-pluvial-3.jpeg",
    sistPluvial3,
    "Moderne schwarze Dachrinne, Fallrohr und Dachuntersicht an einer Hausecke",
    "Dachrinne und Fallrohr fertig montiert",
    "spengler",
  ),
  sistPluvial4: photo(
    "sist-pluvial-4",
    "sist-pluvial-4.jpeg",
    sistPluvial4,
    "Frisch montierte Metalldachrinne an der Traufe während der Bauphase",
    "Dachrinne während der Montage",
    "spengler",
  ),
  sistPluvial: photo(
    "sist-pluvial",
    "sist-pluvial.jpeg",
    sistPluvial,
    "Metalldachrinne und Fallrohr an einem Ziegeldach",
    "Dachentwässerung am Ziegeldach",
    "spengler",
  ),
  sistemPluvial: photo(
    "sistem-pluvial",
    "sistem-pluvial.jpeg",
    sistemPluvial,
    "Dachrinne und Fallrohr an einem anthrazitfarbenen Metalldach",
    "Dachentwässerung am Metalldach",
    "spengler",
  ),
  tablaAcop: photo(
    "tabla-acop",
    "tabla-acop.jpeg",
    tablaAcop,
    "Schneefanggitter und Blechdetails auf einem Metalldach",
    "Schneefang und Blechdetails",
    "metalldaecher",
  ),
  tabla: photo(
    "tabla",
    "tabla.jpeg",
    tabla,
    "Flachnaht-Blechdach mit sauberer Verlegung",
    "Flachnaht-Blechdach",
    "metalldaecher",
  ),
  tiglaAranjata: photo(
    "tigla-aranjata",
    "tigla-aranjata.jpeg",
    tiglaAranjata,
    "Sauber verlegte anthrazitfarbene Dachziegel in Nahaufnahme",
    "Ziegeldeckung im Detail",
    "ziegeldaecher",
  ),
  tiglaCeramica1: photo(
    "tigla-ceramica-1",
    "tigla-ceramica-1.jpeg",
    tiglaCeramica1,
    "Rote Keramikziegel auf einem Wohngebäude mit Gerüst",
    "Keramikziegeldeckung",
    "ziegeldaecher",
  ),
  tiglaCeramica2: photo(
    "tigla-ceramica-2",
    "tigla-ceramica-2.jpeg",
    tiglaCeramica2,
    "Detailaufnahme von Keramikziegeln und Firstanschluss",
    "Keramikziegel und First",
    "ziegeldaecher",
  ),
  tiglaMetalica05: photo(
    "tigla-metalica-05grosime",
    "tigla-metalica-05grosime.jpeg",
    tiglaMetalica05,
    "Nahaufnahme von Metalldachplatten mit sichtbarer Materialstärke",
    "Metalldachplatte im Detail",
    "metalldaecher",
  ),
  tiglaMetalica: photo(
    "tigla-metalica",
    "tigla-metalica.jpeg",
    tiglaMetalica,
    "Anthrazitfarbenes Metalldach mit First und Dachfläche",
    "Metalldachdeckung",
    "metalldaecher",
  ),
  tiglaTipSolzi: photo(
    "tigla-tip-solzi",
    "tigla-tip-solzi.jpeg.jpeg",
    tiglaTipSolzi,
    "Schuppenförmige Ziegeldeckung in Nahaufnahme",
    "Schuppenziegel",
    "ziegeldaecher",
  ),
} as const;

export type PhotoKey = keyof typeof photos;

/** Flat list of all 36 registered photos for tests and portfolio grids. */
export const allPhotos: GalleryPhoto[] = Object.values(photos);

/** Category labels and anchor ids for the Referenzen page. */
export const portfolioCategories: { id: PortfolioCategory; label: string }[] = [
  { id: "dachsanierung", label: "Dachsanierung" },
  { id: "ziegeldaecher", label: "Ziegeldächer" },
  { id: "metalldaecher", label: "Metalldächer" },
  { id: "flachdach", label: "Flachdach & Abdichtung" },
  { id: "spengler", label: "Dachdetails & Spenglerarbeiten" },
  { id: "dachstuhl", label: "Dachstuhl & Holzbau" },
];

/** Ordered photo ids per portfolio category (finished results first where possible). */
export const photosByCategory: Record<PortfolioCategory, PhotoKey[]> = {
  dachsanierung: ["renoAcop22", "renoAcop33", "renoAcop03", "acoVopsit", "renoAcop20", "renoAcop21", "renoAcop31", "renoAcop32", "renoAcop01", "renoAcop02"],
  ziegeldaecher: ["acoperis", "tiglaTipSolzi", "tiglaCeramica2", "tiglaCeramica1", "acopJumateGata", "acoperisCentral3", "tiglaAranjata"],
  metalldaecher: ["acopFrumos", "acoperix", "tiglaMetalica", "inac25", "tabla", "asta444", "tiglaMetalica05", "tablaAcop", "acopJuma2"],
  flachdach: ["hidroizolatie2", "hidroizolatie"],
  spengler: ["sistPluvial3", "imbinareAcop", "imbinareAcoperis", "sistPluvial4", "sistPluvial", "sistemPluvial"],
  dachstuhl: ["dulgherie", "dulgherie3"],
};

/** Hero and optional gallery photos for service detail pages. */
export type ServiceImageSet = {
  hero: GalleryPhoto;
  gallery: GalleryPhoto[];
  galleryTitle?: string;
};

export const serviceImages: Record<string, ServiceImageSet> = {
  dacheindeckung: {
    hero: photos.tiglaMetalica,
    galleryTitle: "Materialien im Einsatz",
    gallery: [
      photos.tiglaCeramica1,
      photos.tiglaCeramica2,
      photos.tiglaAranjata,
      photos.asta444,
      photos.tiglaMetalica05,
      photos.inac25,
    ],
  },
  dachreparatur: {
    hero: photos.renoAcop32,
    galleryTitle: "Anschlüsse und Sanierungsschritte",
    gallery: [photos.imbinareAcoperis, photos.renoAcop02, photos.acopJumateGata],
  },
  dachabdichtung: {
    hero: photos.hidroizolatie2,
    galleryTitle: "Abdichtung und Untergrund",
    gallery: [photos.hidroizolatie, photos.renoAcop01],
  },
  dachzubehoer: {
    hero: photos.sistPluvial3,
    galleryTitle: "Entwässerung und Details",
    gallery: [
      photos.sistPluvial4,
      photos.sistPluvial,
      photos.sistemPluvial,
      photos.imbinareAcop,
      photos.tablaAcop,
    ],
  },
  // Specialist pages: hero only where a clear match exists.
  dachsanierung: {
    hero: photos.acoperisCentral3,
    gallery: [],
  },
  spenglerarbeiten: {
    hero: photos.tabla,
    gallery: [],
  },
  // Deliberate reuse: only two flat-roof photos exist.
  flachdachsanierung: {
    hero: photos.hidroizolatie,
    gallery: [],
  },
};

/** Homepage hero and supporting images. */
export const homeImages = {
  hero: photos.acopFrumos,
  /** Second hero photo for the stacked craft composition. */
  heroSecondary: photos.tiglaCeramica2,
  approach: photos.tiglaTipSolzi,
  preview: [photos.renoAcop22, photos.acoperis, photos.acoperix] as GalleryPhoto[],
  /** Four-image craft band: Ziegel, Metall, Abdichtung, Spengler. */
  craftBand: [
    {
      photo: photos.tiglaCeramica1,
      title: "Ziegeldeckung",
      text: "Klassische Steildächer mit keramischer Deckung – langlebig und typisch für Wiener Wohnhäuser.",
    },
    {
      photo: photos.tiglaMetalica,
      title: "Metalldach",
      text: "Leichte Metalldeckungen für Neubauten und Sanierungen, klar in der Optik und robust in der Ausführung.",
    },
    {
      photo: photos.hidroizolatie2,
      title: "Abdichtung",
      text: "Flachdach und kritische Anschlüsse brauchen eine dichte Schicht – geprüft und sauber abgeschlossen.",
    },
    {
      photo: photos.sistPluvial3,
      title: "Spenglerarbeiten",
      text: "Rinnen, Fallrohre und Blechanschlüsse leiten Wasser geordnet ab und schützen die Fassade.",
    },
  ] as const,
};

/** Extra work cards on /leistungen (no new routes). */
export const leistungenExtra = [
  {
    title: "Dachstuhl & Zimmererarbeiten",
    description: "Holztragwerk, Gauben und konstruktive Arbeiten am Dach — abgestimmt auf Ihr Gebäude.",
    photo: photos.dulgherie,
  },
  {
    title: "Lattung & Unterkonstruktion",
    description: "Unterspannbahn, Lattung und die Vorbereitung für die neue Dachhaut.",
    photo: photos.dulgherie3,
  },
  {
    title: "Dachbeschichtung",
    description: "Schutz und Farbauffrischung bestehender Dachflächen, wo eine Beschichtung sinnvoll ist.",
    photo: photos.acoVopsit,
  },
] as const;

/** Expected filenames for the gallery integrity test. */
export const expectedFilenames = [
  "aco-vopsit.jpeg",
  "acop-frumos.jpeg",
  "acop-juma-2.jpeg",
  "acop-jumate-gata.jpeg",
  "acoperis-central3.jpeg",
  "acoperis.jpeg",
  "acoperix.jpeg",
  "asta444.jpeg",
  "dulgherie-3.jpeg",
  "dulgherie.jpeg",
  "hidroizolatie-2.jpeg",
  "hidroizolatie.jpeg",
  "imbinare-acop.jpeg",
  "imbinare-acoperis.jpeg",
  "inac-25.jpeg",
  "reno-acop-01.jpeg",
  "reno-acop-02.jpeg",
  "reno-acop-03.jpeg",
  "reno-acop-20.jpeg",
  "reno-acop-21.jpeg",
  "reno-acop-22.jpeg",
  "reno-acop-31.jpeg",
  "reno-acop-32.jpeg",
  "reno-acop-33.jpeg",
  "sist-pluvial-3.jpeg",
  "sist-pluvial-4.jpeg",
  "sist-pluvial.jpeg",
  "sistem-pluvial.jpeg",
  "tabla-acop.jpeg",
  "tabla.jpeg",
  "tigla-aranjata.jpeg",
  "tigla-ceramica-1.jpeg",
  "tigla-ceramica-2.jpeg",
  "tigla-metalica-05grosime.jpeg",
  "tigla-metalica.jpeg",
  "tigla-tip-solzi.jpeg.jpeg",
] as const;
