export interface Website {
  slug: string;
  name: string;
  href: string;
  description?: string;
  image?: string;
  isFeatured?: boolean;
  order?: number;
}

export const WEBSITES: Website[] = [
  { slug: "helpernet", name: "HelperNet", href: "https://devqueens.ishconnect.rw/" },
  { slug: "agrilink", name: "AgriLink", href: "https://webcare.ishconnect.rw/" },
  { slug: "mindcare-connect", name: "MindCare Connect", href: "https://mindcareconn.vercel.app/" },
  { slug: "missionhub", name: "MissionHub", href: "https://missionhub.andas.dev/" },
  { slug: "ishguard", name: "IshGuard", href: "https://ishguard.ishconnect.rw/" },
  {
    slug: "iconnbook",
    name: "iConnBook",
    href: "https://iconnbook.ishconnect.rw/",
    image: "/src/assets/projects/iconnbook.png",
    description: "A centralized digital learning platform built to index verified academic references, past examination papers, and digital module handbooks for software development, network engineering, and multimedia technology trades under the Rwanda TVET Board (RTB) syllabus — plus secondary and higher learning resources.",
    isFeatured: true,
  },
];
