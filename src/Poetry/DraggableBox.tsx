import type { CSSProperties, FC } from 'react'
import { memo } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../interface'
import { Word } from './Word'

function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export interface DraggableBoxProps {
  id: string
  title: string
  left: number
  top: number
}

export const DraggableBox: FC<DraggableBoxProps> = memo(function DraggableBox(
  props,
) {
  const { id, title, left, top } = props
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.WORD,
      item: { id, left, top, title },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title],
  )

  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true })
  // }, [])

  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="DraggableBox"
    >
      <Word title={title} />
    </div>
  )
})
