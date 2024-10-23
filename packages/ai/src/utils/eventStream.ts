import { fetchEventSource } from '@microsoft/fetch-event-source';

const baseUrl: string = 'http://10.51.240.115/';

export const receiveStream = (
  parmas: { question: string, courseId: string, sessionId: string },
  callback: (data: any) => void
) => {
  const headers = {
    'Content-Type': 'application/json',
    clientid: 'e5cd7e4891bf95d1d19206ce24a7b32e',
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJGazBXQXlZQXNEWU8zVFNpanZsYTNpVmFsWUNKTUx2cCIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsInVzZXJJZCI6MSwidXNlck5hbWUiOiJhZG1pbiIsImRlcHRJZCI6MTAzLCJkZXB0TmFtZSI6IueglOWPkemDqOmXqCIsImRlcHRDYXRlZ29yeSI6IiJ9.CRbWnc_AivA7Mry6lepHGis4CdE7A8nFI0NVoS8oXrM`
  };
  const result: any = [];
  try {
    fetchEventSource(`${baseUrl}prod-api/chat/stream`, {
      method: 'POST',
      headers: headers,
      openWhenHidden: true,
      body: JSON.stringify({
        question: parmas.question,
        courseId: parmas.courseId, // '1847592123333513218',
        sessionId: parmas.sessionId //'cs9ocfmcbm67nqe01gn0'
      }),
      onmessage: async event => {
        if (event) {
          result.push(JSON.parse(event.data));
          callback(JSON.parse(event.data));
        }
      },

      onerror(error) {
        console.error('Error:', error);
      },

      onclose: async () => {
        console.log('result:', result);
        // if the server closes the connection unexpectedly, retry:
      }
    });
  } catch (err) {
    if (err.name == 'AbortError') {
      console.log('Aborted!');
    } else {
      console.log(err);
    }
  }
};

interface Data {
	messageType: string | null;
	messageId: string;
	question: string;
	answer: string;
	end: boolean;
	userId: number;
  }
  
interface Res {
	data: Data[];
	code: number;
	msg: string
}

interface Params {
	clientid: string;
	pageSize: number;
	pageNum: number;
}

export const getHistoryStream = (params: Params): Promise<Res> => {
  return new Promise((resolve, reject) => {
    const myHeaders: Headers = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJGazBXQXlZQXNEWU8zVFNpanZsYTNpVmFsWUNKTUx2cCIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsInVzZXJJZCI6MSwidXNlck5hbWUiOiJhZG1pbiIsImRlcHRJZCI6MTAzLCJkZXB0TmFtZSI6IueglOWPkemDqOmXqCIsImRlcHRDYXRlZ29yeSI6IiJ9.CRbWnc_AivA7Mry6lepHGis4CdE7A8nFI0NVoS8oXrM'
    );
    myHeaders.append('clientid', params.clientid);

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(
      `${baseUrl}prod-api/chat/history?sessionId=cs9ocfmcbm67nqe01gn0&pageSize=${params.pageSize}&pageNum=${params.pageNum}`,
      requestOptions
    )
      .then((response: Response) => response.text())
      .then((result: string) => {
        console.log('result:', result);
        resolve(JSON.parse(result));
      })
      .catch((error: any) => reject(error));
  });
};
