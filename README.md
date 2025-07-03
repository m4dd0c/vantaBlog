# VantaBlog

A sleek, modern full-stack blog built with ##Next.js##, ##Clerk##, ##MongoDB##, and ##shadcn/ui##.

## 🚀 Features

- **Secure authentication** powered by Clerk  
- **Markdown-based posts** with category filtering and previews  
- **Responsive UI** using TailwindCSS and shadcn/ui components  
- **Client & API routes** protected via Clerk middleware  
- **Charts & analytics** to visualize blog stats with Recharts

## 🛠 Tech Stack

| Layer           | Technologies                        |
|----------------|--------------------------------------|
| **Frontend**    | React 18/19, Next.js 14+, TailwindCSS, shadcn/ui |
| **Auth**        | Clerk (v6)                           |
| **Database**    | MongoDB with Mongoose                |
| **Forms**       | Zod + react-hook-form                |
| **Markdown**    | react-markdown (soon)                |

## 👣 Getting Started

1. **Clone & Install**
    ```bash
    git clone https://github.com/m4dd0c/vantaBlog.git
    cd vantaBlog
    npm install
    ```

2. **Setup Env Vars**
    Add Clerk keys & MongoDB URI in `.env.local`:
    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    MONGODB_URI=
    ```

3. **Run Dev**
    ```bash
    npm run dev
    ```
    Visit [http://localhost:3000](http://localhost:3000)

## 🧠 Deployment

- Built for deployment on **Vercel** — it handles Next.js and environment variables out of the box.
- Ensure your MongoDB is live and Clerk is configured for your production domain.

---

### 👽 Contributions & Feedback

Open an issue or PR! This is my sandbox and playground — always room for improvements.

---

**VantaBlog** © 2025 m4dd0c — the chaotic-good personal blog you've been looking for.

---

**P.S.**: Meta-ready tagline for SEO:
> *“VantaBlog: sleek markdown blogging with Next.js, Clerk auth, MongoDB & modern UI components.”*
