Project in Progress


npm create vite@latest .
```
This one command gives you a ready-to-go React app! 🎉

---

## 3. 📦 What is `npm install`?

When you build a project, you use **packages** (tools made by other developers). Think of them like **LEGO pieces** — you don't build them yourself, you just use them.

- `express` → Framework for building your API
- `mongoose` → Tool to talk to MongoDB database
- `dotenv` → Tool to use secret keys safely

`npm install` **downloads** all these packages into a `node_modules` folder.

---

## 4. 🔐 What is the `.env` File?

Imagine your app needs a **secret password** to connect to your database. You should **NEVER** write that password directly in your code because:

- Your code goes on GitHub (public!)
- Anyone can steal your secrets

So instead you write secrets in a `.env` file:
And you add .env to .gitignore so it never gets pushed to GitHub. ✅
```
PORT=3000
DB_URL=my_secret_database_url



🌐 What is Express?
Express is like a waiter in your restaurant. When a user makes a request like "give me the list of books", Express:

Receives the request
Processes it
Sends back a response

Imagine Express as a friendly host at a party. When someone knocks (that’s an HTTP request), Express checks the guest list (your routes) to see who they are and where they should go. Along the way, it hands them over to some helpful butlers (middleware), who check details like security, parse data, or log what’s happening. Finally, Express sends the guest (response) on their merry way. You tell Express how to handle each type of guest, and it smoothly does the rest!


app.get("/health", (req, res) => {
  res.json({ message: "API is up and running" })
})
```
This means: *"If someone visits `/health`, send them this message."*

---

## 6. 📂 Why `src` Folder Inside Backend?

It's a **convention** (a widely accepted good habit). You keep:
- Config files (`package.json`, `.env`) → at the **root**
- Actual app code → inside **`src/`**

It keeps things **organized and clean**. Just like you keep clothes in a wardrobe, not all over the floor! 😄

---

## 7. 🔄 What is `nodemon`?

Normally when you change your code, you have to **stop and restart** your server manually every time. That's very annoying!

`nodemon` watches your files and **automatically restarts the server** whenever you save a change. It's only used in **development** (on your laptop), not in production.

---

## 8. 🌿 What is Git & GitHub Branching?

Think of it like writing a **book:**

| Concept | Simple Meaning |
|---|---|
| `main/master` branch | The **final published** version of your book |
| New branch | A **rough draft** where you experiment |
| Pull Request (PR) | Asking *"should we add this to the final book?"* |
| Merge | **Accepting** the changes into the final book |

So you **never experiment directly on `main`**. You create a new branch, try things, and merge only when it works! ✅

---

## 9. 🚀 What is Deployment?

Right now your app runs on **`localhost`** — only YOU can see it on your laptop.

**Deployment** = Putting your app on the internet so **anyone in the world** can visit it with a real URL like `myapp.com`.

Savala is the platform used here to host/deploy the app.

---

## 10. 🏗️ Why a `build` Script?

When you deploy, the server (Savala) gets your code from GitHub. But GitHub **doesn't have `node_modules`** (remember, it's in `.gitignore`!).

So you write a `build` script that tells Savala:
> *"Hey, run `npm install` to get all the packages, then optimize the React app for production."*

---

## 🗺️ Big Picture — How Everything Connects
```
Your Code (VS Code)
      ↓
   GitHub (stores your code)
      ↓
   Savala (deploys it to internet)
      ↓
   Users visit your URL 🌍