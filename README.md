# 📚 Cookbook Archive

A beautiful, modern recipe and cookbook management application built with React, TypeScript, and Supabase. Organize your favorite recipes, manage your cookbook collection, and discover new culinary adventures with a warm, glass-morphism design.

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration with Supabase Auth
- 📖 **Cookbook Management** - Create, edit, and organize your cookbook collection
- 🍳 **Recipe Management** - Add, edit, and categorize your favorite recipes
- ❤️ **Favorites System** - Mark recipes and cookbooks as favorites for quick access
- 👤 **User Profiles** - Customizable profile with statistics and account management
- 🎨 **Beautiful UI** - Warm glass-morphism design with smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🔍 **Search & Filter** - Easily find recipes and cookbooks
- 📊 **Statistics** - Track your cookbook and recipe collection growth

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Custom CSS with Glass-morphism
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Vite
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cookbook-archive.git
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
   - Run the SQL migrations for your database tables
   - Configure authentication settings

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage

### Getting Started
1. **Register** for a new account or **login** with existing credentials
2. **Create your first cookbook** to organize your recipes
3. **Add recipes** to your cookbooks with ingredients and instructions
4. **Mark favorites** to quickly access your most-loved recipes
5. **Edit your profile** to personalize your experience

### Managing Cookbooks
- Create new cookbooks with titles, authors, and descriptions
- Edit existing cookbooks to keep information up-to-date
- Add or remove recipes from your cookbooks
- Mark cookbooks as favorites for quick access

### Managing Recipes
- Add new recipes with detailed instructions and ingredients
- Edit recipe information and categorization
- Mark recipes as favorites
- Search and filter through your recipe collection

## 🎨 Design Features

- **Glass-morphism UI** - Modern, translucent design elements
- **Warm Color Palette** - Cozy, inviting color scheme
- **Smooth Animations** - Polished hover effects and transitions
- **Responsive Layout** - Optimized for all screen sizes
- **Accessibility** - Keyboard navigation and screen reader support

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run type checking
npm run type-check
```

### Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── data/               # Static data and utilities
├── pages/              # Route components
├── assets/             # Static assets
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles
└── supabase.ts         # Supabase configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the excellent backend-as-a-service
- [Vite](https://vitejs.dev) for the fast build tool
- [React](https://reactjs.org) for the UI framework
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the maintainers.

---

Made with ❤️ and lots of ☕
