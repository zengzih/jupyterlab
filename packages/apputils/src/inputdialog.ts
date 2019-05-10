// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { Widget } from '@phosphor/widgets';

import { Dialog } from './dialog';
import { Styling } from './styling';

const INPUT_DIALOG_CLASS = 'jp-Input-Dialog';

/**
 * Create and show a input dialog for a number.
 *
 * @param options - The dialog setup options.
 *
 * @returns A promise that resolves with whether the dialog was accepted
 */
export function getNumber(
  options: InputDialog.INumberOptions
): Promise<Dialog.IResult<number>> {
  let dialog = new Dialog({
    ...options,
    body: new InputNumberDialog(options)
  });
  return dialog.launch();
}

/**
 * Create and show a input dialog for a choice.
 *
 * @param options - The dialog setup options.
 *
 * @returns A promise that resolves with whether the dialog was accepted
 */
export function getItem(
  options: InputDialog.IItemOptions
): Promise<Dialog.IResult<string>> {
  let dialog = new Dialog({
    ...options,
    body: new InputItemsDialog(options)
  });
  return dialog.launch();
}

/**
 * Create and show a input dialog for a text.
 *
 * @param options - The dialog setup options.
 *
 * @returns A promise that resolves with whether the dialog was accepted
 */
export function getText(
  options: InputDialog.ITextOptions
): Promise<Dialog.IResult<string>> {
  let dialog = new Dialog({
    ...options,
    body: new InputTextDialog(options)
  });
  return dialog.launch();
}

export namespace InputDialog {
  export interface IOptions<T>
    extends Partial<
      Pick<
        Dialog.IOptions<T>,
        Exclude<keyof Dialog.IOptions<T>, 'body' | 'buttons' | 'defaultButton'>
      >
    > {
    /**
     * Label of the requested input
     */
    label: string;
  }

  export interface INumberOptions extends IOptions<Number> {
    /**
     * Default value
     */
    value?: number;
  }

  export interface IItemOptions extends IOptions<string> {
    /**
     * List of choices
     */
    items: Array<string>;
    /**
     * Default choice
     *
     * If the list is editable a string with a default value can be provided
     * otherwise the index of the default choice should be given.
     */
    current?: number | string;
    /**
     * Is the item editable?
     */
    editable?: boolean;
    /**
     * Placeholder text for editable input
     */
    placeholder?: string;
  }

  export interface ITextOptions extends IOptions<string> {
    /**
     * Default input text
     */
    text?: string;
    /**
     * Placeholder text
     */
    placeholder?: string;
  }
}

/**
 * Base widget for input dialog body
 */
class InputDialog<T> extends Widget implements Dialog.IBodyWidget<T> {
  /**
   * InputDialog constructor
   *
   * @param label Input field label
   */
  constructor(label: string) {
    super();
    this.addClass(INPUT_DIALOG_CLASS);

    let labelElement = document.createElement('label');
    labelElement.textContent = label;

    // Initialize the node
    this.node.appendChild(labelElement);
  }

  /** Input HTML node */
  protected _input: HTMLInputElement;
}

/**
 * Widget body for input number dialog
 */
class InputNumberDialog extends InputDialog<number> {
  /**
   * InputNumberDialog constructor
   *
   * @param options Constructor options
   */
  constructor(options: InputDialog.INumberOptions) {
    super(options.label);

    this._input = document.createElement('input', {});
    this._input.classList.add('jp-mod-styled');
    this._input.type = 'number';
    this._input.value = options.value ? options.value.toString() : '0';

    // Initialize the node
    this.node.appendChild(this._input);
  }

  /**
   * Get the number specified by the user.
   */
  getValue(): number {
    if (this._input.value) {
      return Number(this._input.value);
    } else {
      return Number.NaN;
    }
  }
}

/**
 * Widget body for input text dialog
 */
class InputTextDialog extends InputDialog<string> {
  /**
   * InputTextDialog constructor
   *
   * @param options Constructor options
   */
  constructor(options: InputDialog.ITextOptions) {
    super(options.label);

    this._input = document.createElement('input', {});
    this._input.classList.add('jp-mod-styled');
    this._input.type = 'text';
    this._input.value = options.text ? options.text : '';
    if (options.placeholder) {
      this._input.placeholder = options.placeholder;
    }

    // Initialize the node
    this.node.appendChild(this._input);
  }

  /**
   * Get the text specified by the user
   */
  getValue(): string {
    return this._input.value;
  }
}

/**
 * Widget body for input list dialog
 */
class InputItemsDialog extends InputDialog<string> {
  /**
   * InputItemsDialog constructor
   *
   * @param options Constructor options
   */
  constructor(options: InputDialog.IItemOptions) {
    super(options.label);

    this._editable = options.editable || false;

    let current = options.current || 0;
    let defaultIndex: number;
    if (typeof current === 'number') {
      defaultIndex = Math.max(0, Math.min(current, options.items.length - 1));
      current = '';
    }

    this._list = document.createElement('select');
    options.items.forEach((item, index) => {
      let option = document.createElement('option');
      if (index === defaultIndex) {
        option.selected = true;
        current = item;
      }
      option.value = item;
      option.textContent = item;
      this._list.appendChild(option);
    });

    if (options.editable) {
      /* Use of list and datalist */
      let data = document.createElement('datalist');
      data.id = 'input-dialog-items';
      data.appendChild(this._list);

      this._input = document.createElement('input', {});
      this._input.classList.add('jp-mod-styled');
      this._input.type = 'list';
      this._input.value = current;
      this._input.setAttribute('list', data.id);
      if (options.placeholder) {
        this._input.placeholder = options.placeholder;
      }
      this.node.appendChild(this._input);
      this.node.appendChild(data);
    } else {
      /* Use select directly */
      this.node.appendChild(Styling.wrapSelect(this._list));
    }
  }

  /**
   * Get the user choice
   */
  getValue(): string {
    if (this._editable) {
      return this._input.value;
    } else {
      return this._list.value;
    }
  }

  private _list: HTMLSelectElement;
  private _editable: boolean;
}
