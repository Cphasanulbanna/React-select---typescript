import { useState } from "react"
import Select, { SelectOption } from "./Select"

const options = [
  {label: 'option 1', value:'value 1'},
  {label: 'option 2', value:'value 2'},
  {label: 'option 3', value:'value 3'},
  {label: 'option 4', value:'value 4'}
]

const App = () => {
  const [value1,setValue1] = useState<SelectOption[]>([options[0]])
  const [value2,setValue2] = useState<SelectOption | undefined>(options[0])
  return (
    <>
    <Select multiple={true} options={options} value={value1} onChange={(option) => setValue1(option)}/>
      <br />
    <Select  options={options} value={value2} onChange={(option) => setValue2(option)}/>
    </>
  )
}

export default App