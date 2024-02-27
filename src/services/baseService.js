
export const postRequest = (api_url, formData, isAuthRequired=true) => {
    if (isAuthRequired) {
        console.log(localStorage.getItem('access_token'));
        const headers =  {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token').split('"').join('')
        }
        console.log(headers);
        return fetch(api_url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: headers,
          })
    }
    else {
        const headers =  {
            'Content-Type': 'application/json',
        }
        return fetch(api_url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: headers,
          })
    }
}

export const getRequest = (api_url) => {
    return fetch(api_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token').split('"').join('')
        },
    })
}