import { ToDoFolder } from "../interface/ToDoFolder.interface";

export default class ToDoCache {
    public static ToDos: ToDoFolder[] = [];
    public static ToDo: ToDoFolder | null = null;

    private static arrayListeners: ((Datas: ToDoFolder[]) => void)[] = [];
    private static singleListener: ((Data: ToDoFolder | null) => void)[] = [];

    //Single
    public static AddSingleListener(listener: (Data: ToDoFolder | null) => void): void {
        this.singleListener.push(listener);
    }

    public static RemoveSingleListener(listener: (Data: ToDoFolder | null) => void): void {
        this.singleListener = this.singleListener.filter(l => l !== listener);
    }

    private static NotifySingleListener(): void {
        this.singleListener.forEach(listener => listener(this.ToDo));
    }

    public static SetSingleToDo(newData: ToDoFolder | null): void {
        this.ToDo = newData;
        this.NotifySingleListener();
    }

    //Array
    public static AddListener(listener: (Datas: ToDoFolder[]) => void): void {
        this.arrayListeners.push(listener);
    }

    public static RemoveListener(listener: (Datas: ToDoFolder[]) => void): void {
        this.arrayListeners = this.arrayListeners.filter(l => l !== listener);
    }

    public static GetId(id: number): ToDoFolder {
        return this.ToDos.find(data => data.id === id)!;
    }

    private static NotifyListeners(): void {
        this.arrayListeners.forEach(listener => listener([...this.ToDos]));
    }

    public static Add(newData: ToDoFolder): void {
        this.ToDos.unshift(newData);
        this.NotifyListeners();
        this.SetSingleToDo(newData);
    }

    public static Change(update: ToDoFolder): void {
        const index = this.ToDos.findIndex(data => data.id === update.id);
        if (index !== -1) {
            this.ToDos[index] = update;
            this.NotifyListeners();
        }
    }

    public static Delete(Id: number): void {
        this.ToDos = this.ToDos.filter(data => data.id !== Id);
        this.NotifyListeners();
    }
}
