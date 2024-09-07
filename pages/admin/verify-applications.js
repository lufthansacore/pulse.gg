import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import Layout from '../../components/Layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { toast } from 'react-toastify';

export default function VerifyApplications() {
  const [applications, setApplications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    const q = query(collection(db, 'verificationApplications'), where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);
    const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setApplications(apps);
  };

  const handleVerification = async (id, isApproved) => {
    try {
      await updateDoc(doc(db, 'verificationApplications', id), {
        status: isApproved ? 'approved' : 'rejected'
      });
      toast.success(`Application ${isApproved ? 'approved' : 'rejected'} successfully`);
      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('Error updating application. Please try again.');
    }
  };

  if (!user || !user.isAdmin) {
    return <Layout><div>Access denied. Admin only.</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Pending Verification Applications</h1>
        {applications.map(app => (
          <Card key={app.id} className="mb-4">
            <CardHeader>
              <CardTitle>{app.groupName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Description:</strong> {app.description}</p>
              <p><strong>Contact Email:</strong> {app.contactEmail}</p>
              <div className="mt-4">
                <Button onClick={() => handleVerification(app.id, true)} className="mr-2 bg-green-500 hover:bg-green-600">
                  Approve
                </Button>
                <Button onClick={() => handleVerification(app.id, false)} className="bg-red-500 hover:bg-red-600">
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}