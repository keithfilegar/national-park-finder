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
    $('.js-error-message').empty();

    if(responseJson.total === '0') {
        $('.js-error-message').append(`<p>Sorry no results found :(</p>`)
        $('.js-error-message').removeClass('hidden')

        return
    }

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
    let params = {}

    if(searchTerm === '') {
        params = {
            api_key: apiKey,
            limit: resultLimit,
            stateCode: state
    }} 
    else {
        params = {
            api_key: apiKey,
            q: searchTerm,
            limit: resultLimit,
            stateCode: state
        }
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

    .catch(error => {
        alert("Something went wrong. Please try again later.")
        console.log(error)
    })
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
