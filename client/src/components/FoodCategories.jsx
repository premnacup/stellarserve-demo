const FoodCategories = () => {
  const categories = [
    { name: "Burgers", class: "tile-burgers" },
    { name: "Pizza", class: "tile-pizza" },
    { name: "BBQ", class: "tile-bbq" },
    { name: "Fruit", class: "tile-fruit" },
    { name: "Sushi", class: "tile-sushi" },
    { name: "Noodle", class: "tile-noodle" },
  ];

  return (
    <>
      <div className="section-header">
        <h2>Category</h2>
        <span>View all</span>
      </div>
      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.name} className={`category-tile ${cat.class}`}>
            {cat.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodCategories;
