document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //get elements
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(siteName || !siteUrl){
        alert('Plase enter this fills');
        return false;
    }
    
    
    var bookmark = {
      name: siteName,
      url : siteUrl
    };
    
    console.log(bookmark);
    
    /*
    //Local Storage Test
    localStorage.setItem('test', 'Hello');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    */
    
    if(localStorage.getItem('bookmarks')=== null){
        var bookmarks =[];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));   
    }else{
        //get bookmarks localstorage
        var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmarks to array
        bookmarks.push(bookmark);
        //Reset back-to-storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    fetchBookmarks();
    
    document.getElementById('myForm').reset;
    
    e.preventDefault();
}

function deleteBookmark(url){
    var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
    
    for(var i=0;i<bookmarks.length; i++){
        if(bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i,1);
        }        
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //re-fetch bookmarks
    fetchBookmarks();
}


function fetchBookmarks() {
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //get bookmark id
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    bookmarksResults.innerHTML = '';
    
    for(var i=0 ; bookmarks != null && i < bookmarks.length ; i++) {
        var name =bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="well">' + 
                                      '<h3>' + name + "\n" +
                                      '<a class="btn btn-default" target="_black" href="'+url+'">Visit</a>' + "\n"+
                                      '<a onclick="deleteBookmark(\'' +url+ '\')" class="btn btn-danger" href="#">Delete</a>' +
                                      '</h3>'+
                                      '</div>';
    }
   
}




