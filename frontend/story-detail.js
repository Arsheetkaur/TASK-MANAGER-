document.addEventListener('DOMContentLoaded', () => {
  console.log('Story page loaded');
  checkAuth();
  loadComments();

  // Add event listener for comment form submission
  const commentForm = document.getElementById('commentFormSubmit');
  if (commentForm) {
      commentForm.addEventListener('submit', (event) => {
          event.preventDefault();
          addComment('story-details');
      });
  } else {
      console.error('Comment form not found');
  }
});

// Check authentication status
function checkAuth() {
  try {
      const user = localStorage.getItem('user');
      const commentForm = document.getElementById('commentForm');
      const commentAuthPrompt = document.getElementById('commentAuthPrompt');
      const submitComment = document.getElementById('submitComment');

      if (!commentForm || !commentAuthPrompt || !submitComment) {
          console.error('Comment form elements missing:', { commentForm, commentAuthPrompt, submitComment });
          return;
      }

      if (user && JSON.parse(user)) {
          console.log('User authenticated:', JSON.parse(user));
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
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const comments = JSON.parse(localStorage.getItem('comments_story-details')) || [];
      const commentList = document.getElementById('commentList');

      if (!commentList) {
          console.error('Comment list element not found');
          return;
      }

      commentList.innerHTML = comments.map(comment => `
          <div class="comment">
              <div class="comment-header">
                  <span>${comment.author}</span>
                  <small>${new Date(comment.timestamp).toLocaleString()}</small>
              </div>
              <p>${comment.text}</p>
              ${user.email === comment.authorEmail ? `
                  <button class="delete-button" onclick="deleteComment('story-details', '${comment.id}')">Delete</button>
              ` : ''}
          </div>
      `).join('');

      console.log('Comments loaded:', comments.length);
  } catch (error) {
      console.error('Error in loadComments:', error);
  }
}

// Add a comment
function addComment(postId) {
  try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.email) {
          console.warn('User not authenticated');
          alert('Please log in to comment.');
          return;
      }

      const commentTextElement = document.getElementById('commentText');
      if (!commentTextElement) {
          console.error('Comment text element not found');
          return;
      }

      const commentText = commentTextElement.value.trim();
      if (!commentText) {
          console.warn('Empty comment attempted');
          alert('Comment cannot be empty.');
          return;
      }

      let comments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
      const newComment = {
          id: Date.now().toString(),
          author: user.name || 'Anonymous',
          authorEmail: user.email,
          text: commentText,
          timestamp: new Date().toISOString()
      };

      comments.push(newComment);
      localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
      commentTextElement.value = '';
      loadComments();
      console.log('Comment added:', newComment);
  } catch (error) {
      console.error('Error in addComment:', error);
      alert('Failed to add comment. Please try again.');
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
          console.log('Comment deleted:', commentId);
      } catch (error) {
          console.error('Error in deleteComment:', error);
          alert('Failed to delete comment. Please try again.');
      }
  }
}