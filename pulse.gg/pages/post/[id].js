import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import Layout from '../../components/Layout';
import { useAuth } from '../../hooks/useAuth';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        }
      };
      fetchPost();

      const q = query(collection(db, 'posts', id, 'comments'), orderBy('createdAt'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedComments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(fetchedComments);
      });

      // Add this to fetch likes
      const likesRef = doc(db, 'posts', id);
      const unsubscribeLikes = onSnapshot(likesRef, (doc) => {
        setLikes(doc.data().likes || 0);
      });

      return () => {
        unsubscribe();
        unsubscribeLikes();
      };
    }
  }, [id]);

  useEffect(() => {
    if (user && post) {
      const userLikesRef = doc(db, 'posts', id, 'userLikes', user.uid);
      getDoc(userLikesRef).then((docSnap) => {
        setHasLiked(docSnap.exists());
      });
    }
  }, [user, post, id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      await addDoc(collection(db, 'posts', id, 'comments'), {
        content: newComment,
        author: user.displayName,
        createdAt: new Date()
      });
      setNewComment('');
    }
  };

  const handleLike = async () => {
    if (user) {
      const postRef = doc(db, 'posts', id);
      const userLikesRef = doc(db, 'posts', id, 'userLikes', user.uid);

      if (hasLiked) {
        await updateDoc(postRef, { likes: likes - 1 });
        await deleteDoc(userLikesRef);
        setHasLiked(false);
      } else {
        await updateDoc(postRef, { likes: likes + 1 });
        await setDoc(userLikesRef, { liked: true });
        setHasLiked(true);
      }
    }
  };

  if (!post) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>By {post.author} on {new Date(post.createdAt.toDate()).toLocaleDateString()}</small>

      <div className="post-actions">
        <button onClick={handleLike} disabled={!user}>
          {hasLiked ? 'Unlike' : 'Like'} ({likes})
        </button>
      </div>

      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.content}</p>
          <small>By {comment.author} on {new Date(comment.createdAt.toDate()).toLocaleDateString()}</small>
        </div>
      ))}

      {user && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit">Submit Comment</button>
        </form>
      )}

      <style jsx>{`
        .comment {
          border: 1px solid #ccc;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
        }
        form {
          margin-top: 1rem;
        }
        textarea {
          width: 100%;
          height: 100px;
        }
        .post-actions {
          margin-top: 1rem;
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </Layout>
  );
}