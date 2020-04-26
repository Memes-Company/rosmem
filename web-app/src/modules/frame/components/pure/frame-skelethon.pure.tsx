import * as React from 'react';
import { SharedHelper } from 'src/modules/shared';
import { Props } from './frame-skelethon.pure.types';
import frameStyles from '../../frame.module.css';

const { isArray } = SharedHelper;

export class FrameSkelethon extends React.Component<Props> {
  render() {
    const { children } = this.props;

    const [
      header,
      body,
      footer
    ] = (isArray(children) && children) || [];

    return (
      <>
        <div className={frameStyles.header}>
          {header}
        </div>
        <div className={frameStyles.body}>
          {body}
        </div>
        <div className={frameStyles.footer}>
          {footer}
        </div>
      </>
    )
  }
}