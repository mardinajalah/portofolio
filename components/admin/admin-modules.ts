import {
  Award,
  ContactRound,
  Home,
  PanelsTopLeft,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

export type AdminModuleId =
  | 'contact'
  | 'projects'
  | 'certificates'
  | 'home'
  | 'about';

export type AdminModuleDefinition = {
  id: AdminModuleId;
  title: string;
  description: string;
  href: string;
  isAvailable: boolean;
  icon: LucideIcon;
};

export const adminModules = [
  {
    id: 'contact',
    title: 'Contact',
    description: 'Pantau pesan masuk, informasi kontak, dan ketersediaan dari satu ringkasan.',
    href: '/admin/contact',
    isAvailable: true,
    icon: ContactRound,
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Ringkasan project, teknologi, status publikasi, dan screenshot akan ditampilkan di sini.',
    href: '/admin/projects',
    isAvailable: false,
    icon: PanelsTopLeft,
  },
  {
    id: 'certificates',
    title: 'Certificates',
    description: 'Ringkasan sertifikat, penerbit, dan tanggal terbit akan ditampilkan di sini.',
    href: '/admin/certificates',
    isAvailable: false,
    icon: Award,
  },
  {
    id: 'home',
    title: 'Home',
    description: 'Ringkasan headline, pengantar, skill, dan konten halaman utama akan ditampilkan di sini.',
    href: '/admin/home',
    isAvailable: false,
    icon: Home,
  },
  {
    id: 'about',
    title: 'About',
    description: 'Ringkasan cerita, timeline, fokus kerja, dan fakta singkat akan ditampilkan di sini.',
    href: '/admin/about',
    isAvailable: false,
    icon: UserRound,
  },
] as const satisfies readonly AdminModuleDefinition[];
