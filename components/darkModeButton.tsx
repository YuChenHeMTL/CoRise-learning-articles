import React from 'react'
import { IconButton } from '@mui/material'
import { BsMoon, BsSunFill } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import styles from '@/styles/utils.module.css'

export default function DarkMode() {
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        const dark = localStorage.getItem('dark')
        if (dark) {
        setIsDark(dark === 'true')
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem('dark', isDark.toString())
    }, [isDark])

    React.useEffect(() => {
        if (isDark) {
        document.documentElement.classList.add('dark')
        } else {
        document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    const toggleDark = () => {
        setIsDark(!isDark)
    }

    return (
        <IconButton aria-label="delete" onClick={toggleDark} className={styles.toggleDark}>
            <IconContext.Provider value={{ color: `${isDark ? "white": "black"}`}}>
            <div>
                {isDark ? <BsMoon /> : <BsSunFill /> }
            </div>
            </IconContext.Provider>
        </IconButton>
    )
}