// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    var bookmark = {
        name:siteName,
        url:siteUrl
    }
    //Local Storage Test
    /*localStorage.setItem('test','Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    */
    //test if bookmarks is null
    if(localStorage.getItem('bookmarks')===null){
        //initialize array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set to to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else{
        //fetch from locsto
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bmark to array
        bookmarks.push(bookmark);
        //insert back to locsto
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    fetchBookmarks();


    //prevent form from submitting
    e.preventDefault();
}

function deleteBookmark(url){
    //get bookmarks from locsto
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bmarks
    for (var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //re-fetch bmarks
    fetchBookmarks();
}

function fetchBookmarks(){
    //get bmarks from locsto
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body">'+ 
                                        '<h3>'+name+
                                        '  <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' + 
                                        '</h3>'+
                                        '</div>';
    }
}