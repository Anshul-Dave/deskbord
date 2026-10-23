<div align="center">

# 🖥️ Deskbord

### A modern, interactive admin dashboard — available as a desktop app

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 📖 About The Project

**Deskbord** is an interactive admin dashboard built for **data visualization and management**. It is created with **React** and **Vite**, styled with **Tailwind CSS**, and packaged with **Electron**, so you can run it in the browser during development and use it as a **native desktop application** on Windows, macOS and Linux.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 📊 | **Data Visualization** | See your data clearly in a clean dashboard |
| 🗃️ | **Data Management** | Manage and organize your information in one place |
| 🖥️ | **Desktop App** | Runs as a standalone app using Electron |
| 🎞️ | **Smooth Animations** | Fluid transitions powered by Framer Motion |
| 🎨 | **Modern UI** | Beautiful, responsive design with Tailwind CSS |
| ⚡ | **Fast Development** | Instant updates with Vite Hot Module Replacement |

---

## 🖼️ Screenshots

> Add your screenshots here (create a `screenshots/` folder and upload images).

| Dashboard | Data View |
|:---:|:---:|
| ![Dashboard](screenshots/dashboard.png) | ![Data](screenshots/data.png) |

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| UI Library | [React 19](https://react.dev/) |
| Build Tool | [Vite](https://vite.dev/) |
| Desktop Shell | [Electron](https://www.electronjs.org/) + electron-builder |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Linting | [ESLint](https://eslint.org/) |

---

## 📂 Folder Structure

```
deskbord/
│
├── main/               # ⚙️ Electron main process
├── public/             # 🌐 Static assets
├── src/                # 💻 React source code (components, pages, styles)
├── index.html          # Entry HTML file
├── vite.config.mjs     # Vite configuration
├── eslint.config.js    # ESLint configuration
├── package.json        # Dependencies & scripts
└── README.md
```

---

## 🚀 Getting Started

Follow these simple steps to run the project on your computer.

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [Git](https://git-scm.com/)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Anshul-Dave/deskbord.git
cd deskbord
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the app

**Desktop app (Electron + Vite together):**

```bash
npm run dev
```

This starts the Vite server on **http://localhost:5173** and then opens the Electron desktop window automatically. 🎉

**Browser only (without Electron):**

```bash
npm run vite-dev
```

Then open **http://localhost:5173** in your browser.

---

## 📦 Build For Production

Create an installable desktop app:

```bash
npm run build
```

The installer will be created by `electron-builder` (check the `dist` / output folder).

---

## 📜 Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Runs Vite + Electron together (desktop app) |
| `npm run vite-dev` | Runs only the Vite dev server on port 5173 |
| `npm run electron-dev` | Opens Electron once Vite is ready |
| `npm run build` | Builds the app and packages it with Electron |
| `npm run preview` | Previews the production build |
| `npm run lint` | Checks code for errors with ESLint |

---

## 🛣️ Roadmap

- [ ] Dark / Light theme toggle
- [ ] More chart types and widgets
- [ ] Export data to CSV / PDF
- [ ] User login and roles
- [ ] Auto-update support for the desktop app

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Anshul Dave**

[![GitHub](https://img.shields.io/badge/GitHub-Anshul--Dave-181717?style=flat&logo=github)](https://github.com/Anshul-Dave)

---

<div align="center">

⭐ **If you like this project, please give it a star!** ⭐

</div>
