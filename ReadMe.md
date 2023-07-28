# Chakra Paginated Table

Chakra Paginated Table is a customizable and feature-rich table component built with Chakra UI, inspired by the pagination functionality of Ant Design (antd). It allows you to easily render a paginated table by providing data and column configurations.

## Installation

Can be installed using npm or yarn:

npm install chakra-paginated-table

or

yarn add chakra-paginated-table

## Usage

To use Chakra Paginated Table in your project, follow these steps:

1. Import the necessary components:

import { ChakraPaginatedTable } from 'chakra-paginated-table';

2. Define your columns and data source:

const columns = [
{ title: 'Name', dataIndex: 'name', key: 'name' },
{ title: 'Age', dataIndex: 'age', key: 'age' },
{ title: 'Address', dataIndex: 'address', key: 'address' },
];

const dataSource = [
{ key: '1', name: 'John Doe', age: 30, address: '123 Main St' },
{ key: '2', name: 'Jane Smith', age: 25, address: '456 Elm St' },
// Add more data...
];

3. Render the Chakra Paginated Table component:

const MyTableComponent = () => {
return <ChakraPaginatedTable columns={columns} dataSource={dataSource} />;
};

## Props

The Chakra Paginated Table component accepts the following props:

- columns (Array): An array of column configurations. Each column object should have title, dataIndex, and key properties.
- dataSource (Array): An array of objects representing the data source for the table. Each object should have keys matching the dataIndex defined in the columns.

## Customization

Chakra Paginated Table provides various customization options:

- Pagination Options: You can customize the number of rows displayed per page and the positioning of the pagination controls.

- Styling: Chakra UI offers a wide range of styling options. You can easily apply custom styles to the table, columns, and pagination controls to match your design requirements.

- Localization: You can customize the text displayed for the pagination controls to support different languages.

## Contributing

Contributions are welcome! If you find any issues or have ideas for improvements, please feel free to open an issue or submit a pull request.

## License

Chakra Paginated Table is open-source software licensed under the MIT License.

## Acknowledgments

Chakra Paginated Table was inspired by the pagination functionality of Ant Design (antd) and aims to provide a similar experience using Chakra UI. We extend our gratitude to the Ant Design team for their great work.

---
