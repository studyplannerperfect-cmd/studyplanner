import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';
import Sidebar from './Sidebar';

interface Complaint {
  id: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved';
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const Admin: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: complaintsData } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: contactsData } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (complaintsData) setComplaints(complaintsData as Complaint[]);
      if (contactsData) setContacts(contactsData as Contact[]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complaints Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Complaints</h2>
              {complaints.length === 0 ? (
                <p>No complaints found.</p>
              ) : (
                <ul>
                  {complaints.map((c) => (
                    <li key={c.id} className="border p-4 mb-2 rounded">
                      <p><Mail className="inline w-4 h-4" /> {c.email}</p>
                      <p><Phone className="inline w-4 h-4" /> {c.phone}</p>
                      <p><MessageSquare className="inline w-4 h-4" /> {c.subject}</p>
                      <p>{c.message}</p>
                      <span className="text-sm text-gray-500">Status: {c.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Contact Us Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
              {contacts.length === 0 ? (
                <p>No messages yet.</p>
              ) : (
                <ul>
                  {contacts.map((c) => (
                    <li key={c.id} className="border p-4 mb-2 rounded">
                      <p><b>{c.name}</b> ({c.email})</p>
                      <p>{c.message}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(c.created_at).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
