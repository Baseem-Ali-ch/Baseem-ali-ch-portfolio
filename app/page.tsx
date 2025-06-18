"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Moon,
  Sun,
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  ChevronDown,
  NotebookPen,
  Clock,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Add these interfaces at the top of your file
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Floating Bubbles Component
const FloatingBubbles = () => {
  const { scrollYProgress } = useScroll();

  // Create multiple bubbles with different scroll speeds and positions
  const bubbles = [
    {
      id: 1,
      size: "w-8 h-8",
      color: "bg-blue-300/40",
      initialX: "10%",
      scrollY: useTransform(scrollYProgress, [0, 1], [0, 1200]),
      delay: 0,
    },
    {
      id: 2,
      size: "w-12 h-12",
      color: "bg-purple-300/40",
      initialX: "20%",
      scrollY: useTransform(scrollYProgress, [0, 1], [0, 800]),
      delay: 0.5,
    },
    {
      id: 3,
      size: "w-6 h-6",
      color: "bg-pink-300/40",
      initialX: "80%",
      scrollY: useTransform(scrollYProgress, [0, 1], [0, 1000]),
      delay: 1,
    },
    {
      id: 4,
      size: "w-10 h-10",
      color: "bg-green-300/40",
      initialX: "70%",
      scrollY: useTransform(scrollYProgress, [0, 1], [0, 600]),
      delay: 1.5,
    },
    {
      id: 5,
      size: "w-14 h-14",
      color: "bg-yellow-300/40",
      initialX: "30%",
      scrollY: useTransform(scrollYProgress, [0, 1], [0, 900]),
      delay: 2,
    },
    {
      id: 6,
      size: "w-7 h-7",
      color: "bg-indigo-300/40",
      initialX: "90%",
      scrollY: useTransform(scrollYProgress, [0, 1], [0, 1100]),
      delay: 2.5,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute ${bubble.size} ${bubble.color} rounded-full blur-sm`}
          style={{
            left: bubble.initialX,
            top: "10%",
            y: bubble.scrollY,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [0, 360],
          }}
          transition={{
            opacity: { delay: bubble.delay, duration: 0.8 },
            scale: { delay: bubble.delay, duration: 0.8 },
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  );
};

// Scroll Progress Indicators
const ScrollIndicators = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const getBackgroundColor = (index: number, scrollYProgress: any) => {
    const sectionCount = sections.length;

    // Calculate the scroll range for each section
    const sectionStart = index / sectionCount;
    const sectionEnd = (index + 1) / sectionCount;

    // Add some overlap for smoother transitions
    const fadeStart = Math.max(0, sectionStart - 0.05);
    const activeStart = sectionStart;
    const activeEnd = sectionEnd;
    const fadeEnd = Math.min(1, sectionEnd + 0.05);

    return useTransform(
      scrollYProgress,
      [fadeStart, activeStart, activeEnd, fadeEnd],
      ["transparent", "#3b82f6", "#3b82f6", "transparent"]
    );
  };

  const backgroundColors = sections.map((_, index) =>
    getBackgroundColor(index, scrollYProgress)
  );

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Section indicators */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-40">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="group relative cursor-pointer"
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            whileHover={{ scale: 1.2 }}
          >
            {/* Indicator dot */}
            <motion.div
              className="w-3 h-3 rounded-full border-2 border-gray-300 dark:border-gray-600 transition-colors duration-300"
              style={{
                backgroundColor: backgroundColors[index],
              }}
            />

            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-md text-sm whitespace-nowrap">
                {section.label}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-gray-100"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

// Floating Geometric Shapes
const FloatingShapes = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Triangle */}
      <motion.div
        className="absolute top-1/4 left-10 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-blue-200/30"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
        }}
      />

      {/* Square */}
      <motion.div
        className="absolute top-1/3 right-20 w-6 h-6 bg-purple-200/30 transform rotate-45"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 300]),
          rotate: useTransform(scrollYProgress, [0, 1], [45, 405]),
        }}
      />

      {/* Circle */}
      <motion.div
        className="absolute top-2/3 left-1/4 w-8 h-8 bg-pink-200/30 rounded-full"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -400]),
          x: useTransform(scrollYProgress, [0, 1], [0, 100]),
        }}
      />

      {/* Hexagon */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-10 h-10 bg-green-200/30"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 250]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, -270]),
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />
    </div>
  );
};

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleDownloadResume = () => {
    // Create link element
    const link = document.createElement("a");
    link.href = "/Baseem-Ali-Resume.pdf";
    link.download = "Baseem-Ali-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add validation functions
  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};

    // Name validation - only letters and spaces
    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(data.name.trim())) {
      errors.name = "Name can only contain letters";
    }

    // Email validation
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(data.email.trim())) {
      errors.email = "Please enter a valid Gmail address";
    }

    // Subject validation
    if (!data.subject.trim()) {
      errors.subject = "Subject is required";
    }

    // Message validation
    if (!data.message.trim()) {
      errors.message = "Message is required";
    } else if (data.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }

    return errors;
  };

  // Update your component with error handling
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.id as keyof FormErrors]) {
      setErrors({
        ...errors,
        [e.target.id]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("");

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus("");
      }, 3000); // Message will disappear after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // *Skills
  const skills = {
    Frontend: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "EJS",
      "Bootstrap",
      "Next.js",
      "React.js",
      "Anugular",
    ],
    Backend: [
      "JavaScript (ES6+)",
      "TypeScript",
      "Node.js",
      "Express",
      "Socket.io",
      "REST APIs",
      "JWT",
      "OAuth",
    ],

    "Cloud & DevOps": [
      "AWS EC2",
      "AWS S3",
      "GCS Bucket",
      "Vercel",
      "Git",
      "Nginx",
      "Cloudinary",
    ],
    Databases: ["MySQL", "PostgreSQL", "Prisma", "MongoDB", "Redis"],
    "Design & Tools": [
      "Figma",
      "Code Planner",
      "Postman",
      "GitHub",
      "GSAP",
      "Redux",
      "NGRX",
      "Shadcn UI",
      "Tailwind UI",
    ],
  };

  // *Projects
  const projects = [
    {
      title: "VoxScript",
      description:
        "This project is a audio transcription system designed to instantly convert spoken audio into accurate text, supporting a range of languages. Whether it's recorded audio, the system ensures efficient speech-to-text conversion.",
      image: "/voxscript.png?height=300&width=400",
      tech: ["Next.js", "Tailwind CSS", "GCS Bucket", "STT API", "Vercel"],
      demo: "#",
      github: "https://github.com/Baseem-Ali-ch/VoxScript",
      status: "in-progress",
    },
    {
      title: "TripTales",
      description:
        "A travel planning application that allows users to create, share, and discover travel itineraries.",
      image: "/triptales-dark.png?height=300&width=400",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
      demo: "https://trip-tales-nu.vercel.app/",
      github: "https://github.com/Baseem-Ali-ch/TripTales",
      status: "in-progress",
    },
    {
      title: "Banking Management App",
      description:
        "A banking management application with user authentication, account management, and transaction history.",
      image: "/banking-app.png?height=300&width=400",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
      demo: "#",
      github: "https://github.com/Baseem-Ali-ch/Banking-app",
    },
    {
      title: "Plate Up",
      description:
        "A recipe sharing platform where users can create, share, and discover recipes.",
      image: "/plateup.png?height=300&width=400",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
      demo: "https://plate-up-opal.vercel.app/",
      github: "https://github.com/Baseem-Ali-ch/plate-up",
      status: "in-progress",
    },
    {
      title: "JukeBoz Verses",
      description:
        "A song lyrics application, playlist management, add song lyrics.",
      image: "/jukebox.png?height=300&width=400",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
      demo: "https://jukebox-verses.vercel.app/",
      github: "https://github.com/Baseem-Ali-ch/jukebox-verses",
    },
    {
      title: "BizFlow",
      description:
        "A time tracking application for businesses to manage employee hours, projects, and productivity.",
      image: "/bizflow.png?height=300&width=400",
      tech: [
        "React",
        "TypeScript",
        "Vite",
        "Redux",
        "Tailwind CSS",
        "Prisma",
        "PostgreSQL",
      ],
      demo: "https://biz-flow-nine.vercel.app/",
      github: "https://github.com/Baseem-Ali-ch/BizFlow",
      status: "in-progress",
    },
    {
      title: "DealDash E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
      image: "/deal-dash.png?height=300&width=400",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
      demo: "#",
      github: "https://github.com/Baseem-Ali-ch/DealDash",
    },
    {
      title: "EduLoom Learning Management System",
      description:
        "A comprehensive LMS for online courses, quizzes, and student management with a responsive design.",
      image: "/lms.png?height=300&width=400",
      tech: ["Angular", "Node.js", "MongoDB", "Express", "Socket.io"],
      demo: "#",
      github: "https://github.com/Baseem-Ali-ch/EduLoom-Client",
    },
    {
      title: "Netflix Clone",
      description:
        "A responsive Netflix clone with user authentication, movie browsing, and watchlist features.",
      image: "/netflix clone.png?height=300&width=400",
      tech: ["Angular", "api", "Tailwind CSS"],
      demo: "#",
      github: "https://github.com/Baseem-Ali-ch/Netflix-Clone",
    },
    {
      title: "FurnSpace E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "/furnspace.png?height=300&width=400",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
      demo: "#",
      github: "https://github.com/Baseem-Ali-ch/FurnSpace",
    },
  ];

  {
    /*  Articles data*/
  }
  const articles = [
    {
      title: "My Journey with Node.js: From Beginner to Full-Stack Developer",
      image: "/nodejs.jpg?height=300&width=400",
      url: "https://medium.com/@basalich43/my-journey-with-node-js-122a1ad90316",
      publishedDate: "Jun 18, 2025",
      readTime: "4 min read",
      tags: ["Node.js", "JavaScript", "Backend", "Full-Stack", "MediumDev"],
    },
    {
      title: "The Tale of JavaScript: The Magical Language ",
      image: "/javascript.png",
      url: "https://medium.com/@basalich43/the-tale-of-javascript-the-magical-language-%EF%B8%8F-475a749461a6",
      publishedDate: "Feb 15, 2025",
      readTime: "2 min read",
      tags: ["JavaScript", "Backend", "Full-Stack", "MediumDev"],
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "dark" : ""
      }`}
    >
      {/* Floating Bubbles */}
      <FloatingBubbles />

      {/* Floating Shapes */}
      <FloatingShapes />

      {/* Scroll Progress Indicators */}
      <ScrollIndicators />

      {/* Theme Toggle */}
      <Button
        onClick={() => setIsDark(!isDark)}
        variant="outline"
        size="icon"
        className="fixed top-6 right-6 z-50 bg-background/80 backdrop-blur-sm"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </motion.div>

        <div className="container mx-auto px-6 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="https://res.cloudinary.com/dizolltkq/image/upload/v1748054602/403_JUNE_2022_29_BASEEM_7902753976_copy_212x278_manr0g.jpg"
                alt="Profile"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-6 border-4 border-white shadow-2xl"
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Baseem Ali CH
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Full-Stack Developer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleDownloadResume}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
            >
              About Me
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={slideInLeft}>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  I'm a passionate full-stack developer with around 1.5 years of
                  experience creating digital solutions that make a difference.
                  I specialize in modern web technologies and have a keen eye
                  for design and user experience.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  When I'm not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community through blog posts and
                  speaking engagements.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Malappuram, Kerala, India</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <Mail className="h-4 w-4" />
                    <span>baseemch43@gmail.com</span>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div variants={slideInRight} className="relative">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src="https://res.cloudinary.com/dizolltkq/image/upload/v1748054469/IMG_0839_bhoeu3.jpg"
                    alt="About"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-20 bg-gray-50 dark:bg-gray-800 relative"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
            >
              Skills & Technologies
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                  key={category}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-center">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIndex * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-sm cursor-pointer"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 bg-white dark:bg-gray-900 relative"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
            >
              Featured Projects
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -20, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group" // Add group class here
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                      {/* Changed: Use group-hover instead of whileHover */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                        >
                          <Button size="sm" variant="secondary" asChild>
                            <Link href={project.demo}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </Link>
                          </Button>
                        </motion.div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
                        >
                          <Button size="sm" variant="secondary" asChild>
                            <Link href={project.github}>
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">
                          {project.title}
                        </CardTitle>
                        {project.status === "in-progress" && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                          >
                            In Progress
                          </Badge>
                        )}
                        {project.status === "planned" && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                          >
                            Planned
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: techIndex * 0.1 }}
                          >
                            <Badge variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog & Articles Section */}
      <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
            >
              Blogs & Articles
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -20, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          width={400}
                          height={240}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                        >
                          <Button size="sm" variant="secondary" asChild>
                            <Link
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Read Article
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {article.publishedDate}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl line-clamp-2">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, tagIndex) => (
                          <motion.div
                            key={tag}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: tagIndex * 0.1 }}
                          >
                            <Badge variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-20 bg-gray-50 dark:bg-gray-800 relative"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
            >
              Journey & Education
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block"></div>

              <div className="space-y-12">
                <motion.div
                  variants={slideInRight}
                  whileHover={{ x: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-fuchsia-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block z-10"></div>

                  <div className="md:ml-16">
                    <Card className="hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">
                              Full Stack Freelancer
                            </CardTitle>
                            <CardDescription className="text-lg">
                              Remote, Malappuram, Kerala
                            </CardDescription>
                          </div>
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Badge variant="outline">2025 - Present</Badge>
                          </motion.div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Following the bootcamp, I embarked on a 6-month
                          freelance journey, deepening my expertise in
                          cutting-edge technologies like{" "}
                          <b>Next.js, Prisma, and Vercel</b>. During this
                          period, I successfully developed a major{" "}
                          <b>banking management application</b> from scratch.
                          Additionally, I contributed significantly to the
                          development of an <b>accounting software</b> and an
                          <b>e-commerce platform</b>, both built with{" "}
                          <b>Next.js</b>, showcasing my ability to deliver
                          robust and scalable web solutions.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                <motion.div
                  variants={slideInLeft}
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block z-10"></div>

                  <div className="md:ml-16">
                    <Card className="hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">
                              Full-Stack Web Development Bootcamp
                            </CardTitle>
                            <CardDescription className="text-lg">
                              Brocamp, Kozhikkode, Kerala
                            </CardDescription>
                          </div>
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Badge variant="outline">2024 - 2025</Badge>
                          </motion.div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Completed a rigorous 29-week, intensive programming
                          bootcamp focusing on the MEAN stack. Gained hands-on
                          expertise in foundational web technologies including
                          <b> HTML, CSS, Bootstrap, and JavaScript</b>,
                          alongside server-side development with{" "}
                          <b>Node.js and Express.js</b>. Proficient in database
                          management using
                          <b>MongoDB and SQL</b>, and version control with{" "}
                          <b>Git</b>. Further specialized in modern front-end
                          frameworks like <b>Angular</b> and advanced JavaScript
                          with
                          <b> TypeScript</b>. Applied these skills across
                          numerous minor projects and successfully developed two
                          major full-stack applications: an{" "}
                          <b>e-commerce platform </b>
                          and a <b>learning management system</b>.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                <motion.div
                  variants={slideInLeft}
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block z-10"></div>

                  <div className="md:ml-16">
                    <Card className="hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">
                              Higher Secondary Education (Plus Two)
                            </CardTitle>
                            <CardDescription className="text-lg">
                              PMSAMAHSS, Malappuram, Kerala
                            </CardDescription>
                          </div>
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Badge variant="outline">2018 - 2020</Badge>
                          </motion.div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Completed Plus Two in <b>Humanities</b>, building a
                          strong foundation in <b>research skills</b>
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-white dark:bg-gray-900 relative"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
            >
              Get In Touch
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div variants={slideInLeft}>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                  Let's Connect
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  I'm always interested in hearing about new opportunities and
                  exciting projects. Whether you have a question or just want to
                  say hi, feel free to reach out!
                </p>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4"
                  >
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600 dark:text-gray-300">
                      baseemch43@gmail.com
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4"
                  >
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600 dark:text-gray-300">
                      +91 7902753977
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4"
                  >
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600 dark:text-gray-300">
                      Malappuram, Kerala
                    </span>
                  </motion.div>
                </div>

                <Separator className="my-8" />

                <div className="flex gap-4">
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        target="_blank"
                        href="https://github.com/Baseem-Ali-ch"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, rotate: -5 }}>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        target="_blank"
                        href="https://www.linkedin.com/in/baseem-ali-ch-bbb21b2a8/"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        target="_blank"
                        href="https://medium.com/me/stories/public"
                      >
                        <NotebookPen className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                    <Button variant="outline" size="icon" asChild>
                      <Link target="_blank" href="mailto:baseemch43@gmail.com">
                        <Mail className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://wa.me/917902753977"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={slideInRight}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card className="hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Send a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                              <span className="text-red-500 text-sm mt-1">
                                {errors.name}
                              </span>
                            )}
                          </motion.div>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                              <span className="text-red-500 text-sm mt-1">
                                {errors.email}
                              </span>
                            )}
                          </motion.div>
                        </div>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What's this about?"
                            className={errors.subject ? "border-red-500" : ""}
                          />
                          {errors.subject && (
                            <span className="text-red-500 text-sm mt-1">
                              {errors.subject}
                            </span>
                          )}
                        </motion.div>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message..."
                            rows={5}
                            className={errors.message ? "border-red-500" : ""}
                          />
                          {errors.message && (
                            <span className="text-red-500 text-sm mt-1">
                              {errors.message}
                            </span>
                          )}
                        </motion.div>

                        {/* Status Messages */}
                        {submitStatus && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-4 text-sm rounded-md ${
                              submitStatus === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {submitStatus === "success"
                              ? "Message sent successfully! I'll get back to you soon."
                              : "Failed to send message. Please try again."}
                          </motion.div>
                        )}

                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 dark:bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400"
          >
            © 2024 Baseem Ali. All rights reserved
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
