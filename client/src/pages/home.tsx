import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { 
  Download, 
  Mail, 
  MapPin, 
  Calendar,
  ChevronDown,
  Send,
  Code2,
  Brain,
  Shield,
  Cloud,
  Briefcase,
  GraduationCap,
  Loader2
} from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import profileImage from "@assets/WIN_20220304_12_49_34_Pro_1766002029013.jpg";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Zebra Technologies",
    location: "Holtsville, NY",
    period: "May 2025 – Aug 2025",
    description: [
      "Developed Duress Detection Android app integrating Whisper, YAMNet, and TensorFlow Lite for real-time threat detection",
      "Integrated GPT4All + LLMs for emergency event classification and response automation",
      "Built BigQuery + Gemini page for AI-powered data summaries and SQL insights"
    ],
    techStack: ["Android Studio", "TensorFlow Lite", "Whisper", "YAMNet", "GPT4All", "GCP", "BigQuery", "Gemini"]
  },
  {
    title: "Software Engineering Fellow",
    company: "HeadStarter AI",
    location: "Remote",
    period: "July 2024 – September 2024",
    description: [
      "Built applications with Next.js, Firebase, and OpenAI APIs",
      "Pitched projects in hackathons and collaborated in agile teams"
    ],
    techStack: ["Next.js", "Firebase", "OpenAI APIs", "React"]
  },
  {
    title: "Research Intern",
    company: "Brookhaven National Laboratory",
    location: "Upton, NY",
    period: "July 2020 – Aug 2020",
    description: [
      "Built Python ML scripts to improve sub-pixel resolution in germanium detectors",
      "Presented findings at BNL research seminar"
    ],
    techStack: ["Python", "NumPy", "SciPy", "Machine Learning"]
  }
];

const projects = [
  {
    title: "Unpacking the Vote",
    description: "Comprehensive web-based tool to analyze political data including demographic and economic patterns across districts using heatmaps, scatter plots, and visualizations.",
    techStack: ["Python", "D3.js", "PyEI", "MGGG", "SeaWulf"],
    github: "https://github.com/nasAhmed-chss"
  },
  {
    title: "FakeStackOverflow",
    description: "Full-stack web application inspired by StackOverflow with user registration, Q&A functionality, and voting system.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/nasAhmed-chss"
  },
  {
    title: "AI Research Summarizer",
    description: "N8N AI agent workflow using OpenAI + Perplexity to research topics and convert summaries into audio using TTS.",
    techStack: ["N8N", "OpenAI", "Perplexity", "TTS"],
    github: "https://github.com/nasAhmed-chss"
  },
  {
    title: "AI Rate My Professor",
    description: "AI-driven tool using GPT models to generate professor ratings and feedback with real-time Firebase Firestore backend.",
    techStack: ["Next.js", "React", "OpenAI GPT", "Firebase Firestore"],
    github: "https://github.com/nasAhmed-chss"
  },
  {
    title: "Video Manipulation Detection",
    description: "Ongoing research with Farmingdale CS professor on utilizing AI to detect video manipulation and deepfakes.",
    techStack: ["Python", "TensorFlow", "Computer Vision", "Deep Learning"],
    github: "https://github.com/nasAhmed-chss"
  }
];

const skills = {
  languages: ["Java", "Python", "JavaScript", "C", "SQL", "MATLAB", "HTML/CSS", "Kotlin"],
  frameworks: ["React.js", "Node.js", "Next.js", "D3.js", "TensorFlow Lite", "Whisper", "YAMNet", "GPT4All", "OpenAI APIs", "Gemini", "N8N"],
  cloud: ["GCP BigQuery", "Firebase Firestore", "AWS", "Android Studio", "MongoDB", "GitHub", "Jupyter", "SeaWulf", "Linux"]
};

