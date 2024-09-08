import type { CSSProperties, FC } from 'react'
import { memo } from 'react'

const styles: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
  userSelect: "none"
}


export interface WordProps {
  title: string
  yellow?: boolean
  preview?: boolean
}

export const Word: FC<WordProps> = memo(function Box({ title, yellow, preview }) {
  const backgroundColor = yellow ? 'yellow' : 'white'
  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? 'BoxPreview' : 'Box'}
    >
      {title}
    </div>
  )
})
