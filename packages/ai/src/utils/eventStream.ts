import {fetchEventSource} from '@microsoft/fetch-event-source';

export const receiveStream = (question: string, callback: (data: any)=> void) => {
	const headers = {
		'Content-Type': 'application/json',
		'clientid': 'e5cd7e4891bf95d1d19206ce24a7b32e',
		Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJGazBXQXlZQXNEWU8zVFNpanZsYTNpVmFsWUNKTUx2cCIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsInVzZXJJZCI6MSwidXNlck5hbWUiOiJhZG1pbiIsImRlcHRJZCI6MTAzLCJkZXB0TmFtZSI6IueglOWPkemDqOmXqCIsImRlcHRDYXRlZ29yeSI6IiJ9.CRbWnc_AivA7Mry6lepHGis4CdE7A8nFI0NVoS8oXrM`,
	};
	const result: any = [];
	try {
		fetchEventSource(
			'http://localhost:3000/prod-api/chat/stream',
			{
				method: 'POST',
				headers: headers,
				openWhenHidden: true,
				body: JSON.stringify({
					question,
					"courseId": '1847592123333513218',
					"sessionId": "cs9ocfmcbm67nqe01gn0"
				}),
				onmessage: async (event) => {
					if (event) {
						result.push(JSON.parse(event.data))
						callback(JSON.parse(event.data))
					}
				},

				onerror(error) {
					console.error('Error:', error);
				},

				onclose: async() => {
					console.log('result:', result)
					// if the server closes the connection unexpectedly, retry:
				},
			}
		);
	} catch (err) {
		if (err.name == 'AbortError') {
			console.log('Aborted!');
		} else {
			console.log(err);
		}
	}
}
