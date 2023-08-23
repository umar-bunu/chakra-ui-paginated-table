Sure, here's a styled version of your `readme.md`:

---

# 📊 Chakra Paginated Table

**Chakra Paginated Table** is a customizable and feature-rich table component built with Chakra UI, inspired by the pagination functionality of Ant Design (antd). It allows you to easily render a paginated table by providing data and column configurations.

## 📦 Installation

Can be installed using npm or yarn:

```bash
npm install chakra-paginated-table
```

or

```bash
yarn add chakra-paginated-table
```

## 🚀 Usage

To use Chakra Paginated Table in your project, follow these steps:

1. **Import the necessary components:**

```javascript
import { ChakraPaginatedTable } from "chakra-paginated-table";
```

2. **Define your columns and data source:**

```javascript
const columns = [
  { title: "Name", dataKey: "name", key: "name" },
  { title: "Age", dataKey: "age", key: "age" },
  { title: "Address", dataKey: "address", key: "address" },
];

const dataSource = [
  { key: "1", name: "John Doe", age: 30, address: "123 Main St" },
  { key: "2", name: "Jane Smith", age: 25, address: "456 Elm St" },
  // Add more data...
];
```

3. **Render the Chakra Paginated Table component:**

```javascript
const MyTableComponent = () => {
  return <ChakraPaginatedTable columns={columns} dataSource={dataSource} />;
};
```

## 🤝 Contributing

If you want to contribute to this project, feel free to submit a pull request.

🔗 [GitHub Repository](https://github.com/umar-bunu/chakra-ui-paginatated-table)

## 📜 Props

The Chakra Paginated Table component accepts the following props:

- **columns (Array)**: An array of column configurations. Each column object should have title, dataKey, and key properties.
- **dataSource (Array)**: An array of objects representing the data source for the table. Each object should have keys matching the dataKey defined in the columns.

## 🎨 Customization

Chakra Paginated Table provides various customization options:

- **Pagination Options**: You can customize the number of rows displayed per page and the positioning of the pagination controls.
- **Styling**: Chakra UI offers a wide range of styling options. You can easily apply custom styles to the table, columns, and pagination controls to match your design requirements.
- **Localization**: You can customize the text displayed for the pagination controls to support different languages.

## 🖋 About the Author

Hi, I'm [Umar Bunu](https://github.com/umar-bunu). I'm a software developer passionate about open-source projects.

## 📜 License

Chakra Paginated Table is open-source software licensed under the MIT License.

## 🙏 Acknowledgments

Chakra Paginated Table was inspired by the pagination functionality of Ant Design (antd) and aims to provide a similar experience using Chakra UI. We extend our gratitude to the Ant Design team for their great work.

---
