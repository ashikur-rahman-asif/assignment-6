let searchResult = document.querySelector('#search-result')
let totalFound = document.querySelector('#totalFound')
let searchField = document.querySelector('#search-field')


const searchBook = () => {
    if (searchField.value) {

        totalFound.innerHTML = `Loading.......`
        searchField = document.getElementById('search-field')
        searchText = searchField.value
        //console.log(searchText)
        searchField.value = ''
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displaySearchResult(data.docs)
            })
    } else {
        alert("Please enter something to search")
    }
}

const displaySearchResult = (books) => {
    if (books.length === 0) {
        totalFound.innerHTML = `No result found`
    } else {
        totalFound.innerHTML = `Total ${books.length} match found`
    }
    let singleItem = '';
    books.forEach((book) => {
        let authorName = book.author_name
        let nameStr = String(authorName)
        let actualName = (nameStr.split(",")[0]);
        let publishOn = String(book.publish_date)
        singleItem += `
        <div class="item">
        <div class="image-wrapper">
        <img src="${book.cover_i?`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`:`https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg`}" alt="">
        </div>
                    <div class="flex-container">
                        <h1 class="title">Title: ${book.title?book.title:"Title Not Found"}</h1>
                    </div>
                    <p class="item-data">Author: ${actualName==='undefined'?"Author Not Found":actualName}</p>
                    <p class="item-data">Published on: ${publishOn==='undefined'?"Publish Date Not Found":publishOn}</p>
                    <p class="item-data">First publish: ${book.first_publish_year?book.first_publish_year:"Date Not Found"}</p>
                    <p class="item-data">Publisher: ${book.publisher?book.publisher:"Publisher Not Found"}</p>
        </div>
        `
    })
    searchResult.innerHTML = singleItem
}
