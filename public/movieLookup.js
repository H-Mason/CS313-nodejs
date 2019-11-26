function movieLookup() {
    var movieSearch = document.getElementById('lookup').value;
    var url = 
        'http://www.omdbapi.com/?i=tt3896198&apikey=322cd6ef&s=' 
        + encodeURIComponent(movieSearch);
    fetch(url).then(function(response) {
            return response.json();
        }).then(function(data) {
            updateList(data);
        });
}

function updateList(data) {
    console.log(data);
  
    if (data.Search && data.Search.length > 0) {
      const resultList = document.getElementById('results');
      resultList.innerHTML = '';
  
      for (let i = 0; i < data.Search.length; i++) {
        const title = data.Search[i].Title;
  
        console.log('Adding: ' + title);
        const content = `<li><p>${title}</p></li>`;
        resultList.innerHTML += content;
      }
    }
  }