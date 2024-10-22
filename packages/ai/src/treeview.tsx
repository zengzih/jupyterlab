import { VDomRenderer } from '@jupyterlab/ui-components';
import React from 'react';
import { TableOfContents } from './tokens';
import MindChat from './components/Chat';

export class TableOfContentsWidget extends VDomRenderer<TableOfContents.IModel<TableOfContents.IHeading> | null> {
  /**
   * Constructor
   *
   * @param options Widget options
   */
  constructor(options: TableOfContents.IOptions) {
    super(options.model);
    this._placeholderHeadline = options.placeholderHeadline;
    this._placeholderText = options.placeholderText;
  }

  render(): JSX.Element | null {
    return <MindChat />;
  }

  readonly _placeholderHeadline: string;
  readonly _placeholderText: string;
}
