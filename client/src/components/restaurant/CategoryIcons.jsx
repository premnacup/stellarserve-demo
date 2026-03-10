const CategoryIcons = ({ activeCategory, onCategorySelect }) => {
  const categories = [
    {
      name: "Drink",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="2" x2="6" y2="8"></line>
          <line x1="10" y1="2" x2="10" y2="8"></line>
          <line x1="14" y1="2" x2="14" y2="8"></line>
        </svg>
      ),
    },
    {
      name: "Food",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 10V9a6 6 0 1 1 12 0v1"></path>
          <path d="M3 10h18"></path>
          <path d="M3 14h18"></path>
          <path d="M6 14v1a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-1"></path>
          <path d="M9 7v.01"></path>
          <path d="M12 6v.01"></path>
          <path d="M15 7v.01"></path>
        </svg>
      ),
    },
    {
      name: "Cake",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path>
          <path d="M4 21h16"></path>
          <path d="M4 17h16"></path>
          <path d="M12 11V7"></path>
          <path d="M12 7l-1-1 1-1 1 1-1 1z"></path>
          <path d="M7 11c0-1.1.9-2 2-2s2 .9 2 2"></path>
          <path d="M13 11c0-1.1.9-2 2-2s2 .9 2 2"></path>
        </svg>
      ),
    },
    {
      name: "Snack",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3h12l1 3v12l-1 3H6l-1-3V6l1-3z"></path>
          <path d="M5 7h14"></path>
          <path d="M5 17h14"></path>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
    },
  ];

  const handleSelect = (categoryName) => {
    if (activeCategory === categoryName) {
      onCategorySelect(null); // Deselect
    } else {
      onCategorySelect(categoryName);
    }
  };

  return (
    <div className="icon-categories">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="icon-item"
          onClick={() => handleSelect(cat.name)}
        >
          <div
            className={`icon-box ${activeCategory === cat.name ? "active" : ""}`}
          >
            {cat.icon}
          </div>
          <span>{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryIcons;
