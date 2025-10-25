# Technical Documentation: Portfolio Website (Assignment 2)

## Project Overview

### Description
This is an enhanced version of the **Computer Science Portfolio Website** created for **Assignment 2**.  
It builds upon the foundation of Assignment 1 by adding **dynamic functionality**, **data handling**, and **improved animations** using **HTML**, **CSS**, and **JavaScript**.  
The website serves as an interactive digital portfolio, showcasing personal information, technical skills, projects, and contact details in a clean, accessible, and responsive design.

### Technologies Used
- **HTML5** – Semantic structure and accessibility (ARIA roles, headings, and form labels).  
- **CSS3** – Advanced styling with custom properties, Flexbox/Grid layouts, transitions, and animations.  
- **JavaScript (ES6+)** – DOM manipulation, LocalStorage, event-driven interactivity, and scroll-based behavior.  
- **External Tools** – Formspree for form handling, Google Fonts (Inter).  

### Purpose
The purpose of this assignment was to extend the static portfolio into a dynamic, user-driven website that demonstrates key web engineering skills: **interactivity, data persistence, user feedback, and animation**.

---

## Project Structure

```
Assignment-1/
├── index.html              # Main HTML file with semantic structure
├── css/
│   └── styles.css          # Comprehensive CSS with variables and responsive design
├── js/
│   └── script.js           # JavaScript functionality and interactivity
├── assets/
│   ├── icons/              # SVG icons for skills section (12 icons)
│   └── images/             # Project images and profile picture (5 images)
├── docs/
│   ├── ai-usage-report.md  # Detailed AI usage documentation
│   └── technical-documentation.md  # This technical documentation
└── README.md               # Project overview and setup instructions
```


---

## HTML Structure

- **Semantic Layout:** Uses `<header>`, `<nav>`, `<section>`, and `<footer>` for clear organization.  
- **Sections Included:**
  1. **Hero Section** – Main landing area with profile and introduction.  
  2. **About Me** – Centered paragraph, equal height layout.  
  3. **Skills** – Responsive grid showcasing technologies.  
  4. **Projects** – Grid-based project cards with hover animations.  
  5. **Contact** – Form with validation and visual feedback.  
- **Greeting Bar Component:** A fixed dynamic banner located below the navbar. It displays the message:
  > “Welcome, [Name]! Learn more about me on LinkedIn 💼”

---

## CSS Architecture

- **Variables & Design Tokens:** Uses `:root` variables for color, typography, spacing, and transitions.  
- **Responsive Design:** Three main breakpoints – 1024 px (tablet), 860 px (mobile), and 480 px (small screens).  
- **Layout Techniques:**  
  - **Flexbox & Grid** – Used for responsive alignment of sections.  
  - **Clamp & Viewport Units** – Maintain proportional section height (`clamp(60vh, 80vh, 100vh)`).  
- **Animations & Transitions:**  
  - **Greeting Bar:** Slides and fades when appearing/disappearing.  
  - **Scroll Animations:** Skills and projects fade in when entering the viewport.  
  - **Reduced Motion Support:** Respects users’ system preferences to minimize motion.  
- **Accessibility Styling:**  
  - High-contrast text colors.  
  - `:focus-visible` outlines for keyboard users.

---

## JavaScript Functionality

### 1. Personalized Greeting Bar
- Stores user’s name in **LocalStorage** and retrieves it on reload.  
- Provides **Save**, **Edit**, and **Clear** actions with smooth DOM transitions.  
- Fades out automatically when scrolling past the home section.  
- Includes a LinkedIn link button within the message.  
- Enhances personalization while meeting dynamic content and data handling requirements.

### 2. Form Validation
- Validates name, email, and message fields before submission.  
- Displays inline errors and a success/failure message after sending via Formspree.  
- Uses asynchronous logic (`fetch`) and error handling (`try...catch`).

### 3. Scroll Animations
- Uses the **Intersection Observer API** to trigger fade/slide animations for sections and cards when they appear on screen.  
- Improves user engagement and site performance by loading animations only when visible.

### 4. Responsive Navbar & Active Links
- Smooth scrolling navigation with automatic active-state highlighting.  
- Mobile navigation toggles visibility via JavaScript event listeners.

---

## Accessibility & User Experience

- **Keyboard Navigation:** All interactive elements (buttons, inputs, links) are focusable and have visible outlines.  
- **ARIA Attributes:** Used for live greeting updates (`aria-live="polite"`) and form feedback messages.  
- **Feedback System:** Clear indicators for form submission, validation errors, and success messages.  
- **Reduced Motion Preference:** Optional disabling of animations for sensitive users.

---

## Performance & Optimization

- Efficient use of **LocalStorage** for persistent state.  
- Event listeners optimized to prevent unnecessary re-renders.  
- Lightweight images and SVG icons for faster loading.  
- Code organized into clear, modular sections with descriptive comments.

---

## Features Summary

| Feature | Description | Technology |
|----------|--------------|-------------|
| Personalized Greeting Bar | Saves user name, fades on scroll, LinkedIn link | JavaScript + LocalStorage |
| Responsive Layout | Equal section heights and alignment | CSS Grid / Flexbox |
| Scroll Animations | Fade-in for skills and projects | Intersection Observer |
| Form Validation | Inline errors and success feedback | JavaScript (fetch + try/catch) |
| Accessibility | Focus-visible styles, ARIA roles | CSS + ARIA |

---

## Conclusion

The Assignment 2 version of the portfolio demonstrates **interactive web engineering principles** by combining design, usability, and programming.  
Through HTML, CSS, and JavaScript  supported by AI tools like ChatGPT and Cursor AI. The site achieves a higher level of interactivity, accessibility, and polish while fulfilling all project requirements for **Dynamic Content**, **Data Handling**, **Animations**, and **Error Handling**.