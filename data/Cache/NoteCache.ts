import { NoteFolder } from "../interface/NoteFolder.interface";

export default class NoteCache {
    public static Notes: NoteFolder[] = [];
    private static listeners: ((notes: NoteFolder[]) => void)[] = [];

    public static AddListener(listener: (notes: NoteFolder[]) => void): void {
        this.listeners.push(listener);
    }


    public static RemoveListener(listener: (notes: NoteFolder[]) => void): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    public static GetId(id: number): NoteFolder {
        return this.Notes.find(note => note.id === id)!;
    }

    private static NotifyListeners(): void {
        this.listeners.forEach(listener => listener([...this.Notes]));
    }

    public static Add(newNote: NoteFolder): void {
        this.Notes.unshift(newNote);
        this.NotifyListeners();
    }

    public static Change(updatedNote: NoteFolder): void {
        const index = this.Notes.findIndex(note => note.id === updatedNote.id);
        if (index !== -1) {
            this.Notes[index] = updatedNote;
            this.NotifyListeners();
        }
    }

    public static Delete(noteId: number): void {
        this.Notes = this.Notes.filter(note => note.id !== noteId);
        this.NotifyListeners();
    }
}
