// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {VDomRenderer} from '@jupyterlab/ui-components';
import React, { useEffect } from 'react';
// import { TableOfContentsTree } from './toctree';
import {TableOfContents} from './tokens';
// import Prism from 'prismjs';
// import 'prismjs/themes/prism-tomorrow.css'; // 引入样式文件
// import 'prismjs/components/prism-python';
// import {Button, Input} from './components'

const MindChat = (): JSX.Element | null =>  {
    useEffect(() => {
        // 在组件挂载后，进行代码高亮
        //@ts-ignore
        Prism.highlightAll();
    }, []);
    const contentList = [
        { type: 'question', content: '请帮我分析这一段代码是否有错误', userName: 'zhoudan' },
        { type: 'answer', content: {
            code: `
                def multiply(a, b):
                    return a * b
                `,
                list: [
                    { label: '错误类型:', value: '无错误' },
                    { label: '错误代码行: ', value: '无' },
                    { label: '错误代码行: ', value: '这段代码的语法和逻辑都是正确的。定义了一个乘法函数multiply，并正确调用该函数计算 3和4的乘积，最后打印结果' },
                    { label: '修正建议: ', value: '无需修正' },
                ]
            }, userName: 'zhoudan' }
    ];
    return (
        <div className='mind-chat__wrapper'>
            <img src='https://commonresource-1252524126.cdn.xiaoeknow.com/image/m26fk2j40ml7.png' className={'bg_cover'} />
            <div className={'qa_content'}>
                <div className={'qa_content-list'}>
                    {
                        contentList.map((row: any, index: number) => (<div key={index} className={'qa_content-list_item'}>
                            <div className={'head_portrait'}>
                                <img src='https://commonresource-1252524126.cdn.xiaoeknow.com/image/m27cfdgg0ulr.png'/>
                            </div>
                            <div className={`content ${row.type}`}>
                                <div className={'user_name'}>{ row.userName }</div>
                                <div className={'inner_text'}>
                                    {
                                        typeof row.content === 'string' ? row.content :
                                            <div className={'code_content'}>
                                                <pre>
                                                    <code className="language-python">
                                                        { row.content.code }
                                                    </code>
                                                </pre>
                                                <div className={'code_list'}>
                                                    {
                                                        row.content.list.map((item: any, index: number) => (<div key={index} className={'code_list_item'}>
                                                            <div className={'code_list_item_label'}>{ item.label }</div>
                                                            <div className={'code_list_item_value'}>{ item.value }</div>
                                                        </div>))
                                                    }
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>))
                    }
                </div>
            </div>
            <div className={'send_message_content'}>
                <div className={'message_textarea_inner'}>
                    <textarea placeholder='请输入你的问题'></textarea>
                </div>
                <div className={'send_action'}>
                    <img src='https://commonresource-1252524126.cdn.xiaoeknow.com/image/m26f5q6k0nad.png'/>
                </div>
            </div>
        </div>
    )
}

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
        return <MindChat></MindChat>
    }

    readonly _placeholderHeadline: string;
    readonly _placeholderText: string;
}
