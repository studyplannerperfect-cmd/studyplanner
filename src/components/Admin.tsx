import React, { useState } from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

interface ContactFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose, onSuccess }) => {
  const { isDarkMode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.from('contacts').insert([
        {
          name,
          email,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setName('');
      setEmail('');
      setMessage('');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
    >
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
