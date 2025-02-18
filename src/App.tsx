import { useState } from "react"
import Select from "./Select"

const options = [
  {label: 'option 1', value:'value 1'},
  {label: 'option 2', value:'value 2'},
  {label: 'option 3', value:'value 3'},
  {label: 'option 4', value:'value 4'}
]

const App = () => {
  const [value,setValue] = useState<typeof options[0] | undefined>(options[0])
  return (
    <Select options={options} value={value} onChange={(option) => setValue(option)}/>
  )
}

export default App