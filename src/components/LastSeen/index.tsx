'use client'

import { useEffect, useState } from 'react'

function formatLastSeen(timestamp: number): string {
  const start = new Date(timestamp * 1000)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }

  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }

  if (hours < 0) {
    hours += 24
    days -= 1
  }

  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += previousMonth.getDate()
    months -= 1
  }

  if (months < 0) {
    months += 12
    years -= 1
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return new Intl.DurationFormat(navigator.language, {
    style: 'digital',
    unitDisplay: 'narrow',
  }).format({
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  })
}

export const LastSeen = ({ ts }: { ts: number }) => {
  const [lastSeen, setLastSeen] = useState(() => formatLastSeen(ts))

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = formatLastSeen(ts)
      setLastSeen(time)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [ts])

  return <time>Last seen: {lastSeen}</time>
}
