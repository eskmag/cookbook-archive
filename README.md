# 📚 Cookbook Archive

A beautiful, modern recipe and cookbook management application built with React, TypeScript, and Supabase. Organize your favorite recipes, manage your cookbook collection, and discover new culinary adventures with a warm, glass-morphism design.

🌐 **[Live Demo](https://cookbookarchive.vercel.app)** - Try it now!

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration with Supabase Auth
- 📖 **Cookbook Management** - Create, edit, and organize your cookbook collection
- 🍳 **Recipe Management** - Add, edit, and categorize your favorite recipes
- ❤️ **Favorites System** - Mark recipes and cookbooks as favorites for quick access
- 👤 **User Profiles** - Customizable profile with statistics and account management
- 🎨 **Beautiful UI** - Warm glass-morphism design with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Search & Filter** - Easily find recipes and cookbooks
- 📊 **Statistics Dashboard** - Track your cookbook and recipe collection growth
- 🌐 **Cross-Device Access** - Access your recipes anywhere, anytime

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS with Glass-morphism effects
- **Backend**: Supabase (Database, Authentication, Real-time subscriptions)
- **Routing**: React Router DOM with client-side navigation
- **State Management**: React Context API
- **Build Tool**: Vite (Fast HMR and optimized builds)
- **Deployment**: Vercel (or Netlify)
- **Linting**: ESLint with TypeScript support

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/eskmag/cookbook-archive.git
   cd cookbook-archive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new project in [Supabase](https://supabase.com)
   - Configure your database tables for cookbooks, recipes, and user profiles
   - Set up Row Level Security (RLS) policies
   - Configure authentication settings and allowed domains

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project" and import your `cookbook-archive` repository
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Configure Supabase for Production**
   - Add your Vercel domain to Supabase Auth settings
   - Update redirect URLs if needed

### Alternative Deployment Options

- **Netlify**: Similar process with automatic GitHub integration
- **Firebase Hosting**: Use Firebase CLI for deployment
- **GitHub Pages**: For static hosting (requires additional configuration)

## 📖 Usage

### Getting Started
1. **Register** for a new account or **login** with existing credentials
2. **Create your first cookbook** to organize your recipes
3. **Add recipes** to your cookbooks with ingredients and instructions
4. **Mark favorites** to quickly access your most-loved recipes
5. **Edit your profile** to personalize your experience and view statistics

### Managing Cookbooks
- Create new cookbooks with titles, authors, and descriptions
- Edit existing cookbooks to keep information up-to-date
- Add or remove recipes from your cookbooks
- Mark cookbooks as favorites for quick access
- View cookbook statistics on your profile

### Managing Recipes
- Add new recipes with detailed instructions and ingredients
- Edit recipe information and categorization
- Mark recipes as favorites
- Search and filter through your recipe collection
- Track your recipe collection growth

### Profile Features
- Edit your display name and profile information
- View comprehensive statistics (total cookbooks, recipes, favorites)
- Manage account settings
- Secure logout functionality

## 🎨 Design Features

- **Glass-morphism UI** - Modern, translucent design elements with backdrop blur
- **Warm Color Palette** - Cozy, inviting browns and earth tones
- **Smooth Animations** - Polished hover effects and micro-interactions
- **Responsive Layout** - Mobile-first design that works on all devices
- **Touch-Friendly** - Optimized for mobile and tablet interaction
- **Accessibility** - Keyboard navigation and screen reader support
- **Dark Mode Ready** - Prepared for future dark theme implementation

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Type checking
npm run type-check
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── UserProfile.tsx  # Enhanced profile management
│   └── ...
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state management
│   ├── CookbookContext.tsx
│   └── RecipeContext.tsx
├── data/               # Static data and utilities
├── pages/              # Route components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── ...
├── assets/             # Static assets
├── App.tsx             # Main application with routing
├── main.tsx            # Application entry point
├── index.css           # Global styles with glass-morphism
└── supabase.ts         # Supabase configuration
```

### Key Features Implemented

- ✅ **User Authentication** with Supabase Auth
- ✅ **Profile Management** with editable user information
- ✅ **Recipe & Cookbook CRUD** operations
- ✅ **Favorites System** with real-time updates
- ✅ **Statistics Dashboard** with live data
- ✅ **Responsive Design** with mobile optimization
- ✅ **Glass-morphism UI** with warm color palette
- ✅ **Client-side Routing** with React Router

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain the glass-morphism design consistency
- Ensure mobile responsiveness
- Add proper error handling
- Write meaningful commit messages

## 🐛 Known Issues & Roadmap

### Current Limitations
- Profile picture upload (planned for future release)
- Recipe sharing between users (planned)
- Export/import functionality (planned)

### Upcoming Features
- 🔄 Recipe sharing and collaboration
- 📸 Image upload for recipes and cookbooks
- 📤 Export recipes to PDF
- 🌙 Dark mode theme
- 🔔 Notifications and reminders

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the excellent backend-as-a-service platform
- [Vite](https://vitejs.dev) for the blazing fast build tool
- [React](https://reactjs.org) for the powerful UI framework
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [Vercel](https://vercel.com) for seamless deployment and hosting

## 📧 Contact & Support

- **Issues**: Open a GitHub issue for bug reports or feature requests
- **Discussions**: Use GitHub Discussions for questions and community chat
- **Email**: Contact the maintainers for private inquiries

## 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🍴 Forking for your own use
- 📢 Sharing with others who might find it useful
- 🐛 Reporting bugs or suggesting improvements

---

Made with ❤️ and lots of ☕ by [Eskil](https://github.com/eskmag)

*Happy cooking and recipe organizing!* 🍳📚