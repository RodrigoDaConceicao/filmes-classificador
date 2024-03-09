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

        return await response.json();
    },

    Post: async function (url: string, data: JSON) {
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

        return await response.json();
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

        return await response.json();
    },

    Patch: async function (url: string, data: JSON) {
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

        return await response.json();
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
        return await response.json();
    },

    Put: async function Put(url: string, data: JSON) {
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
        return await response.json();
    }
}

export default HttpService;

