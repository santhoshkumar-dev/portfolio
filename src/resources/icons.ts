import type { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
  HiOutlineCpuChip,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import {
  SiJavascript,
  SiNextdotjs,
  SiFigma,
  SiSupabase,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiZod,
  SiRedux,
  SiReact,
  SiReactquery,
  SiExpress,
  SiGraphql,
  SiMongodb,
  SiRedis,
  SiApachekafka,
  SiGooglecloud,
  SiKubernetes,
  SiNginx,
  SiGithubactions,
  SiSelenium,
  SiPuppeteer,
  SiJest,
  SiPostman,
  SiGit,
  SiFfmpeg,
  SiJupyter,
  SiSocketdotio,
} from "react-icons/si";

import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaX,
  FaThreads,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaReddit,
  FaTelegram,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
} from "react-icons/fa6";

import {
  TbBrandFramerMotion,
  TbTimeline,
  TbServerBolt,
  TbBroadcast,
  TbGauge,
} from "react-icons/tb";
import { BsMicrosoft } from "react-icons/bs";

export const iconLibrary: Record<string, IconType> = {
  // UI / Navigation
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  email: HiEnvelope,
  calendar: HiCalendarDays,
  globe: HiOutlineGlobeAsiaAustralia,
  openLink: HiOutlineLink,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,

  home: PiHouseDuotone,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  gallery: PiImageDuotone,

  // Social
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  twitter: FaXTwitter,
  threads: FaThreads,
  discord: FaDiscord,
  instagram: FaInstagram,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,

  // Frontend
  react: FaReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  shadcnui: SiShadcnui,
  heroui: SiReact,
  reactquery: SiReactquery,
  zustand: SiRedux,
  zod: SiZod,
  framermotion: TbBrandFramerMotion,
  gsap: TbTimeline,

  // Backend & APIs
  nodejs: FaNodeJs,
  express: SiExpress,
  graphql: SiGraphql,
  socketio: SiSocketdotio,
  realtime: TbBroadcast,

  // Data & Messaging
  mongodb: SiMongodb,
  redis: SiRedis,
  kafka: SiApachekafka,

  // Cloud
  aws: FaAws,
  gcp: SiGooglecloud,
  azure: BsMicrosoft,

  // DevOps
  docker: FaDocker,
  kubernetes: SiKubernetes,
  nginx: SiNginx,
  githubactions: SiGithubactions,
  pm2: TbServerBolt,
  coolify: TbServerBolt,

  // Automation & Tooling
  python: HiOutlineCpuChip,
  selenium: SiSelenium,
  puppeteer: SiPuppeteer,
  jest: SiJest,
  k6: TbGauge,
  postman: SiPostman,
  git: SiGit,
  ffmpeg: SiFfmpeg,
  jupyter: SiJupyter,

  // Misc
  supabase: SiSupabase,
  figma: SiFigma,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
