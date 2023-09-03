function displayPosts() {
    const postsSection = document.getElementById("posts");
    

    const storedPostsData = JSON.parse(localStorage.getItem("postsData")) || [];

    postsSection.innerHTML = "";

    storedPostsData.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3>${post.topic} by ${post.author}</h3>
            <p>${post.content}</p>
        `;
        postsSection.appendChild(postElement);
    });
}

function addPost() {
    const postTopic = document.getElementById("post-topic").value;
    const authorName = document.getElementById("author-name").value;
    const postContent = document.getElementById("post-content").value;
    
    if (postTopic.trim() !== "" && authorName.trim() !== "" && postContent.trim() !== "") {
        const newPost = { topic: postTopic, author: authorName, content: postContent };

        const storedPostsData = JSON.parse(localStorage.getItem("postsData")) || [];
        
        storedPostsData.push(newPost);

        localStorage.setItem("postsData", JSON.stringify(storedPostsData));
        
        displayPosts();
        
        document.getElementById("post-topic").value = "";
        document.getElementById("author-name").value = "";
        document.getElementById("post-content").value = "";
    }
}

document.getElementById("submit-post").addEventListener("click", addPost);

displayPosts();
