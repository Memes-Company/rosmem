import React from 'react';
import { 
  Header, 
  Body, 
  Footer 
} from '../../containers';
import './app.container.css';

export const App = () => {
  return (
    <div className="app">
      <Header class="app__header" />
      <Body class="app__body" />
      <Footer class="app__footer" />
    </div>
  )
}