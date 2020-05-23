import * as React from 'react';
import classnames from 'classnames';

import { TagInput } from '../../stateful';
import { Props, State } from './field.stateful.types';
import styles from './field.module.css';

export class Field extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tagInputRef: React.createRef(),
      isFocus: false,
    };
  }

  onClick = () => {
    const { 
      tagInputRef: {
        current: tagInputElement
      }
    } = this.state;

    if (!tagInputElement) {
      throw new Error('tagInputElement is null or undefined.');
    }

    const tagInputlement = tagInputElement.state.inputRef.current;
    
    if (!tagInputlement) {
      throw new Error('tagInputRootElement is null or undefined.');
    }

    tagInputlement.focus();
  }

  render() {
    const { tagInputRef, isFocus } = this.state;

    const rootStyles = {
      [styles.root]: true,
      [styles.focus]: isFocus,
    };

    return (
      <div
        className={classnames(rootStyles)}
        onClick={this.onClick}
      >
        <TagInput ref={tagInputRef} />
      </div>
    );
  }
}
