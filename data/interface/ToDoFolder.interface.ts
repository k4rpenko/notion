export interface ToDoContent
{
    id: number;
    ColorCircle: string;
    Text: string;
    done: boolean;
}

export interface ToDoFolder
{
    type: string;
    folder: string;
    id: number;
    ToDo: Array<ToDoContent>;
    public: boolean,
    created_at?: Date;
    update_at: Date;
}
