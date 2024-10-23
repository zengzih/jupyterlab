import 'highlight.js/styles/monokai.css';
//@ts-ignore
import { receiveStream, getHistoryStream } from '../utils/eventStream.js';
import React, { ChangeEvent, Component } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

//@ts-ignore
const { marked } = window.marked;

const renderer = {
  code(code: { text: string; lang: string }): string {
    const { text, lang } = code;
    //@ts-ignore
    const highlighted = hljs.highlight(text, {
      language: hljs.getLanguage(lang) ? lang : 'plaintext'
    }).value;
    return `<pre class="!overflow-visible"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary dark:bg-gray-950"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary">${lang}</div><div class="sticky top-9 md:top-[5.75rem]"><div class="absolute bottom-0 right-2 flex h-9 items-center copy_code" data-type="copy"><div data-type="copy" class="flex items-center rounded bg-token-sidebar-surface-primary px-2 font-sans text-xs text-token-text-secondary dark:bg-token-main-surface-secondary"><span data-type="copy" class="" data-state="closed"><button data-type="copy" class="flex gap-1 items-center py-1"><svg data-type="copy" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg><span data-type="copy" class='copy_code'>copy</span></button></span></div></div></div><div class="overflow-y-auto code-body p-4" dir="ltr"><code class="!whitespace-pre hljs language-${lang}">${highlighted}</code></div></div></pre>`;
  }
};

//@ts-ignore
marked.use({ renderer });

// 定义 streamTest 中单个数据块的类型
// eslint-disable-next-line @typescript-eslint/naming-convention
interface StreamData {
  code: number;
  data: {
    answer: string;
    end: boolean;
    messageId: string;
    messageType: string;
    question: string;
    userId: number;
  };
  msg: string;
}

