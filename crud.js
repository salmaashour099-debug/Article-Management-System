// 1- get elements
let articleForm = document.getElementById("articleform");
let articleList = document.getElementById("articlelist");
let editModal = new bootstrap.Modal(document.getElementById("editModal"));
let saveChanges = document.getElementById("savechanges");


// 2- create database (array)
let articles = JSON.parse(localStorage.getItem("articles")) || [];

// 3- create article 

articleForm.addEventListener("submit", function(e){
    e.preventDefault();
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    let newArticle ={
        id: Date.now(),
        title: title,
        content: content,
    }

    articles.push(newArticle);
    localStorage.setItem("articles", JSON.stringify(articles));

    articleForm.reset();

    renderArticles();
});


// 4- read article 
function renderArticles(){
    articleList.innerHTML = articles.map(article => `
        <div class="article-item card p-3 mb-3 ">
            <div>
                <h5 class="article-title">${article.title}</h5>
                <p class="article-content">${article.content}</p>
            </div>
            <div>
                <button class="btn btn-warning" onclick="editArticle(${article.id})"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-danger" onclick="deleteArticle(${article.id})"><i class="bi bi-trash"></i></button>
            </div>
        </div>`
    ).join("")
}



// 5- delete function
window.deleteArticle = function(id){
    if (confirm("Are you sure, you want to delete this article?")){
        articles = articles.filter(a => a.id !== id);
        localStorage.setItem("articles", JSON.stringify(articles));
        renderArticles();

    }
}


// 6- edit article
window.editArticle = function(id){
    let article = articles.find(a => a.id === id);
    if (article){
        document.getElementById("editId").value = article.id;
        document.getElementById("edittitle").value = article.title;
        document.getElementById("editcontent").value = article.content;
        editModal.show();
    }
}


//7- save changes 
saveChanges.addEventListener("click",function(){
    let id = parseInt(document.getElementById("editId").value);
    let title = document.getElementById("edittitle").value;
    let content = document.getElementById("editcontent").value;

    let articlesIndex = articles.findIndex(a => a.id === id);

    if (articlesIndex !== -1){
        articles[articlesIndex]= {id , title, content};
        localStorage.setItem("articles", JSON.stringify(articles));
        renderArticles();
        editModal.hide();
    }
})  



renderArticles();