function Navigation() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/api/resume";
    link.download = "Naseer_Ahmed_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <button 
          onClick={() => scrollToSection("hero")}
          className="text-xl font-bold text-foreground"
          data-testid="link-home"
        >
          NA
        </button>
        <div className="hidden md:flex items-center gap-6 flex-wrap">
          {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              data-testid={`link-nav-${item.toLowerCase()}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="default" 
            size="sm"
            onClick={handleResumeDownload}
            data-testid="button-resume-nav"
          >
            <Download className="w-4 h-4 mr-2" />
            Resume
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}

function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 pt-32 relative z-10 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <motion.div 
            className="lg:col-span-3 space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">
                <MapPin className="w-3 h-3 mr-1" />
                Stony Brook, New York
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              variants={fadeInUp}
              data-testid="text-hero-name"
            >
              Naseer Ahmed
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-primary font-medium"
              variants={fadeInUp}
              data-testid="text-hero-title"
            >
              Computer Science Student | AI & Security Engineer
            </motion.p>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
              variants={fadeInUp}
              data-testid="text-hero-mission"
            >
              Building intelligent systems at the intersection of AI, machine learning, and security. 
              Passionate about creating robust, scalable solutions that make a real-world impact.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={fadeInUp}
            >
              <Button 
                size="lg" 
                onClick={scrollToProjects}
                data-testid="button-view-projects"
              >
                View Projects
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open("/api/resume", "_blank")}
                data-testid="button-download-resume"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 pt-4"
              variants={fadeInUp}
            >
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open("https://github.com/nasAhmed-chss", "_blank")}
                data-testid="link-github"
              >
                <SiGithub className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open("https://www.linkedin.com/in/naseer-ks-ahmed/", "_blank")}
                data-testid="link-linkedin"
              >
                <SiLinkedin className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open("mailto:naseer3.14159@gmail.com", "_blank")}
                data-testid="link-email"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl scale-110" />
              <Avatar className="w-64 h-64 sm:w-80 sm:h-80 border-4 border-border relative">
                <AvatarImage src={profileImage} alt="Naseer Ahmed" className="object-cover" />
                <AvatarFallback className="text-6xl font-bold bg-card">NA</AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12" data-testid="text-about-title">
            About Me
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-bio">
              I'm a Computer Science student at Stony Brook University pursuing both my B.S. (graduating May 2025) 
              and M.S. (expected December 2026). With a 3.5 GPA and Presidential Scholarship, I'm deeply passionate 
              about building systems that leverage AI and machine learning to solve complex real-world problems.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My experience spans from developing Android ML applications at Zebra Technologies to conducting 
              research at Brookhaven National Laboratory. I specialize in multimodal AI systems, integrating 
              technologies like TensorFlow Lite, Whisper, and large language models into production-ready applications.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 text-center border-border">
              <Brain className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground mb-1">AI/ML</h3>
              <p className="text-sm text-muted-foreground">TensorFlow, OpenAI, LLMs</p>
            </Card>
            <Card className="p-6 text-center border-border">
              <Shield className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground mb-1">Security</h3>
              <p className="text-sm text-muted-foreground">System & App Security</p>
            </Card>
            <Card className="p-6 text-center border-border">
              <Code2 className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground mb-1">Full-Stack</h3>
              <p className="text-sm text-muted-foreground">React, Node, Next.js</p>
            </Card>
            <Card className="p-6 text-center border-border">
              <Cloud className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground mb-1">Cloud</h3>
              <p className="text-sm text-muted-foreground">GCP, AWS, Firebase</p>
            </Card>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-4 flex items-center gap-3 border-border">
            <GraduationCap className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground text-sm">B.S. Computer Science</p>
              <p className="text-xs text-muted-foreground">May 2025</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3 border-border">
            <GraduationCap className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground text-sm">M.S. Computer Science</p>
              <p className="text-xs text-muted-foreground">Dec 2026</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3 border-border">
            <Briefcase className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground text-sm">Presidential Scholarship</p>
              <p className="text-xs text-muted-foreground">Dean's List</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12" data-testid="text-experience-title">
            Experience
          </h2>
        </motion.div>
        
        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-primary/30" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-12 md:pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute left-4 md:left-8 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />
                
                <Card className="p-6 border-border hover-elevate" data-testid={`card-experience-${index}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12" data-testid="text-projects-title">
            Projects
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="p-6 h-full flex flex-col border-border hover-elevate"
                data-testid={`card-project-${index}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => window.open(project.github, "_blank")}
                    data-testid={`button-github-${index}`}
                  >
                    <SiGithub className="w-5 h-5" />
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const categories = [
    { title: "Languages", items: skills.languages, icon: Code2 },
    { title: "Frameworks & AI Tools", items: skills.frameworks, icon: Brain },
    { title: "Cloud & Platforms", items: skills.cloud, icon: Cloud }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12" data-testid="text-skills-title">
            Skills
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="px-4 py-2"
                    data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactFormSchema>) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon."
      });
      form.reset();
      setTimeout(() => contactMutation.reset(), 3000);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12" data-testid="text-contact-title">
            Get In Touch
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg text-muted-foreground">
              I'm currently looking for internship and full-time opportunities. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div className="space-y-4">
              <a 
                href="mailto:naseer3.14159@gmail.com"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors"
                data-testid="link-contact-email"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span>naseer3.14159@gmail.com</span>
              </a>
              
              <a 
                href="https://github.com/nasAhmed-chss"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors"
                data-testid="link-contact-github"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <SiGithub className="w-5 h-5" />
                </div>
                <span>github.com/nasAhmed-chss</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/naseer-ks-ahmed/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors"
                data-testid="link-contact-linkedin"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <SiLinkedin className="w-5 h-5" />
                </div>
                <span>linkedin.com/in/naseer-ks-ahmed</span>
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {contactMutation.isSuccess ? (
              <Card className="p-8 text-center border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-success-message">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
              </Card>
            ) : (
              <Card className="p-6 border-border">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Your Name"
                              {...field}
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your Email"
                              {...field}
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Your Message"
                              className="min-h-32 resize-none"
                              {...field}
                              data-testid="input-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={contactMutation.isPending}
                      data-testid="button-contact-submit"
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Naseer Ahmed. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => window.open("https://github.com/nasAhmed-chss", "_blank")}
          >
            <SiGithub className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => window.open("https://www.linkedin.com/in/naseer-ks-ahmed/", "_blank")}
          >
            <SiLinkedin className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => window.open("mailto:naseer3.14159@gmail.com", "_blank")}
          >
            <Mail className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
