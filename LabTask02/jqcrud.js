$(document).ready(function () {
    let isEditing = false;
    let allPosts = [];
    
    // Initial data load
    displayData();

    // Handle form submission
    $('#postForm').on('submit', function (e) {
        e.preventDefault();
        if (isEditing) {
            updatePost();
        } else {
            createPost();
        }
    });

    // Handle cancel edit button
    $('#cancelEdit').on('click', function() {
        resetForm();
    });

    // Function to display all posts
    function displayData() {
        $('#loadingSpinner').show();
        $('#postsContainer').hide();

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "GET",
            success: function(data) {
                allPosts = data;
                renderPosts(data);
                $('#loadingSpinner').hide();
                $('#postsContainer').show();
            },
            error: function(error) {
                console.error("Error fetching posts:", error);
                alert("Error fetching posts. Please try again.");
                $('#loadingSpinner').hide();
            }
        });
    }

    // Function to render posts
    function renderPosts(posts) {
        let postsHTML = '';
        posts.forEach(post => {
            postsHTML += `
                <div class="post-card" data-id="${post.id}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        <div class="action-buttons">
                            <button class="btn btn-outline-primary edit-btn" data-id="${post.id}">
                                <i class="fas fa-edit me-2"></i>Edit
                            </button>
                            <button class="btn btn-outline-danger delete-btn" data-id="${post.id}">
                                <i class="fas fa-trash me-2"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        $('#postsContainer').html(postsHTML);

        // Attach event handlers
        $('.edit-btn').on('click', handleEdit);
        $('.delete-btn').on('click', handleDelete);
    }

    // Function to create new post
    function createPost() {
        const postData = {
            title: $('#title').val(),
            body: $('#body').val(),
            userId: 1  // Default userId for demo
        };

        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "POST",
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: function(response) {
                // For demo purposes, add the new post to our local array
                // In a real app, the server would generate an ID
                response.id = allPosts.length + 1;
                allPosts.unshift(response);
                renderPosts(allPosts);
                resetForm();
                alert("Post created successfully!");
            },
            error: function(error) {
                console.error("Error creating post:", error);
                alert("Error creating post. Please try again.");
            }
        });
    }

    // Function to handle edit button click
    function handleEdit() {
        const postId = $(this).data('id');
        const post = allPosts.find(p => p.id === postId);
        
        if (post) {
            // Populate form with post data
            $('#title').val(post.title);
            $('#body').val(post.body);
            
            // Update UI for edit mode
            isEditing = true;
            $('#formTitle').text('Edit Post');
            $('#postForm button[type="submit"]').html('<i class="fas fa-save me-2"></i>Update Post');
            $('#cancelEdit').removeClass('d-none');
            $('#postForm').data('editId', postId);

            // Scroll to form
            $('html, body').animate({
                scrollTop: $("#postForm").offset().top - 20
            }, 500);
        }
    }

    // Function to update existing post
    function updatePost() {
        const postId = $('#postForm').data('editId');
        const postData = {
            id: postId,
            title: $('#title').val(),
            body: $('#body').val(),
            userId: 1
        };

        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
            method: "PUT",
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: function(response) {
                // Update local array
                const index = allPosts.findIndex(p => p.id === postId);
                if (index !== -1) {
                    allPosts[index] = { ...allPosts[index], ...postData };
                    renderPosts(allPosts);
                }
                resetForm();
                alert("Post updated successfully!");
            },
            error: function(error) {
                console.error("Error updating post:", error);
                alert("Error updating post. Please try again.");
            }
        });
    }

    // Function to handle delete button click
    function handleDelete() {
        if (!confirm("Are you sure you want to delete this post?")) {
            return;
        }

        const postId = $(this).data('id');
        
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
            method: "DELETE",
            success: function() {
                // Remove from local array
                allPosts = allPosts.filter(p => p.id !== postId);
                renderPosts(allPosts);
                alert("Post deleted successfully!");
            },
            error: function(error) {
                console.error("Error deleting post:", error);
                alert("Error deleting post. Please try again.");
            }
        });
    }

    // Function to reset form
    function resetForm() {
        $('#postForm').trigger('reset');
        $('#postForm').removeData('editId');
        isEditing = false;
        $('#formTitle').text('Create New Post');
        $('#postForm button[type="submit"]').html('<i class="fas fa-save me-2"></i>Save Post');
        $('#cancelEdit').addClass('d-none');
    }
});