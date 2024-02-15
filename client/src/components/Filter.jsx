const Filter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div>
      <label htmlFor="category">Filter by Category: </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
