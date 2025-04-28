document.addEventListener('DOMContentLoaded', () => {
  console.log('Blog page loaded');
  checkAuth();
  loadComments();
});

// Check authentication status
function checkAuth() {
  try {
      const user = localStorage.getItem('user');
      const commentForm = document.getElementById('commentForm');
      const commentAuthPrompt = document.getElementById('commentAuthPrompt');
      const submitComment = document.getElementById('submitComment');

      if (!commentForm || !commentAuthPrompt || !submitComment) {
          console.error('Comment form elements not found');
          return;
      }

      if (user) {
          console.log('User found in localStorage:', JSON.parse(user));
          commentAuthPrompt.style.display = 'none';
          submitComment.disabled = false;
      } else {
          console.log('No user found in localStorage');
          commentAuthPrompt.style.display = 'block';
          submitComment.disabled = true;
      }
  } catch (error) {
      console.error('Error in checkAuth:', error);
  }
}

// Load comments from localStorage
function loadComments() {
  try {
      const postId = getPostId();
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
      const commentList = document.getElementById('commentList');

      commentList.innerHTML = comments.map(comment => `
          <div class="comment">
              <div class="comment-header">
                  <span>${comment.author}</span>
                  <small>${new Date(comment.timestamp).toLocaleString()}</small>
              </div>
              <p>${comment.text}</p>
              ${user.email === comment.authorEmail ? `
                  <button class="delete-button" onclick="deleteComment('${postId}', '${comment.id}')">Delete</button>
              ` : ''}
          </div>
      `).join('');

      console.log('Comments loaded for', postId, ':', comments);
  } catch (error) {
      console.error('Error in loadComments:', error);
  }
}

// Add a comment
function addComment(postId) {
  try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
          alert('Please log in to comment.');
          return;
      }

      const commentText = document.getElementById('commentText').value.trim();
      if (!commentText) {
          alert('Comment cannot be empty.');
          return;
      }

      let comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
      comments.push({
          id: Date.now().toString(),
          author: user.name || 'Anonymous',
          authorEmail: user.email,
          text: commentText,
          timestamp: new Date().toISOString()
      });

      localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
      document.getElementById('commentText').value = '';
      loadComments();
      console.log('Comment added to', postId);
  } catch (error) {
      console.error('Error in addComment:', error);
  }
}

// Delete a comment
function deleteComment(postId, commentId) {
  if (confirm('Are you sure you want to delete this comment?')) {
      try {
          let comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
          comments = comments.filter(comment => comment.id !== commentId);
          localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
          loadComments();
          console.log('Comment deleted from', postId, ':', commentId);
      } catch (error) {
          console.error('Error in deleteComment:', error);
      }
  }
}

// Get current post ID from filename
function getPostId() {
  const path = window.location.pathname.split('/').pop().replace('.html', '');
  return path || 'blog-post1'; // Default to blog-post1 if path is unclear
}