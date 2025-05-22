import Image from 'next/image'
import styles from './Avatar.module.css'

type Props = {
  name: string
  imageUrl?: string
}

export const Avatar = ({ name, imageUrl }: Props) => (
  <div className={styles.avatar}>
    {imageUrl ? (
      <Image
        className={styles.avatar}
        src={imageUrl}
        alt={`${name}'s avatar`}
        unoptimized
        fill
      />
    ) : (
      name.slice(0, 2)
    )}
  </div>
)
