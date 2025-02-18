import { useEffect, useState } from "react"
import styles from "./select.module.css"

export type SelectOption= {
    label: string,
    value: string | number
}

type MultipleSelectProps = {
    multiple: true,
    value: SelectOption[],
    onChange: (value: SelectOption[]) => void,

}

type SingleSelectProps = {
    multiple?: false,
    value?: SelectOption,
    onChange: (value: SelectOption | undefined) => void,

}

type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

const Select = ({multiple, value,onChange,options}: SelectProps) => {
    const [open,setOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    const clearOptions = () => {
       multiple ? onChange([]) : onChange(undefined)
    }

    const selectOption = (option: SelectOption) => {
        if(multiple) {
            if(value?.includes(option)) {
                onChange(value?.filter((o) => o !== option))
            }
            else {
                onChange([...value, option])
            }
        }
        else {

            if(option !== value) onChange(option)
        }
    }

    const isOptionSelected = (options: SelectOption) => {
        return multiple ? value?.includes(options) :  options === value
    }

    useEffect(() => {
        if(open){
            setHighlightedIndex(0)
        }
    }, [open])

  return (
    <div 
    onBlur={() => setOpen(false)}
    onClick={() => setOpen((prev) => !prev)}
    tabIndex={0} 
    className={styles.container}>
        <span className={styles.value}>{multiple ? value?.map((item) => <button
        className={styles["option-badge"]}
         onClick={(e) => {
            e.stopPropagation()
            selectOption(item)
        }} key={item.value}>{item?.label}
            <span className={styles["remove-btn"]}>&times;</span>
        </button>) :  value?.label}</span>
        <button onClick={(e) => {
            clearOptions()
            e.stopPropagation()
        }} className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${open ? styles.show : ""}`}>
            {options?.map((option, index) => {
                return <li 
                 key={option.value}
                 className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} ${index === highlightedIndex ? styles.highlighted : ""}`}
                 onClick={(e) => {
                    e.stopPropagation()
                    selectOption(option)
                    setOpen(false)
                 }}
                 onMouseEnter={() => setHighlightedIndex(index)}
                 >{option.label}
                 </li>
            })}
        </ul>
    </div>
  )
}

export default Select