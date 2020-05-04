import React from "react";
import './NoteList.css';
import { noteStorage } from '../note-storage/NoteStorage';
import { Note } from "../note-form/NoteForm";
import { NoteListItem } from "../note-list-item/note-list-item";

export interface State {
  notes: Note[];
}

export class NoteList extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    this.setState({
      notes: noteStorage.getAll()
    });
  }

  handleRemove(id: string) {
    noteStorage.remove(id);

    this.setState(val => ({ notes: val.notes.filter(note => note.id !== id) }));
  }

  render() {
    return (
      <div className="note-list">
        {this.state.notes.length
          ? <ul>
              {this.state.notes.map(note => (
                <li key={note.id}>
                  <NoteListItem note={note} onRemove={(id) => this.handleRemove(id)} />
                </li>
              ))}
            </ul>
          : <div className="no-notes">No notes yet :(</div>
        }
      </div>
    )
  }
}