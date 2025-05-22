'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import styles from './Players.module.css'

type Props = {
  items: string[]
  maxItems?: number
}

export const Players = ({ items, maxItems = 15 }: Props) => {
  const searchParams = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 0))
  const totalPages = useMemo(
    () => Math.ceil(items.length / maxItems),
    [items.length, maxItems]
  )

  const itemsWindow = page * maxItems + maxItems

  const itemsToDisplay = useMemo(
    () => items.slice(page * maxItems, itemsWindow),
    [items, page, maxItems, itemsWindow]
  )

  const hasNextPage = useMemo(
    () => itemsWindow < items.length,
    [items.length, itemsWindow]
  )

  const backUrl = encodeURIComponent(`/players?page=${page}`)

  useEffect(() => {
    window.history.pushState(null, '', `?page=${page}`)
  }, [page])

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {itemsToDisplay.map((item) => (
          <li className={styles.listItem} key={item}>
            <Link href={`/players/${item}?rt=${backUrl}`}>{item}</Link>
          </li>
        ))}
      </ul>

      <footer className={styles.footer}>
        <button
          className={styles.button}
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ⬅️
        </button>

        <span>
          {`${page + 1}`.padStart(2, '0')} / {totalPages}
        </span>
        <button
          className={styles.button}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNextPage}
        >
          ➡️
        </button>
      </footer>
    </div>
  )
}
