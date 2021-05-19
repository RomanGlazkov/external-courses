function customFetch(url, method = 'GET', data) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);
    if (method === 'GET') {
        xhr.send();
    } else {
        xhr.send(data);
    }
    xhr.onload = function() {
        if (this.status !== 200) {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`)
        } else {
            console.log(this.responseText);
        }
    }
    xhr.onerror = function() {
        console.log('Something went wrong');
    }
}

module.exports = customFetch;