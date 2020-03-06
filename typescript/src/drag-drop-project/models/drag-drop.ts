// Drap and Drop interface
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface Droppable {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dropLeaveHandler(event: DragEvent): void;
}