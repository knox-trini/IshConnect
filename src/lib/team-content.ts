import ceoImg from "@/assets/team/ceo.jpeg";
import kevinImg from "@/assets/team/kevin.jpeg";
import sandraImg from "@/assets/team/sandra.jpg";

export const TEAM_CONTENT = [
  { slug: "ishimwe-j-claude", name: "Ishimwe J. Claude", role: "CEO & Founder", image: ceoImg, linkedin: "https://www.linkedin.com/in/ish-claude/", leadership: true, order: 0 },
  { slug: "kevin-ishimwe", name: "Kevin Ishimwe", role: "Lead Developer", image: kevinImg, linkedin: "https://www.linkedin.com/in/kevin-ishimwe-551815368/", leadership: true, order: 1 },
  { slug: "sandra-niyigena", name: "Sandra Niyigena", role: "Creative Director", image: sandraImg, linkedin: "https://www.linkedin.com/in/sandra-niyigena-ba7766403/", leadership: true, order: 2 },
  ...[
    ["tumaine-n", "Tumaine N.", "Backend Engineer"], ["sandrine-i", "Sandrine.I", "Mobile Engineer"],
    ["ange-u", "Ange U.", "Cloud Architect"], ["trinita-u", "Trinita U.", "Product Designer"],
    ["alifu-s", "Alifu S.", "Software Engineer"], ["cynthia-i", "Cynthia I.", "Program Lead"],
    ["dady-rn", "Dady R.N.", "Frontend Engineer"], ["yvonne-y", "Yvonne Y.", "QA Engineer"],
  ].map(([slug, name, role], index) => ({ slug, name, role, leadership: false, order: index + 3 })),
];
