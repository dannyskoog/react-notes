import { Note } from "../note-form/NoteForm";

const STORAGE_KEY = "notes";

class NoteStorage {
  get(id: string): Note | undefined {
    return this.getAll().find(note => note.id === id);
  }

  getAll(): Note[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }

  create(note: Note) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.getAll(), note]));
  }

  update(note: Note) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.getAll().map(n => n.id === note.id ? note : n)));
  }

  remove(id: string) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.getAll().filter(n => n.id !== id)));
  }
}

export const noteStorage = new NoteStorage();