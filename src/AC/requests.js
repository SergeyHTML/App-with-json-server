export function postRequest(url, data) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    })
        .then(response => response.json())
}


export function deleteRequest(url) {
    return fetch(url, {
        method: 'DELETE'
    })

}


