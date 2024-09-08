import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'

import { snapToGrid as doSnapToGrid } from '../utils'

import { ItemTypes, DragItem } from '../interface'
import { DraggableBox } from './DraggableBox'
import { UrduKeyBoard } from '../UrduKeyBoard'
import { KeyboardReactInterface } from 'react-simple-keyboard'

const styles: CSSProperties = {
    width: "100vw",
    height: 300,
    border: '1px solid black',
    position: 'relative',
}

export interface ContainerProps {
    snapToGrid: boolean
}

interface BoxMap {
    [key: string]: { top: number; left: number; title: string }
}

export const Container: FC<ContainerProps> = ({ snapToGrid }) => {
    const [boxes, setBoxes] = useState<BoxMap>({
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
    })

    const [input, setInput] = useState("");
    const keyboardRef = useRef<KeyboardReactInterface | null>(null);

    const onChangeInput = (input: string): void => {
        setInput(input);
        keyboardRef.current?.setInput(input);
    };

    const addWord = (): void => {
        if (!input) {
            return;
        }

        const split = input.split(" ");
        split.forEach((word, index) => {

            setBoxes((prev: BoxMap): BoxMap => {

                if (!word) return prev;

                const key = `box_${index}_${word}`;


                if (boxes[key]) {
                    return prev;
                }
                return {
                    ...prev,
                    [key]: { top: 0, left: 0, title: word }
                };
            });
        });

        setInput("");
    }

    const moveBox = useCallback(
        (id: string, left: number, top: number) => {
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                }),
            )
        },
        [boxes],
    )

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.WORD,
            drop(item: DragItem, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset() as {
                    x: number
                    y: number
                }

                let left = Math.round(item.left + delta.x)
                let top = Math.round(item.top + delta.y)
                if (snapToGrid) {
                    ;[left, top] = doSnapToGrid(left, top)
                }

                moveBox(item.id, left, top)
                return undefined
            },
        }),
        [moveBox],
    )

    return (
        <>
            <div ref={drop} style={styles}>
                {Object.keys(boxes).map((key) => (
                    <DraggableBox
                        key={key}
                        id={key}
                        {...(boxes[key] as { top: number; left: number; title: string })}
                    />
                ))}
            </div>
            <>
                <input
                    className="key-board-input"
                    value={input}
                    placeholder={"Tap on the virtual keyboard to start"}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={addWord}>Add Word</button>
                <UrduKeyBoard keyboardRef={keyboardRef} onChange={onChangeInput} />

            </>
        </>
    )
}
