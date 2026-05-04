import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { User as UserIcon, Mail, Phone, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'prefer-not-to-say',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/profile/me', config);
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          gender: data.gender || 'prefer-not-to-say',
        });
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load profile');
        setLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.patch('/api/profile/update', profileData, config);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading profile...</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
            <div className="w-32 h-32 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 text-slate-500 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={64} />
              )}
            </div>
            <h2 className="text-xl font-bold">{profileData.name}</h2>
            <p className="text-slate-500 mb-2">{user?.role.toUpperCase()}</p>
            {user?.sellerStatus !== 'none' && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.sellerStatus === 'approved' ? 'bg-green-100 text-green-700' : 
                user.sellerStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>
                Seller: {user.sellerStatus}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon size={18} className="absolute left-3 top-3 text-slate-400" />
                    <input type="text" name="name" value={profileData.name} onChange={handleInputChange} className="pl-10 w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email (Read Only)</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
                    <input type="email" value={profileData.email} disabled className="pl-10 w-full px-3 py-2 border rounded-md bg-slate-50 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-3 text-slate-400" />
                    <input type="text" name="phone" value={profileData.phone} onChange={handleInputChange} className="pl-10 w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select name="gender" value={profileData.gender} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-primary-500 h-[42px]">
                    <option value="prefer-not-to-say">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" disabled={updating} className="px-6 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors disabled:bg-slate-400">
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
