export interface LayoutItem {
    layout: { [layoutName: string]: string[] };
}

export interface LayoutItemObj {
    [layoutName: string]: LayoutItem;
}

export const ItemTypes = {
    WORD: 'word',
}

export interface DragItem {
    id: string
    type: string
    left: number
    top: number
}