//@ts-ignore
const streamTest: StreamData[] = [
  {
    code: 200,
    data: {
      answer: '你',
      end: false,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  },
  {
    code: 200,
    data: {
      answer: '好，这',
      end: false,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  },
  {
    code: 200,
    data: {
      answer: '是使用 Python ',
      end: false,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  },
  {
    code: 200,
    data: {
      answer: '输出“hello world',
      end: false,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  },
  {
    code: 200,
    data: {
      answer: '”的代码：',
      end: false,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  },
  {
    code: 200,
    data: {
      answer: '\n\n```python\n',
      end: false,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  },
  {
    code: 200,
    data: {
      answer: 'print("hello world',
      end: false,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  },
  {
    code: 200,
    data: {
      answer: '")\n```',
      end: false,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  },
  {
    code: 200,
    data: {
      answer: '")\n```',
      end: true,
      messageId: '01JAJYF21EK3625E8CQR8CZ0HV',
      messageType: 'TEXT',
      question: '用python输出hello world',
      userId: 1
    },
    msg: '操作成功'
  }
];

interface StreamMessages {
  id: string;
  type: 'question' | 'answer';
  content: string;
  userName: string;
  isStreaming: boolean;
  complete: boolean;
}

// 定义组件的状态类型
// eslint-disable-next-line @typescript-eslint/naming-convention
interface AppState {
  fullMarkdown: string;
  currentIndex: number;
  buffer: string;
  isInsideCodeBlock: boolean;
  questionMsg: string;
  selectionText: string;
  courseId: string;
  clientid: string;
  sessionId: string;
  streamMessages: StreamMessages[];
}

class App extends Component<NonNullable<unknown>, AppState> {
  baseUrl: string;

  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      fullMarkdown: '',
      currentIndex: 0,
      buffer: '',
      isInsideCodeBlock: false,
      questionMsg: '',
      streamMessages: [],
      selectionText: '',
      clientid: 'e5cd7e4891bf95d1d19206ce24a7b32e',
      courseId: '1847592123333513218',
      sessionId: 'cs9ocfmcbm67nqe01gn0'
    };
    this.baseUrl = 'https://commonresource-1252524126.cdn.xiaoeknow.com/image/';
    //@ts-ignore
    // window.addEventListener('message', ({ data: { action, source }}) => {
    //   if (action === 'activeCellSourceChanged') {
    //     this.setState({ questionMsg: source });
    //   }
    // });
    //@ts-ignore
    document.addEventListener('mouseup', (e: any) => {
      const {
        target: { className }
      } = e;
      if (/cm-line|jp-InputPrompt/i.test(className)) {
        //@ts-ignore
        const selectionText = window.getSelection().toString();
        this.setState({ selectionText });
      }
    });

    document.addEventListener('click', (e: any) => {
      const {
        target: { dataset }
      } = e;
      if (dataset.type === 'copy') {
        let parent = e.target.parentNode;
        let preNode = null;
        while (parent) {
          if (parent.tagName === 'PRE') {
            preNode = parent;
            break;
          }
          parent = parent.parentNode;
        }
        if (preNode) {
          const codeText = preNode.querySelector('code').innerText;
          navigator.clipboard.writeText(codeText);
          const copyNode = preNode.querySelector('span.copy_code');
          if (copyNode) {
            copyNode.innerText = '已复制';
            setTimeout(() => (copyNode.innerText = 'copy'), 3 * 1000);
          }
        }
      }
    });
  }

  get quesetion() {
    return {
      id: String(Date.now()) + Math.random(),
      type: 'question' as const,
      userName: '',
      content: '',
      // content:  marked(content),
      isStreaming: false,
      complete: true
    };
  }

  get answer() {
    return {
      id: String(Date.now()) + Math.random(),
      type: 'answer' as const,
      userName: '',
      content: '',
      isStreaming: true,
      complete: true
    };
  }

  componentDidMount() {
    const { clientid } = this.state;
    getHistoryStream({ clientid, pageSize: 500, pageNum: 1 }).then(
      ({ code, data, msg }) => {
        const streamMessages: StreamMessages[] = [];
        data.forEach(item => {
          const { answer, question } = item; // userId
          streamMessages.push(
            ...[
              { ...this.quesetion, content: marked(question) },
              { ...this.answer, content: marked(answer) }
            ]
          );
        });
        this.setState({ streamMessages });
      }
    );
  }

  isCompleteMarkdown(buffer: string): boolean {
    const codeBlockCount = (buffer.match(/```/g) || []).length;
    return codeBlockCount % 2 === 0; // 成对的 ``` 才表示代码块完整
  }

  renderMarkdown() {
    //@ts-ignore
    const lastAnswer = this.state.streamMessages.at(-1);
    const partialMarkdown = this.state.fullMarkdown.slice(
      0,
      this.state.currentIndex + 1
    );
    try {
      //@ts-ignore
      if (lastAnswer) lastAnswer.content = marked(partialMarkdown);
      const updateStreamMessages = this.state.streamMessages.slice();
      this.setState(
        prevState => ({
          streamMessages: updateStreamMessages,
          currentIndex: prevState.currentIndex + 1
        }),
        () => {
          if (this.state.currentIndex < this.state.fullMarkdown.length) {
            setTimeout(() => this.renderMarkdown(), 100); // 控制打字效果的速度
          }
        }
      );
    } catch (e) {
      console.error(e, lastAnswer, partialMarkdown);
    }
  }

  isInCodeBlock(content: string): boolean {
    const codeBlockCount = (content.match(/```/g) || []).length;
    return codeBlockCount % 2 !== 0;
  }

  appendStreamedData(newChunk: string) {
    this.setState(prevState => {
      const fullMarkdown = prevState.fullMarkdown + newChunk;
      const buffer = prevState.buffer + newChunk;
      if (!prevState.isInsideCodeBlock && this.isCompleteMarkdown(buffer)) {
        this.renderMarkdown();
        return {
          fullMarkdown,
          buffer: '',
          isInsideCodeBlock: this.isInCodeBlock(fullMarkdown)
        };
      }

      return {
        fullMarkdown,
        buffer,
        isInsideCodeBlock: this.isInCodeBlock(fullMarkdown)
      };
    });
  }

  reset() {
    this.setState({
      fullMarkdown: '',
      currentIndex: 0,
      buffer: '',
      isInsideCodeBlock: false,
      questionMsg: ''
    });
  }

  handleSendMsg() {
    //@ts-ignore
    const questionMessage = this.state.questionMsg;
    const { selectionText, questionMsg, courseId, sessionId } = this.state;
    const content = selectionText
      ? questionMsg + `\n\n\`\`\`python\n${selectionText}\n\`\`\``
      : questionMsg;
    const newQuestion = {
      id: String(Date.now()) + Math.random(),
      type: 'question' as const,
      userName: '',
      content: marked(content),
      isStreaming: false,
      complete: true
    };
    const newAnswer = {
      id: String(Date.now()) + Math.random(),
      type: 'answer' as const,
      userName: '',
      content: '',
      isStreaming: true,
      complete: true
    };

    this.setState(
      prevState => ({
        streamMessages: [...prevState.streamMessages, newQuestion, newAnswer]
      }),
      () => {
        this.reset(); // questionMessage
        receiveStream(
          { question: questionMessage, courseId, sessionId },
          (stream: any) => {
            const {
              data: { answer, end }
            } = stream;
            if (!end) {
              return this.appendStreamedData(answer);
            }
          }
        );
        // streamTest.forEach(stream => {
        //   const {
        //     data: { answer, end }
        //   } = stream;
        //   if (!end) {
        //     this.appendStreamedData(answer);
        //   }
        // });
      }
    );
  }

  handleSetQuestion(target: HTMLTextAreaElement) {
    const { value } = target;
    this.setState({ questionMsg: value });
  }

  render() {
    return (
      <div className="mind-chat__wrapper">
        <img
          src="https://commonresource-1252524126.cdn.xiaoeknow.com/image/m26fk2j40ml7.png"
          className={'bg_cover'}
        />
        <div className={'qa_content'}>
          <div className={'qa_content-list'}>
            {this.state.streamMessages.map(row => (
              <div key={row.id} className={'qa_content-list_item'}>
                <div className={'head_portrait'}>
                  <img
                    src={
                      row.type === 'question'
                        ? `${this.baseUrl}m27cfdgg0ulr.png`
                        : `${this.baseUrl}m27cfdga01hb.png`
                    }
                  />
                </div>
                <div className={`content ${row.type}`}>
                  <div className={'user_name'}>{row.userName}</div>
                  <div className={'inner_text'}>
                    <div
                      className={
                        'code_content markdown prose w-full break-words dark:prose-invert'
                      }
                    >
                      <div dangerouslySetInnerHTML={{ __html: row.content }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="send_message_wrapper">
          <div className={'send_message_content'}>
            <div className={'message_textarea_inner'}>
              <textarea
                value={this.state.questionMsg}
                onInput={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  this.handleSetQuestion(e.target)
                }
                placeholder="请输入你的问题"
              ></textarea>
            </div>
            <div className={'send_action'} onClick={() => this.handleSendMsg()}>
              <img
                src={`${this.baseUrl}${
                  this.state.questionMsg
                    ? 'm2j4ma8h0sm2.png'
                    : 'm26f5q6k0nad.png'
                }`}
                alt="dynamic"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
