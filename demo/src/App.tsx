import { PaginatedTable, ColType } from "../../src"

const columns: ColType<{ firstName: string; lastName: string }>[] = [
  {
    title: "First Name",
    key: "firstName",
    dataKey: "firstName",
    align: "center",
    render(value, record, index) {
      console.log({ value, record, index })
      return value
    },
  },
  {
    title: "First Name",
    key: "lastName",
    dataKey: "lastName",
    align: "center",
    render(value, record, index) {
      console.log({ value, record, index })
      return value
    },
  },
]
const data = [
  {
    firstName: "Osama",
    lastName: "Islam",
  },
  {
    firstName: "Umar",
    lastName: "Bunu",
  },
]

function App() {
  return (
    <PaginatedTable
      rowKey={(row) => row.firstName}
      dataSource={data}
      columns={columns}
    />
  )
}

export default App
