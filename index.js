const apiKey = 'EsrB5PCddsoXUsVuWmffAOx6CNIMfBguK0hphSTa';
const baseURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryString(params) {
    const queryItems = Object.keys(params).map(key =>
        `${encodeURI(key)}=${encodeURI(params[key])}`)

        return queryItems.join('&')
}

function displayResults(responseJson) {
    console.log(responseJson)
    $('.js-park-list').empty();
    console.log(responseJson.data[0].fullName)

    for(i = 0; i < responseJson.data.length; i++) {
        $('.js-park-list').append(
        `<li>
            <h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">Visit the website here!</a></p>
        </li>`)}

    $('.js-park-list').removeClass('hidden')
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
    .then(responseJson => displayResults(responseJson))
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
