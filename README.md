# 🥛 Smoodh Premium Showcase

A premium, scroll-driven product experience inspired by Apple-style storytelling and cinematic UI design.

🔗 **Live Demo:** https://smoodh-premium-showcase.vercel.app/

---

## ✨ Features

* 🎬 Scroll-based product animation (120-frame sequence)
* ⚡ Smooth canvas rendering with optimized performance
* 🎨 Cinematic UI with depth, lighting, and gradients
* 🧠 Advanced motion design using Framer Motion
* 🤖 Interactive chatbot for user queries
* 📱 Fully responsive across devices
* 🚀 Deployed on Vercel for optimal performance

---

## 🛠 Tech Stack

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* HTML5 Canvas

---

## 📸 Preview

> Add a screenshot or GIF of the website here

---

## ⚙️ Installation

```bash
git clone https://github.com/Sarthak-075/Smoodh-Premium-Showcase.git
cd Smoodh-Premium-Showcase
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Build

```bash
npm run build
```

---

## 🌐 Deployment

Deployed on Vercel:  
https://smoodh-premium-showcase.vercel.app/

To deploy your own fork:
1. Push to GitHub
2. Import the repo into [Vercel](https://vercel.com)
3. Set build command: `npm run build`, output: `out/`

---

## 📁 Project Structure

```
smoodh/
├── app/
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page with product orchestration
│   └── globals.css        # Global styles
├── components/
│   ├── ArrowButton.tsx    # Left/right product navigation
│   ├── BuyNowSection.tsx  # Pricing and CTA section
│   ├── Chatbot.tsx        # Floating Q&A chatbot
│   ├── FloatingParticles.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx         # Section scroll navbar
│   ├── NoiseOverlay.tsx   # Noise texture overlay
│   ├── ProductBottleScroll.tsx  # Canvas scroll animation
│   ├── ProductDetails.tsx
│   └── ProductTextOverlays.tsx  # Scroll-driven text layers
├── data/
│   └── products.ts        # All flavor/product data (single source of truth)
├── lib/
│   ├── easing.ts          # Shared animation easing constants
│   └── ProductContext.tsx # Global product state (active flavor)
└── public/
    └── ...                # Frame sequences + product images
```

---

## 🎯 Inspiration

Inspired by premium product storytelling experiences like Apple, Nike, and modern Awwwards-winning websites.

---

## 👨‍💻 Author

Built by **Sarthak Agarwal**

---

⭐ If you like this project, consider starring the repo!
