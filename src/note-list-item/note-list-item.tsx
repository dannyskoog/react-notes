import React from "react";
import { parse } from "marked";
import { Note } from "../note-form/NoteForm";
import { Link } from "react-router-dom";

export interface Props {
  note: Note;
  onRemove: (id: string) => void;
}

export interface State {
  isExpanded: boolean;
}

export class NoteListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  getSafeHtml() {
    return {
      __html: parse(this.props.note.text, {
        breaks: true
      })
    };
  }

  getFormattedDate() {
    return new Date(this.props.note.date).toISOString().replace('T', ' ').substr(0, 16);
  }

  handleToggle() {
    this.setState(val => ({ isExpanded: !val.isExpanded }));
  }

  handleRemove() {
    this.props.onRemove(this.props.note.id);
  }

  render() {
    return (
      <div className={`note-list-item ${this.state.isExpanded ? 'expanded' : ''}`}>
        <span dangerouslySetInnerHTML={this.getSafeHtml()}></span>
        <span className="date">{this.getFormattedDate()}</span>
        <span className="toggle" onClick={() => this.handleToggle()}>{this.state.isExpanded ? 'Show less' : 'Show more'}</span>
        <span className="edit"><Link to={`/note/edit/${this.props.note.id}`}>Edit</Link></span>
        <span className="remove" onClick={() => this.handleRemove()}>Remove</span>
      </div>
    );
  }
}