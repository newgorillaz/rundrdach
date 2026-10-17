import type { StaticImageData } from "next/image";
import { photos, type GalleryPhoto } from "@/data/gallery";

/** Case study or portfolio entry — location stays optional (no invented places). */
export type Project = {
  slug: string;
  title: string;
  service: string;
  location?: string;
  description: string;
  image: StaticImageData | string;
  alt: string;
  objectPosition?: string;
  /** Optional before / during / after sequence when visually verified. */
  stages?: { label: string; photo: GalleryPhoto }[];
};

/**
 * Three case studies grouped only when the same building is visibly shared.
 * No project locations are claimed — photos do not prove a city.
 */
export const projects: Project[] = [
  {
    slug: "altbau-neueindeckung",
    title: "Neueindeckung eines Wohnhauses",
    service: "Dachsanierung",
    description:
      "Von der freigelegten Dachhaut über die neue Lattung bis zur fertigen anthrazitfarbenen Metalldeckung — dokumentiert am selben Gebäude.",
    image: photos.renoAcop22.src,
    alt: photos.renoAcop22.alt,
    stages: [
      { label: "Vorher", photo: photos.renoAcop21 },
      { label: "Während", photo: photos.renoAcop20 },
      { label: "Ergebnis", photo: photos.renoAcop22 },
    ],
  },
  {
    slug: "gartenhaus-metalldach",
    title: "Metalldach auf einem Holzbau",
    service: "Dacheindeckung",
    description:
      "Austausch der alten Schindeldeckung: Unterspannbahn und Konterlattung, danach Trapezblech als neue Dachhaut.",
    image: photos.renoAcop03.src,
    alt: photos.renoAcop03.alt,
    stages: [
      { label: "Vorher", photo: photos.renoAcop02 },
      { label: "Während", photo: photos.renoAcop01 },
      { label: "Ergebnis", photo: photos.renoAcop03 },
    ],
  },
  {
    slug: "wohnhaus-metalldach-terrasse",
    title: "Metalldach mit überdachter Terrasse",
    service: "Dacheindeckung",
    description:
      "Rote Metalldachplatten auf einem größeren Wohnhaus — von der Teilfläche über den Kaminanschluss bis zum fertigen Ergebnis.",
    image: photos.renoAcop33.src,
    alt: photos.renoAcop33.alt,
    stages: [
      { label: "Während", photo: photos.renoAcop31 },
      { label: "Anschluss", photo: photos.renoAcop32 },
      { label: "Ergebnis", photo: photos.renoAcop33 },
    ],
  },
];
