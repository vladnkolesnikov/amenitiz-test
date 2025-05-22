import styles from './PageLoader.module.css'

export const PageLoader = () => {
  return (
    <div className={styles.root}>
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className={styles.spinner}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="80, 200"
          strokeDashoffset="0"
          className={styles.spinnerPath}
        />
      </svg>
    </div>
  )
}
