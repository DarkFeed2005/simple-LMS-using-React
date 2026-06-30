# 🚀 Manifest LMS - High-Performance Course Management Ecosystem

> A modern, ultra-fast, memory-safe learning management platform built in React and Node.js that seamlessly consolidates course tracking, lecturer management, and real-time data persistence into a lightweight, modular interface.

<p align="center">
  <a href="https://react.dev/" target="_blank" rel="noreferrer">
    <img src="https://skillicons.dev/icons?i=react" alt="react" width="50" height="50"/>
  </a>&nbsp;
  <a href="https://nodejs.org/" target="_blank" rel="noreferrer">
    <img src="https://skillicons.dev/icons?i=nodejs" alt="nodejs" width="50" height="50"/>
  </a>&nbsp;
  <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
    <img src="https://skillicons.dev/icons?i=postgres" alt="postgresql" width="50" height="50"/>
  </a>&nbsp;
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://skillicons.dev/icons?i=tailwind" alt="tailwind" width="50" height="50"/>
  </a>&nbsp;
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://skillicons.dev/icons?i=ts" alt="typescript" width="50" height="50"/>
  </a>
</p>

---

## 🌟 Overview

**Manifest LMS** is a streamlined, high-performance course management platform designed to eliminate administrative friction for training institutes. Operating on a robust architecture, Manifest LMS allows administrators to manage academic records with precision while providing a clean, distraction-free environment for course oversight.

By prioritizing a "minimal control surface" design, the platform ensures rapid data entry, instant visual feedback, and reliable state management, making it the ideal tool for modern academic workflows.

### Why Manifest LMS?

* **Unified Manifest**: Replaces manual spreadsheets with a structured, persistent database view.
* **Status-Driven UX**: Course rows feature intelligent "status rails" that provide immediate visual context on duration and commitment.
* **Instant Filtering**: Optimized search logic allows for sub-millisecond retrieval of course records by ID or name.
* **Reliable Persistence**: Backed by scalable PostgreSQL (Neon) infrastructure to ensure your data is always safe and synchronized.
* **Validation-First Input**: Ensures data integrity with comprehensive real-time input validation before commit.

---

## ✨ Features

### 🎯 Core Features

* **Course Creation & Persistence**: Add detailed course records including ID, Name, Lecturer, and Duration.
* **Intelligent Search**: Real-time filtering engine that parses IDs and names instantly.
* **Retirement Workflow**: Secure removal of obsolete courses with built-in confirmation dialogs to prevent accidental data loss.
* **Real-time Metrics**: Dynamic course counters that track the total active academic catalog.

### 🎨 UI/UX Features

* **Architectural Dark Mode**: A professional `#0B0E14` base theme designed for long-duration technical tasks.
* **Visual Status Rails**: Color-coded left-edge indicators represent course duration, allowing for rapid scanning of the course load.
* **Responsive Layouts**: Flexible grid systems built with Tailwind CSS that adapt from desktop to tablet seamlessly.
* **Kinetic Interaction**: Subtle animations for state transitions and input focus states.

### 🔧 Technical Features

* **Modular Component Architecture**: Decoupled UI logic (Form, List, Search) ensures maintainability and testing ease.
* **Secure Data Management**: Backend connection pooling utilizing environment-level variable masking to protect database credentials.
* **State Optimization**: High-performance React `useState` and `useEffect` hooks for snappy UI response times.

---

## 🎥 Demo

### Live Previews
🔗 [Access Live Demo Environment](https://your-deployment-link.com)  

---

## 🛠️ Technologies Used

### Frontend & UI
* **React**: Component-based UI library for high-speed interactivity.
* **Tailwind CSS**: Utility-first CSS framework for design consistency.
* **TypeScript**: Strict type-safety for complex state mapping and prop management.

### Core Ecosystem & Logic
* **Node.js (Express)**: Scalable backend routing and REST API framework.
* **PostgreSQL (Neon)**: Cloud-native, scalable database storage.

### Storage & Tooling
* **SQLx (via Node Driver)**: Efficient database query handling.
* **Dotenv**: Secure configuration management for server environments.

---

## 📦 Installation

To host Manifest LMS locally, follow these steps:

### Steps

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/manifest-lms.git](https://github.com/your-username/manifest-lms.git)
   cd manifest-lms
   ```
2. **Setup Backend & Environment**
   ```bash
   cd backend
   npm install
   # Create a .env file with DATABASE_URL='your-neon-connection-string'
   node server.js
   ```
3. **Launch the Frontend**
    ```bash
    cd ../frontend
      npm install
    npm run dev
    ```
### 🚀 Usage

* **Adding Courses:** Navigate to the "New / Record" section, input the required academic details, and click the "Add course" button to update your manifest.
* **Managing Records:** Use the search bar in the top-right to filter your current course library. Use the "Retire" action to remove legacy entries.
* **Monitoring Load:** Watch the "Total Courses" counter for real-time updates as you modify your database records.

 ### 📁 Project Structure
 ```
Manifest-LMS/
├── backend/
│   ├── server.js           # Express API & DB Connector
│   └── .env                # Secure credentials
├── src/                    # Frontend Components
│   ├── App.jsx             # Main State Hub
│   ├── CourseForm.jsx      # Validation & Input logic
│   ├── CourseList.jsx      # Rendering & Status Rails
│   └── SearchCourse.jsx    # Filtering logic
└── README.md
```
## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Update documentation as needed
- Test your changes across browsers
- Ensure responsive design is maintained

## 👨‍💻 Author

- **GitHub** <a href="https://github.com/darkfeed2005" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=github" alt="github" width="20" height="20"/> </a>
- LinkedIn <a href="https://www.linkedin.com/in/kalana-yasassri-684591251/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg" alt="linkedin" width="20" height="20"/> </a>
- Instagram <a href="https://www.instagram.com/kalana_yasassri" target="_blank" rel="noreferrer"> <img src="https://skillicons.dev/icons?i=instagram" alt="instagram" width="20" height="20"/> </a>
