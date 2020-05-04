import React from 'react';
import { Route, BrowserRouter, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import NoteForm from "./note-form/NoteForm";
import { NoteList } from "./note-list/NoteList";
import { NotFound } from "./not-found/NotFound";

export class App extends React.Component {
  render() { 
    return (
      <div className="App">
        <BrowserRouter>
          <header>
            <div className="title">React notes</div>
            <ul className="navigation">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/note/create">Create new</Link></li>
            </ul>
          </header>
          <div className="content">
            <Switch>
              <Route path="/note/create">
                <NoteForm />
              </Route>
              <Route path="/note/edit/:id">
                <NoteForm />
              </Route>
              <Route path="/" exact>
                <NoteList />
              </Route>
              <Route path="/404">
                <NotFound />
              </Route>
              <Redirect to="/404" />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  };
}