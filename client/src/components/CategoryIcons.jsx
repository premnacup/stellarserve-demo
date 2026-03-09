const CategoryIcons = () => {
  return (
    <div className="icon-categories">
      <div className="icon-item">
        <div className="icon-box">
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
        </div>
        <span>Drink</span>
      </div>
      <div className="icon-item">
        <div className="icon-box active">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M7 12h10"></path>
            <path d="M7 9h10"></path>
            <path d="M7 15h10"></path>
          </svg>
        </div>
        <span>Food</span>
      </div>
      <div className="icon-item">
        <div className="icon-box">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <span>Cake</span>
      </div>
      <div className="icon-item">
        <div className="icon-box">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
        <span>Snack</span>
      </div>
    </div>
  );
};

export default CategoryIcons;
