const apiKey = 'EsrB5PCddsoXUsVuWmffAOx6CNIMfBguK0hphSTa';
const baseURL = 'https://developer.nps.gov/api/v1/parks'

// stateCode is formated separtely from the other params due to its comma delineation, which will cause unwanted URI encoding in the formatQueryString() method.
function formatStateCode(state) {
    console.log('Formatting Started')
    let formatedStateCode = state.toUpperCase().replace(/\s/g, '')
    console.log(formatedStateCode)
    return formatedStateCode;
}

function formatQueryString(params) {
    const queryItems = Object.keys(params).map(key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&')
}

function getParkList(searchTerm, state, resultLimit) {
    const params = {
        api_key: apiKey,
        q: searchTerm,
        limit: resultLimit
    }

    const stateParam = `&stateCode=${formatStateCode(state)}`
    const queryString = formatQueryString(params)
    const url = baseURL + '?' + queryString + stateParam
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
        const state = $('#state').val();

        getParkList(searchTerm, state, resultLimit);
    })
}

$(handleParkSearch);
