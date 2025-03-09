export interface NoteFolder{
    type: string;
    folder: string,
    id: number
    title: string,
    content: string,
    public: boolean,
    created_at?: Date;
    update_at: Date;
}
