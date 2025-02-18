import { useState } from "react"
import styles from "./select.module.css"

type SelectOption= {
    label: string,
    value: string
}

type SelectProps = {
    value?: SelectOption,
    onChange: (value: SelectOption | undefined) => void  ,
    options: SelectOption[]
}

const Select = ({value,onChange,options}: SelectProps) => {
    const [open,setOpen] = useState(false)

    const clearOptions = () => {
        onChange(undefined)
    }
  return (
    <div 
    onBlur={() => setOpen(false)}
    onClick={() => setOpen((prev) => !prev)}
    tabIndex={0} 
    className={styles.container}>
        <span className={styles.value}>{value?.label}</span>
        <button onClick={(e) => {
            clearOptions()
            e.stopPropagation()
        }} className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${open ? styles.show : ""}`}>
            {options?.map((option) => {
                return <li key={option.label} className={styles.option}>{option.label}</li>
            })}
        </ul>
    </div>
  )
}

export default Select