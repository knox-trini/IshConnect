import {
  Award,
  Check,
  Cloud,
  Code2,
  ExternalLink,
  Heart,
  Laptop,
  Layers,
  LayoutDashboard,
  Palette,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  Users,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  award: Award,
  check: Check,
  cloud: Cloud,
  code: Code2,
  dashboard: LayoutDashboard,
  design: Palette,
  external: ExternalLink,
  heart: Heart,
  laptop: Laptop,
  layers: Layers,
  mobile: Smartphone,
  security: ShieldCheck,
  server: Server,
  shield: Shield,
  sparkles: Sparkles,
  trophy: Trophy,
  users: Users,
  video: Video,
  wifi: Wifi,
};

export function getContentIcon(name: string): LucideIcon {
  return ICONS[name] || Sparkles;
}
