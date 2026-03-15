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


------------------------------------------------------------------------------------------------------------------
1. 🗄️ What is MongoDB & Why Do We Need It?
Think of MongoDB as a giant spreadsheet in the cloud where you store all your app's data — users, sessions, messages, etc.

It's free to get started
Instead of tables (like Excel), it stores data as documents (like JSON objects)
Example of a user stored in MongoDB:

{
  "name": "John Doe",
  "email": "john@gmail.com",
  "profileImage": "https://..."
}
```

The **connection string** is like the address + password to reach your database. It looks like:
```
mongodb+srv://username:password@cluster.mongodb.net/interviewDB

You save this in your .env file — never in your code!

2. 🔌 What is Mongoose?
Mongoose is a translator between your Node.js code and MongoDB.
Without it, talking to MongoDB is complicated. With it, you just write simple JavaScript. Think of it like a TV remote — you press one button instead of manually adjusting internal circuits.

3. 📋 What is a Schema & Model?
A Schema is like a form template that defines what fields every user must have.


// Schema = the template/blueprint
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String, default: "" },
  clerkId: { type: String, required: true, unique: true }
})

// Model = the tool you use to interact with the database
const User = mongoose.model("User", userSchema)
```

Think of it like this:
| Term | Real World Analogy |
|---|---|
| Schema | A job application form template |
| Model | The HR department that processes forms |
| Document | One filled-out application |

---


## 4. 🔐 What is Clerk?

Clerk handles **authentication** — meaning login, signup, Google sign-in, etc.

Instead of building all this yourself (which is very complex and risky), Clerk gives you **ready-made components** like:
- `<SignInButton>` — a button that opens a login popup
- `<SignedIn>` — only shows content if user is logged in
- `<SignedOut>` — only shows content if user is NOT logged in
- `<UserButton>` — shows profile picture with sign out option

**Setup is just 3 steps:**
1. Install the package
2. Add your API key to `.env`
3. Wrap your app with `<ClerkProvider>`

That's it! 🎉

---

## 5. 🔗 What is a Webhook?

This is a very important concept! Here's the simplest explanation:

Imagine you order a pizza 🍕. Instead of you calling the restaurant every 5 minutes asking *"is my pizza ready?"*, the restaurant **calls YOU** when it's done.

**That's a webhook** — instead of your app asking *"did anything happen?"* again and again, another service **automatically notifies** your app when something happens.

In this project:
> When a user signs up → Clerk automatically sends a message to your backend saying **"Hey! A new user was just created!"**

---

## 6. ⚙️ What is Inngest & Background Jobs?

**The Problem:**
- User signs up on Clerk ✅
- But MongoDB doesn't know about it ❌
- Stream doesn't know about it ❌

Clerk and MongoDB are **two completely separate services** that don't talk to each other automatically.

**The Solution — Inngest:**

Inngest is like a **middleman assistant** that:
1. Receives the webhook from Clerk (*"user created!"*)
2. Runs a **background job** (a function)
3. That function saves the user to MongoDB AND Stream
```
User Signs Up
     ↓
   Clerk
     ↓ (webhook: "user.created")
   Inngest
     ↓ (runs background job)
  ┌──────────────────┐
  ↓                  ↓
MongoDB           Stream
(saves user)   (saves user)


Why "background job"? Because it runs separately from the main app, in the background, without slowing anything down. The user doesn't have to wait for it.

7. 🌊 What is Stream?
Stream is a service that provides ready-made video calling and chat features. Building these from scratch would take months!
Just like Clerk handles auth, Stream handles video + chat. You just need:

An API Key
An API Secret

And you can add powerful video calling and messaging to your app in hours instead of months.

8. 🛡️ What is CORS?
CORS stands for Cross-Origin Resource Sharing. Here's a simple way to understand it:
Imagine your frontend (localhost:5173) wants to talk to your backend (localhost:3000). By default, browsers block this for security reasons — they don't allow two different origins to communicate.
CORS is like a bouncer at a club — you tell it which URLs are allowed in:

app.use(cors({
  origin: "http://localhost:5173", // only let THIS frontend talk to our backend
  credentials: true                // allow cookies to be sent
}))
```

`credentials: true` means cookies (used for authentication) can also be shared between them.

---

## 🗺️ Big Picture — How Everything Works Together
```
User clicks "Sign Up"
        ↓
      Clerk
   (handles auth)
        ↓
   Sends Webhook
  "user.created" event
        ↓
     Inngest
  (background job)
     ↙        ↘
MongoDB       Stream
(stores user  (stores user
 for our app)  for video/chat)