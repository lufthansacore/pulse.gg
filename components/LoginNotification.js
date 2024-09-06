import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export function LoginNotification({ onClose, onUpdateContact, onChangeProfilePicture }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="mb-4">You have successfully logged in.</p>
        <div className="space-y-2">
          <Button onClick={onUpdateContact} className="w-full">Update Contact Information</Button>
          <Button onClick={onChangeProfilePicture} className="w-full">Change Profile Picture</Button>
        </div>
      </div>
    </div>
  );
}