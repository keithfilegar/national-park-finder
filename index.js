const apiKey = 'EsrB5PCddsoXUsVuWmffAOx6CNIMfBguK0hphSTa';
const baseURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryString(params) {
    const queryItems = Object.keys(params).map(key =>
        `${encodeURI(key)}=${encodeURI(params[key])}`)
    return queryItems.join('&')
}

function displayResults(responseJson, resultLimit) {
    console.log(responseJson)
}

function getParkList(searchTerm, state, resultLimit) {
    const params = {
        api_key: apiKey,
        q: searchTerm,
        limit: resultLimit,
        stateCode: state
    }

    const queryString = formatQueryString(params)
    const url = baseURL + '?' + queryString
    console.log(url)

    fetch(url)
    .then(response => {
        if(!response.ok) {
            alert("Error")
            throw Error(response.status + ": " + response.message)
        }
        return response.json()
    })
    .then(responseJson => console.log(responseJson))
}

function handleParkSearch() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#searchSubject').val();
        const resultLimit = $('#searchNum').val();
        const state = $('#state').val().replace(/\s/g, '');

        getParkList(searchTerm, state, resultLimit);
    })
}

$(handleParkSearch);
