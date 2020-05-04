import React, { ChangeEvent, FormEvent } from "react";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { parse } from 'marked';
import { v4 } from 'uuid';
import './NoteForm.css';
import { noteStorage } from '../note-storage/NoteStorage';

export interface Note {
  id: string;
  date: string;
  text: string;
}

interface Props {
  id: string;
}

interface State extends Note {}

const DEFAULT_NOTE: Note = {
  id: '',
  date: '',
  text: ''
};

class NoteForm extends React.Component<RouteComponentProps<Props>, State> {
  constructor(props: RouteComponentProps<Props>) {
    super(props);

    this.state = DEFAULT_NOTE;
  }

  componentDidMount() {
   this.initialize();
  }

  initialize() {
    let note: Note | undefined = DEFAULT_NOTE;
    const { id } = this.props.match.params;

    if (id) {
      note = noteStorage.get(id);

      if (!note) {
        this.props.history.push("/404");
        return;
      }
    }

    this.setState(note);
  }

  componentDidUpdate(prevProps: RouteComponentProps<Props>) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.initialize();
    }
  }

  handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    this.setState((val) => ({
      ...val,
      [name]: value
    }));
  }

  handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (this.state.id) {
      noteStorage.update(this.state);
    } else {
      noteStorage.create({
        id: v4(),
        date: new Date().toISOString(),
        text: this.state.text
      });
    }

    this.props.history.push("/");
  }

  isFormValid() {
    return !!this.state.text.trim();
  }

  getProcessed() {
    return {
      __html: parse(this.state.text, {
        breaks: true
      })
    };
  }

  render() {
    return (
      <div className="note-form">
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="row">
              <span><strong>Text</strong> (<a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank" rel="noopener noreferrer">markdown</a> supported)</span>
              <textarea  name="text" value={this.state.text} onChange={(e) => this.handleChange(e)}></textarea>
            </div>
            <div className="row">
              <input type="submit" value="Save" disabled={!this.isFormValid()} />
            </div>
          </form>
        </div>
        <div>
          <span className="preview"><strong>Preview</strong></span>
          <div dangerouslySetInnerHTML={this.getProcessed()}></div>
        </div>
      </div>
    )
  }
}

export default withRouter(NoteForm);