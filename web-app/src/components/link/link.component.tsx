import React from 'react';
import { ClassName, LinkProps } from '../../types';
import { useParentClassName } from '../../hooks';
import './link.component.css';

export const Link: React.FC<React.PropsWithChildren<ClassName<LinkProps>>> = ({className, url, children}) => {
  const parentClassName = useParentClassName(className);

  return (
    <a href={url} className={"link" + parentClassName}>
      {children}
    </a>
  )
}