# 💾 Maleyha Fatima — Interactive Portfolio

A Windows 95–inspired developer portfolio built with **Next.js**, **React**, and **TypeScript**. Instead of a static page, it simulates a fully functional retro desktop environment — complete with a terminal emulator, draggable windows, a taskbar, and classic DOS-style interactions.

**Live:** [maleyhas-portfolio.vercel.app](https://maleyhas-portfolio.vercel.app)

---

## Features

### 🖥️ Terminal Emulator
- Type commands to navigate the portfolio (`help`, `skills`, `projects`, `experience`, etc.)
- Clickable command shortcuts — no typing required
- `start.bat` batch runner executes all commands at once for a quick full tour
- `cls` clears the terminal history
- Classic DOS-style error handling for unrecognized commands (`Bad command or file name`)
- Typed-cursor intro animation on load with configurable speed and completion callbacks

### 🪟 Multi-Window Desktop System
- Draggable, stackable, minimizable windows for projects, experience, contact, and about
- Z-index focus management via a shared counter — clicking any window brings it to the front
- Staggered window positioning so multiple open windows never perfectly overlap
- Windows can be opened directly from terminal commands (e.g. `about.exe`, `contact.exe`, `projects\mathaid.exe`)

### 📋 Taskbar
- Live taskbar reflects all open and minimized windows
- Click a taskbar item to restore or minimize its window
- About shortcut always accessible from the taskbar

---

## Commands

| Command | Description |
|---|---|
| `help` | List all available commands |
| `type education.txt` | Display my education details |
| `type skills.txt` | Display tech stack as Devicon icons |
| `dir C:\Projects /w` | Browse projects directory |
| `dir C:\Experience /w` | Browse experience directory |
| `about.exe` | Open the about window |
| `contact.exe` | Open the contact window |
| `projects\<name>.exe` | Open a specific project window |
| `experience\<name>.exe` | Open a specific experience window |
| `start.bat` | Run all commands and open all windows |
| `cls` | Clear the terminal |

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** React, custom CSS
- **Animation:** Framer Motion, custom typed-cursor component
- **Icons:** Devicon
- **Deployment:** Vercel

---

## Project Structure

```
/app
  page.tsx              # Main terminal + window orchestration
/components
  ProjectWindow.tsx   # Draggable project detail window
  ExperienceWindow.tsx
   ContactWindow.tsx
   AboutWindow.tsx
   Taskbar.tsx
/data
  commands.ts         # All terminal command definitions
  projects.ts         # Project metadata
  experience.ts       # Experience metadata
/types
  window.ts           # Window state types
```

---

## Running Locally

```bash
git clone https://github.com/maleyhaf/terminal-portfolio
cd terminal-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start typing.

---

## Design Decisions

**Why a terminal?** Most developer portfolios look the same. A terminal-style interface is immediately memorable, naturally suits a developer audience, and lets the content speak through interaction rather than scroll.

**Why Windows 95?** The retro desktop metaphor adds personality while keeping the UX intuitive — everyone knows what a window, taskbar, and close button do. It also gave a strong visual constraint to design within.

**Clickable commands** were added after realizing most visitors wouldn't want to type everything out — they lower the barrier to exploration without breaking the terminal illusion.