export class HttpServiceError extends Error {
    status: number;

    constructor(status: number, msg: Array<string> | string) {
        if (msg instanceof String) {
            super(msg as string);
        }
        else if (msg instanceof Array) {
            super((msg as Array<string>).join('\n'));
        }
        else {
            super("Erro não especificado.");
            this.status = status;
        }

        this.status = status;
    }
}

async function handleResponse(response: Response) {
    if (response.status < 200 || response.status > 299) {
        var body = await response.json()
        throw new HttpServiceError(response.status, body.message)
    }

    return await response.json();
}

const HttpService = {
    Get: async function (url: string) {
        var response = await fetch(url,
            {
                method: 'GET',
                credentials: 'include',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            }
        );
        return handleResponse(response);
    },

    Post: async function (url: string, data: Object) {
        var response = await fetch(url,
            {
                method: 'POST',
                credentials: 'include',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        );

        return handleResponse(response);
    },
    PostCsv: async function (url: string, file: File) {
        var text = await file.text();

        var response = await fetch(url,
            {
                method: 'POST',
                credentials: 'include',
                headers:
                {
                    'Content-Type': 'text/csv',
                },
                body: text
            }
        );

        return handleResponse(response);
    },

    Patch: async function (url: string, data: Object) {
        var response = await fetch(url,
            {
                method: 'PATCH',
                credentials: 'include',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        );

        return handleResponse(response);
    },

    Delete: async function (url: string) {
        var response = await fetch(url,
            {
                method: 'DELETE',
                credentials: 'include',
                headers:
                {
                    'Content-Type': 'application/json',
                }
            }
        );
        return handleResponse(response);
    },

    Put: async function Put(url: string, data: Object) {
        var response = await fetch(url,
            {
                method: 'PUT',
                credentials: 'include',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        );
        return handleResponse(response);
    }
}

export default HttpService;

