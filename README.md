# Bible Study Dashboard - Organized File Structure

This project has been reorganized into separate, well-structured files for better maintainability and navigation.

**Live Demo:** [https://sabarivivek.github.io/Bible-Study/](https://sabarivivek.github.io/Bible-Study/)

## 📁 Project Structure

```
📂 Study/
├── 📄 index.html                    # Main HTML file
├── 📄 bible-study-dashboard.html    # Original combined file (backup)
├── 📄 README.md                     # This documentation file
├── 📂 styles/                       # CSS Stylesheets
│   ├── 📄 main.css                  # Base layout & core components
│   ├── 📄 components.css            # Tables, buttons, dropdowns
│   ├── 📄 modals.css               # Popups, overlays, filter cards
│   └── 📄 responsive.css           # Mobile, tablet, desktop breakpoints
├── 📂 scripts/                      # JavaScript Files
│   ├── 📂 data/
│   │   └── 📄 kings-data.js         # Biblical kings information
│   ├── 📂 ui/
│   │   ├── 📄 navigation.js         # Sidebar navigation & content switching
│   │   ├── 📄 dropdown.js           # Kingdom dropdown functionality
│   │   ├── 📄 pagination.js         # Table pagination controls
│   │   ├── 📄 filter.js             # Character filtering functionality
│   │   ├── 📄 modal.js              # King details popup & modal handling
│   │   └── 📄 sidebar.js            # Sidebar toggle & drawer functionality
│   └── 📄 main.js                   # App initialization & core functions
└── 📂 resources/                    # Images and assets
    └── 📄 filter-icon.svg
```

## 🎯 File Organization

### 🎨 CSS Files (styles/)
- **main.css**: Core layout, sidebar, header, navigation, global styles
- **components.css**: Tables, buttons, pagination, dropdowns, badges
- **modals.css**: Popup overlays, king details modal, filter cards
- **responsive.css**: Mobile, tablet, desktop responsive breakpoints

### 🔧 JavaScript Files (scripts/)
- **main.js**: Application initialization, global variables, table management
- **data/kings-data.js**: Complete biblical kings database
- **ui/navigation.js**: Sidebar navigation and content switching
- **ui/dropdown.js**: Kingdom selection dropdown functionality
- **ui/pagination.js**: Table pagination and page controls
- **ui/filter.js**: Character filtering and filter modal
- **ui/modal.js**: King details popup and modal management
- **ui/sidebar.js**: Sidebar collapse/expand functionality

## 🚀 Benefits of This Structure

### ✅ Easy to Read & Navigate
- **Clear separation of concerns**: HTML structure, CSS styling, and JavaScript functionality
- **Logical file naming**: Each file has a clear, descriptive name indicating its purpose
- **Organized by functionality**: Related code is grouped together

### ✅ Better Maintainability
- **Modular code**: Changes to one feature don't affect others
- **Easier debugging**: Issues can be traced to specific files
- **Scalable structure**: New features can be added without cluttering existing files

### ✅ Improved Performance
- **Efficient loading**: Only necessary CSS/JS files are loaded
- **Browser caching**: Separate files can be cached independently
- **Easier minification**: Files can be optimized individually

### ✅ Developer-Friendly
- **Version control**: Changes are easier to track across separate files
- **Collaboration**: Multiple developers can work on different files simultaneously
- **Code reusability**: Components can be easily reused or shared

## 📖 How to Use

1. **Main Entry Point**: Open `index.html` in your browser
2. **Modify Styles**: Edit the appropriate CSS file in the `styles/` folder
3. **Update Functionality**: Modify the relevant JavaScript file in the `scripts/` folder
4. **Add Data**: Update `scripts/data/kings-data.js` for new biblical information

## 🔧 Development Guidelines

- **CSS**: Keep styles organized by component/feature in the appropriate CSS file
- **JavaScript**: Maintain single responsibility principle - each file should handle one main concern
- **Data**: Keep all biblical data in the data folder for easy maintenance
- **Documentation**: Update this README when adding new files or features

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- 📱 **Mobile**: 480px and below
- 📱 **Small Mobile**: 600px and below  
- 📱 **Tablet**: 768px and below
- 💻 **Desktop**: 1200px and above

All responsive styles are organized in `styles/responsive.css` for easy maintenance.

---

*This organized structure makes the Bible Study Dashboard easier to maintain, extend, and collaborate on!*