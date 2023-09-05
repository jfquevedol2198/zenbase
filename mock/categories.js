import MockCategoryImage from "assets/images/category.png";

function category(name) {
  return {
    name,
    image: MockCategoryImage,
  };
}

const categories = [
  category("Meditate"),
  category("Active"),
  category("Sleep"),
  category("Guided Meditation"),
  category("Chill"),
  category("Feel Good"),
];

export default categories;
