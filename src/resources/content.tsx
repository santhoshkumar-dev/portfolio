import type {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Santhosh",
  lastName: "Kumar",
  name: "Santhosh Kumar",
  role: "Full-Stack Software Engineer",
  avatar: "/images/avatar.png",
  email: "santhoshkumar.devmail@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Tamil", "Binary Language"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      Thoughts on full-stack engineering, cloud architecture, and production
      systems
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/iamsanthosh2203",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/iamsanthosh2203/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Scaling systems from zero to production</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Educational Hub</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/educational-hub-full-stack-platform",
  },
  subline: (
    <>
      Full-stack engineer building production systems at scale. I own the entire
      stack—frontend, backend, <br /> DevOps, and cloud. Built platforms
      handling 50k+ daily transactions, reduced cloud costs by 80%.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/santhosh-kumar-dev",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Full-stack software engineer with experience building scalable,
        cloud-based applications and automation-driven systems. Strong ownership
        mindset across frontend, backend, DevOps, cloud infrastructure, and
        distributed systems. Currently focused on building production-grade
        platforms at early-stage startups with real scale and impact.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Recipto Pvt Ltd",
        timeframe: "2023 - Present",
        role: "Software Engineer",
        achievements: [
          <span key="recipto-1">
            Owned end-to-end engineering of production platform at early-stage
            startup. Built full-stack application handling 50,000+ daily
            transactions.
          </span>,
          <span key="recipto-2">
            Designed and maintained multi-cloud infrastructure across AWS, GCP,
            and Azure. Led complete AWS to GCP migration, improving reliability
            and reducing infrastructure costs by ~80%.
          </span>,
          <span key="recipto-3">
            Built Kafka-based ML document processing pipeline with Python,
            Selenium, and OCR integration for automated data extraction.
            Processes 50,000+ receipts monthly.
          </span>,
          <span key="recipto-4">
            Developed React + Next.js frontend and Node.js + GraphQL backend
            services for core platform functionality.
          </span>,
        ],
        images: [],
      },
      {
        company: "MidLead",
        timeframe: "2021 - 2023",
        role: "Software Engineer",
        achievements: [
          <span key="midlead-1">
            Built full-stack web applications using Next.js, Node.js, and
            MongoDB in a fast-paced Web3 startup environment.
          </span>,
          <span key="midlead-2">
            Developed reusable UI component library and internal dashboards for
            team collaboration.
          </span>,
          <span key="midlead-3">
            Integrated third-party APIs, authentication flows, and payment
            systems with emphasis on production reliability.
          </span>,
          <span key="midlead-4">
            Worked in startup environment requiring rapid iteration and
            real-time feature deployment.
          </span>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Delhi",
        description: <>Studied computer science and software engineering.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend",
        description: (
          <>
            Building responsive, performant, and accessible user interfaces
            using modern React and Next.js patterns. Strong focus on component
            architecture, UX polish, and client-side performance.
          </>
        ),
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "React", icon: "react" },
          { name: "TypeScript", icon: "typescript" },
          { name: "Tailwind CSS", icon: "tailwindcss" },
          { name: "shadcn/ui", icon: "shadcnui" },
          { name: "Hero UI", icon: "heroui" },
          { name: "React Query", icon: "reactquery" },
          { name: "Zustand", icon: "zustand" },
          { name: "Zod", icon: "zod" },
          { name: "Framer Motion", icon: "framermotion" },
          { name: "GSAP", icon: "gsap" },
        ],
        images: [],
      },

      {
        title: "Backend & APIs",
        description: (
          <>
            Designing scalable backend systems and APIs with Node.js, Express,
            and GraphQL. Experience building real-time and event-driven
            services.
          </>
        ),
        tags: [
          { name: "Node.js", icon: "nodejs" },
          { name: "Express", icon: "express" },
          { name: "GraphQL", icon: "graphql" },
          { name: "WebSockets", icon: "realtime" },
          { name: "Socket.IO", icon: "socketio" },
        ],
        images: [],
      },

      {
        title: "Data, Caching & Messaging",
        description: (
          <>
            Working with databases, caching layers, and message queues to build
            reliable, high-throughput distributed systems.
          </>
        ),
        tags: [
          { name: "MongoDB", icon: "mongodb" },
          { name: "Redis", icon: "redis" },
          { name: "Apache Kafka", icon: "kafka" },
        ],
        images: [],
      },

      {
        title: "Cloud & Infrastructure",
        description: (
          <>
            Deploying and operating applications across multiple cloud providers
            using managed compute, storage, and networking services.
          </>
        ),
        tags: [
          { name: "AWS", icon: "aws" },
          { name: "Google Cloud", icon: "gcp" },
          { name: "Azure", icon: "azure" },
        ],
        images: [],
      },

      {
        title: "DevOps & Deployment",
        description: (
          <>
            Containerized deployments, CI/CD automation, and production
            infrastructure management with a focus on reliability and
            scalability.
          </>
        ),
        tags: [
          { name: "Docker", icon: "docker" },
          { name: "Kubernetes", icon: "kubernetes" },
          { name: "Nginx", icon: "nginx" },
          { name: "GitHub Actions", icon: "githubactions" },
          { name: "PM2", icon: "pm2" },
          { name: "Coolify", icon: "coolify" },
        ],
        images: [],
      },

      {
        title: "Automation, AI & Tooling",
        description: (
          <>
            Automation, testing, and AI integrations to improve development
            velocity, reliability, and system observability.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "Selenium", icon: "selenium" },
          { name: "Puppeteer", icon: "puppeteer" },
          { name: "Jest", icon: "jest" },
          { name: "k6", icon: "k6" },
          { name: "FFmpeg", icon: "ffmpeg" },
          { name: "Postman", icon: "postman" },
          { name: "Git", icon: "git" },
          { name: "Jupyter", icon: "jupyter" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about full-stack engineering...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Full-stack projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
