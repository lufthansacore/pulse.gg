import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/AuthProvider';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'react-toastify';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || (!user.isAdmin && !user.isVerified)) {
      toast.error('You must be a verified user or admin to create a post');
      return;
    }

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        authorId: user.uid,
        authorName: user.groupName || user.displayName,
        createdAt: serverTimestamp(),
      });

      toast.success('Post created successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error creating post. Please try again.');
    }
  };

  if (!user || (!user.isAdmin && !user.isVerified)) {
    return <Layout><div>Access denied. Verified users and admins only.</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Create a New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-1">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor="content" className="block mb-1">Content</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                  rows="6"
                />
              </div>
              <Button type="submit" className="w-full">Create Post</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}