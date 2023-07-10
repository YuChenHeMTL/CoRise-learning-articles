"use client"
import styles from '@/styles/utils.module.css'
import React from 'react'
import DarkMode from './darkModeButton'
import TimeTracker from './timeTracker'
import Link from 'next/link'

export default function Layout({
  children, home
}: {
  children: React.ReactNode,
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      {home && (
        <div>
          <h1 className={`${styles.heading2Xl} ${styles.header}`}>
            <img src="/corise_icon.png" alt="CoRise Learning" className={styles.logo} />
            <div>
              CoRise Learning
            </div>
          </h1>
        </div>
      )}
      <DarkMode />
      {children}
      {!home && (
        <div className={styles.backToHome}>
          <TimeTracker />
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  )
}
