import * as React from 'react';

import { Frame, FrameSkelethon } from 'src/modules/frame';
import { Body } from 'src/modules/body';
import { Header } from 'src/modules/header';
import { Footer } from 'src/modules/footer';
import { ViewportTracker } from 'src/modules/viewport-tracker';

import styles from './app.module.css';

export class App extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Frame>
          {(spacerProps) => (
            <FrameSkelethon>
              <Header />
              <Body />
              <ViewportTracker>
                {(targetProps) => <Footer {...spacerProps} {...targetProps} />}
              </ViewportTracker>
            </FrameSkelethon>
          )}
        </Frame>
      </div>
    );
  }
}