// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {VDomRenderer} from '@jupyterlab/ui-components';
import React, {useState} from 'react';
// import { TableOfContentsTree } from './toctree';
import {TableOfContents} from './tokens';
import {Button, Input} from './components'
import {ButtonProps} from "./components/types";
import { MessageBox } from './components/messageBox';
import { Dialog } from './components/dialog'

const getFileType = (fileName: string) => {
    // 使用正则表达式提取扩展名
    const match = fileName.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1] : null; // 返回扩展名，或者返回 null 如果没有找到
}

const WorkFileList: React.FC<ButtonProps> = () => {
    let currentIndex: number = -1;
    const handleClick = (index: number)=> {
        console.log('currentIndex:', index, 233)
        currentIndex = index;
    };
    const getFileTypeIcon = (fileName: string) => {
        switch (getFileType(fileName)) {
            case 'xlsx':
                return 'https://commonresource-1252524126.cdn.xiaoeknow.com/image/m239f5p80a82.png'
            case 'ipynb':
                return 'https://commonresource-1252524126.cdn.xiaoeknow.com/image/m239f1pe0es1.png'
            default:
                return 'https://commonresource-1252524126.cdn.xiaoeknow.com/image/m239f1sj0tn3.png\n'
        }
    }
    return (
        <div className='work-file list-view'>
            {
                Array.from({ length: 10 }).map((item: any|undefined, index: number) => {
                    return (
                        <div className={ `list-item ${index === currentIndex ? 'active' : ''}` }
                             key={ index }
                             onClick={ ()=> handleClick(index) }
                        >
                            <div className='name-icon'>
                                <span className='icon'>
                                    <img src={ getFileTypeIcon('.xlsx') } />
                                </span>
                                <span className='name'>评测集模板(1).xlsx</span>
                            </div>
                            <span className='date_time'>2d ago</span>
                        </div>
                    )
                })
            }
        </div>
    )
}


/**
 * Table of contents widget.
 */

const RenderWorkList = ()=> {
    const [visible, setVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleSearch = () => { // todo 搜索
    }

    const handleCommit = ()=> {
        // setVisible(true);
        setDialogVisible(true);
    };

    const handleMessageBoxClose = () => {
        setVisible(false);
    };

    const handleMessageBoxConfirm = () => {
        setVisible(false);
    };
    return (
        <div className='user_panel-container'>
            <div className='actions'>
                <div className='actions-items'>
                    <div className='item btn'>
                        <img src='https://commonresource-1252524126.cdn.xiaoeknow.com/image/m239f0ah01p5.png' />
                    </div>
                    <div className='item img'>
                        <img src='https://commonresource-1252524126.cdn.xiaoeknow.com/image/m239f35b0twi.png'/>
                    </div>
                    <div className='item img'>
                        <img src='https://commonresource-1252524126.cdn.xiaoeknow.com/image/m239f4lx0yv3.png'/>
                    </div>
                    <div className='item img'>
                        <img src='https://commonresource-1252524126.cdn.xiaoeknow.com/image/m239f4ee0k6w.png'/>
                    </div>
                </div>
                <div className='action-commit' onClick={ handleCommit }>提交作业</div>
            </div>
            <div className='search_layout'>
                <Input placeholder={'请输入名称搜索'}>
                    <img className='input-search_icon' src='https://commonresource-1252524126.cdn.xiaoeknow.com/image/m239f4l406mo.png' />
                </Input>
                <Button type={'primary'} onClick={ handleSearch }>搜索</Button>
            </div>
            <div className='work-paths'></div>
            <div className='work-header'>
                <span>Name</span>
                <span>Modify</span>
            </div>
            <WorkFileList/>
            <MessageBox message={ '这是描述信息' } visible={ visible }>
                <Button onClick={ handleMessageBoxClose }>取消</Button>
                <Button type='primary' onClick={ handleMessageBoxConfirm }>确认</Button>
            </MessageBox>
            <Dialog visible={ dialogVisible } title={'选择提交作业路径'}>

            </Dialog>
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

    /*handleSearch(): void { // todo 搜索
    }

    commitWork(): void {
        this.visible = true;
    }

    handleMessageBoxClose() {
        this.visible = false;
    }

    handleMessageBoxConfirm() {

    }*/

    render(): JSX.Element | null {
        return <RenderWorkList />
    }

    readonly _placeholderHeadline: string;
    readonly _placeholderText: string;
}
