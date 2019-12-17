import React from 'react';
import { ClassName, LinkProps } from '../../../types';
import { useClassName } from '../../../hooks';
import './link.pure.css';

export const Link: React.FC<React.PropsWithChildren<ClassName<LinkProps>>> = ({className, onClick, url, children}) => {
  const parentClassName = useClassName(className);

  return (
    <a href={url} onClick={onClick} className={"link" + parentClassName}>
      {children}
    </a>
  )
}