export const BYTETEK_PROGRAMS = [
  {
    id: "kids-tech-explorers",
    category: "Kids Tech Explorers",
    ageGroup: "Ages 6–10",
    description: "Introduce kids to digital creativity and robotics fundamentals.",
    courses: [
      {
        id: "digital-art-kids",
        name: "Digital Art & Animation",
        price: 65000,
        description: "Learn digital design and animation basics",
      },
      {
        id: "lego-robotics",
        name: "LEGO Robotics",
        price: 65000,
        description: "Explore robotics with LEGO kits and programming",
      },
    ],
  },
  {
    id: "junior-tech-innovators",
    category: "Junior Tech Innovators",
    ageGroup: "Ages 11–13",
    description: "Develop design and programming skills with hands-on projects.",
    courses: [
      {
        id: "graphic-design",
        name: "Graphic Design",
        price: 100000,
        description: "Master modern design tools and principles",
      },
      {
        id: "digital-art-junior",
        name: "Digital Art & Animation",
        price: 120000,
        description: "Advanced animation and digital art creation",
      },
      {
        id: "python-kids",
        name: "Python for Kids",
        price: 130000,
        description: "Learn programming fundamentals with Python",
      },
    ],
  },
  {
    id: "teen-tech-accelerator",
    category: "Teen Tech Accelerator",
    ageGroup: "Ages 14–18",
    description: "Professional-level training in cutting-edge tech skills.",
    courses: [
      {
        id: "ai-creatives",
        name: "AI for Creatives",
        price: 130000,
        description: "Explore AI tools for creative professionals",
      },
      {
        id: "ui-ux-design",
        name: "UI/UX Design",
        price: 140000,
        description: "Design modern user interfaces and experiences",
      },
      {
        id: "web-development",
        name: "Web Development",
        price: 150000,
        description: "Build full-stack web applications",
      },
      {
        id: "mobile-app-dev",
        name: "Mobile App Development",
        price: 180000,
        description: "Create professional mobile applications",
      },
      {
        id: "software-qa",
        name: "Software App Testing (QA)",
        price: 130000,
        description: "Quality assurance and software testing",
      },
      {
        id: "video-editing",
        name: "Video Editing",
        price: 150000,
        description: "Professional video editing and production",
      },
    ],
  },
]

export const CLASS_INFO = {
  physical: {
    days: [
      { day: "Thursday", time: "4:00 PM" },
      { day: "Friday", time: "4:00 PM" },
      { day: "Saturday", time: "9:00 AM" },
      { day: "Sunday", time: "9:00 AM" },
    ],
    location: "Kaduna Bilal Ibnu Rabah Academy",
    address: "4 Ahmadu Chanchangi Rd, Tudun Wada, Namiya 800282, Kaduna",
    phone: "+2347064686613",
  },
  virtual: {
    days: "Flexible scheduling available",
  },
  contact: {
    email: "byteteklimited@gmail.com",
  },
}

export const PROGRAM_INFO = {
  duration: "3 Months",
  intensity: "Intensive, Hands-On",
  format: "Physical & Virtual Classes",
  instructorLed: true,
  beginner: "Beginner-friendly",
  discount: {
    percentage: 30,
    text: "Early Registration: 30% OFF selected courses",
  },
  payment: "Installment payment allowed",
}
