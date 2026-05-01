import { useState, useEffect, useRef } from 'react';
import { usePosts } from '../context/PostContext';
import { useDoctors } from '../context/DoctorContext';
import { useAuth, Role, UserAccount } from '../context/AuthContext';
import { CheckCircle2, Image as ImageIcon, Lock, Calendar, Plus, Trash2, Users, FileText, LogOut, Upload } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Specialization } from '../data/doctors';

export function AdminPage() {
  const { addPost } = usePosts();
  const { doctors, updateDoctor, addDoctor, removeDoctor } = useDoctors();
  const { currentUser, login, logout, accounts, createAccount, deleteAccount } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Auth State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Clear password input on navigation
  useEffect(() => {
    setUsernameInput('');
    setPasswordInput('');
    setLoginError(false);
  }, [location.pathname]);

  // Accounts Management State
  const [newAccUsername, setNewAccUsername] = useState('');
  const [newAccPassword, setNewAccPassword] = useState('');
  const [newAccRole, setNewAccRole] = useState<Role>('Staff');

  // Post State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Daily Digest');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Doctors State
  const [activeTab, setActiveTab] = useState<'posts' | 'doctors' | 'accounts'>(
    currentUser?.role === 'Staff' ? 'doctors' : 'posts'
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');

  // Keep active tab in sync with roles if needed
  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role === 'Staff' && activeTab !== 'doctors') {
      setActiveTab('doctors');
    } else if (currentUser.role === 'Moderator' && activeTab !== 'posts') {
      setActiveTab('posts');
    }
  }, [currentUser, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(usernameInput, passwordInput)) {
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({ title, category, content, imageUrl });
    setSuccess(true);
    setTitle('');
    setContent('');
    setImageUrl('');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const selectedDoctor = selectedDoctorId === 'new' 
    ? { id: 'new', name: '', specialization: 'Cardiology' as Specialization, description: '', image: '', schedules: [], hmoAccreditation: [] }
    : doctors.find(d => d.id === selectedDoctorId);

  const [editDocName, setEditDocName] = useState('');
  const [editDocSpec, setEditDocSpec] = useState<Specialization>('Cardiology');
  const [editDocDesc, setEditDocDesc] = useState('');
  const [editDocImage, setEditDocImage] = useState('');
  const [editDocHmo, setEditDocHmo] = useState('');
  const docImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedDoctor) {
      setEditDocName(selectedDoctor.name);
      setEditDocSpec(selectedDoctor.specialization as Specialization);
      setEditDocDesc(selectedDoctor.description);
      setEditDocImage(selectedDoctor.image);
      setEditDocHmo(selectedDoctor.hmoAccreditation?.join(', ') || '');
    }
  }, [selectedDoctorId]);

  const handleDocImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditDocImage(reader.result as string);
        if (selectedDoctor && selectedDoctorId !== 'new') {
           updateDoctor({ ...selectedDoctor, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDoctorProfile = () => {
    if (selectedDoctorId === 'new') {
      addDoctor({
        id: Date.now().toString(),
        name: editDocName,
        specialization: editDocSpec,
        description: editDocDesc,
        image: editDocImage,
        availableToday: true,
        schedules: [],
        hmoAccreditation: editDocHmo.split(',').map(h => h.trim()).filter(Boolean)
      });
      setSelectedDoctorId('');
      alert('Doctor added successfully!');
    } else if (selectedDoctor) {
      updateDoctor({
        ...selectedDoctor,
        name: editDocName,
        specialization: editDocSpec,
        description: editDocDesc,
        hmoAccreditation: editDocHmo.split(',').map(h => h.trim()).filter(Boolean)
      });
      alert('Doctor profile updated!');
    }
  };

  const handleDeleteDoctor = () => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      removeDoctor(selectedDoctorId);
      setSelectedDoctorId('');
    }
  };

  const handleScheduleChange = (idx: number, field: 'day' | 'time', value: string) => {
    if (!selectedDoctor) return;
    const newSchedules = [...selectedDoctor.schedules];
    newSchedules[idx] = { ...newSchedules[idx], [field]: value };
    updateDoctor({ ...selectedDoctor, schedules: newSchedules });
  };

  const handleAddSchedule = () => {
    if (!selectedDoctor) return;
    updateDoctor({
      ...selectedDoctor,
      schedules: [...selectedDoctor.schedules, { day: 'New Day', time: '8:00 AM - 5:00 PM' }]
    });
  };

  const handleRemoveSchedule = (idx: number) => {
    if (!selectedDoctor) return;
    const newSchedules = selectedDoctor.schedules.filter((_, i) => i !== idx);
    updateDoctor({ ...selectedDoctor, schedules: newSchedules });
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (createAccount(newAccUsername, newAccPassword, newAccRole)) {
      setNewAccUsername('');
      setNewAccPassword('');
      setNewAccRole('Staff');
    } else {
      alert('Username already exists!');
    }
  };

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-8">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && <p className="text-red-500 font-bold text-xs bg-red-50 p-2 rounded border border-red-100">Invalid username or password</p>}
            <input 
              type="text" 
              required
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-center text-sm font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Username"
            />
            <input 
              type="password" 
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
            <button type="submit" className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-sm shadow-md transition-colors mt-4">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-1">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm font-medium">Logged in as <span className="font-bold text-slate-700">{currentUser.username}</span> ({currentUser.role})</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-1 rounded-xl flex flex-wrap gap-1 shadow-sm border border-slate-200">
              {(currentUser.role === 'Admin' || currentUser.role === 'Moderator') && (
                <button 
                  onClick={() => setActiveTab('posts')}
                  className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'posts' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <FileText className="w-3.5 h-3.5"/> News & Updates
                </button>
              )}
              {(currentUser.role === 'Admin' || currentUser.role === 'Staff') && (
                <button 
                  onClick={() => setActiveTab('doctors')}
                  className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'doctors' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Calendar className="w-3.5 h-3.5" /> Doctor Schedules
                </button>
              )}
              {currentUser.role === 'Admin' && (
                <button 
                  onClick={() => setActiveTab('accounts')}
                  className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'accounts' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Users className="w-3.5 h-3.5" /> Accounts
                </button>
              )}
            </div>
            <button onClick={logout} className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors shrink-0" title="Log Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {activeTab === 'posts' && (currentUser.role === 'Admin' || currentUser.role === 'Moderator') && (
          <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 animate-in fade-in">
            <h2 className="text-xl font-black text-slate-900 mb-6">Create New Post</h2>
            
            {success && (
              <div className="mb-6 bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-200 flex items-center gap-3 font-bold text-sm shadow-sm animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5"/> Post published successfully! Redirecting...
              </div>
            )}

            <form onSubmit={handlePostSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Post Title</label>
                  <input required type="text" value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-1 focus:ring-blue-500 outline-none hover:border-slate-300 transition-colors shadow-sm" placeholder="e.g. Breast Cancer Awareness Month" />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Category</label>
                  <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-1 focus:ring-blue-500 outline-none hover:border-slate-300 transition-colors shadow-sm">
                    <option>Daily Digest</option>
                    <option>Health Alert</option>
                    <option>Events & Campaigns</option>
                    <option>General News</option>
                    <option>Promotion</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5 flex flex-col">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> Image Upload
                </label>
                <input 
                   type="file" 
                   accept="image/*" 
                   ref={fileInputRef} 
                   onChange={handleImageUpload} 
                   className="hidden" 
                />
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm text-slate-700"
                  >
                    <Upload className="w-4 h-4" /> Choose Photo
                  </button>
                  {imageUrl && (
                    <div className="h-11 w-11 rounded-lg border border-slate-200 overflow-hidden shrink-0">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-1.5 flex flex-col">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Post Content</label>
                <textarea required rows={6} value={content} onChange={e=>setContent(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-1 focus:ring-blue-500 outline-none hover:border-slate-300 transition-colors shadow-sm resize-none" placeholder="Write full announcement or digest here..."></textarea>
              </div>
              <div className="pt-2">
                <button disabled={success} type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition-colors active:scale-95">
                  Publish Post to Home Page
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'doctors' && (currentUser.role === 'Admin' || currentUser.role === 'Staff') && (
          <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 animate-in fade-in">
            <h2 className="text-xl font-black text-slate-900 mb-6">Manage Doctor Schedules</h2>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1 space-y-1.5 flex flex-col">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Select Doctor</label>
                <select 
                  value={selectedDoctorId} 
                  onChange={e => setSelectedDoctorId(e.target.value)} 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-1 focus:ring-blue-500 outline-none shadow-sm"
                >
                  <option value="" disabled>-- Choose a Doctor --</option>
                  <option value="new" className="font-bold text-blue-600">+ Add New Doctor</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedDoctor && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                
                {/* DOCTOR PROFILE FORM */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-start gap-6">
                     <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-700 text-2xl overflow-hidden shadow-sm shrink-0 border-4 border-white">
                          {editDocImage ? (
                            <img src={editDocImage} alt="Doc preview" className="w-full h-full object-cover" />
                          ) : (
                            editDocName ? editDocName.charAt(0).toUpperCase() : '?'
                          )}
                        </div>
                        <input type="file" accept="image/*" ref={docImageInputRef} onChange={handleDocImageUpload} className="hidden" />
                        <button onClick={() => docImageInputRef.current?.click()} className="text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md">
                          Upload Photo
                        </button>
                     </div>
                     <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5 flex flex-col">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Doctor Name</label>
                          <input type="text" value={editDocName} onChange={e => setEditDocName(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none" placeholder="Dr. Juan Dela Cruz" />
                        </div>
                        <div className="space-y-1.5 flex flex-col">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Specialization</label>
                          <select value={editDocSpec} onChange={e => setEditDocSpec(e.target.value as Specialization)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none">
                            <option>Cardiology</option>
                            <option>Neurology</option>
                            <option>Orthopedics</option>
                            <option>Pediatrics</option>
                            <option>General Medicine</option>
                            <option>Surgery</option>
                            <option>OB-GYN</option>
                            <option>Dermatology</option>
                            <option>Ophthalmology</option>
                            <option>ENT</option>
                          </select>
                        </div>
                        <div className="space-y-1.5 flex flex-col sm:col-span-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Description</label>
                          <textarea rows={2} value={editDocDesc} onChange={e => setEditDocDesc(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none resize-none" placeholder="Brief background..."></textarea>
                        </div>
                        <div className="space-y-1.5 flex flex-col sm:col-span-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">HMO Accreditation (Comma Separated)</label>
                          <input type="text" value={editDocHmo} onChange={e => setEditDocHmo(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none" placeholder="e.g. Maxicare, PhilHealth, Intellicare" />
                        </div>
                     </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                     {selectedDoctorId !== 'new' && (
                       <button onClick={handleDeleteDoctor} className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                         Delete Doctor
                       </button>
                     )}
                     <button onClick={() => setSelectedDoctorId('')} className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                       Cancel
                     </button>
                     <button onClick={saveDoctorProfile} className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                       {selectedDoctorId === 'new' ? 'Add Doctor' : 'Save Profile'}
                     </button>
                  </div>
                </div>

                {selectedDoctorId !== 'new' && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <h4 className="font-black text-slate-900">Weekly Schedules</h4>
                        <p className="text-xs text-slate-500">Manage clinic hours for this doctor.</p>
                      </div>
                      <button 
                        onClick={handleAddSchedule}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add Slot
                      </button>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      {selectedDoctor.schedules.length === 0 && (
                        <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200 text-center">No schedules set.</p>
                      )}

                      {selectedDoctor.schedules.map((sched, idx) => (
                        <div key={idx} className="flex gap-3 items-center bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
                          <div className="flex-1 space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase pl-1">Days</label>
                            <input 
                              type="text" 
                              value={sched.day} 
                              onChange={(e) => handleScheduleChange(idx, 'day', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none bg-white" 
                              placeholder="e.g. Monday - Friday"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase pl-1">Time</label>
                            <input 
                              type="text" 
                              value={sched.time} 
                              onChange={(e) => handleScheduleChange(idx, 'time', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none bg-white" 
                              placeholder="e.g. 8:00 AM - 5:00 PM"
                            />
                          </div>
                          <div className="flex flex-col justify-end h-[52px]">
                            <button 
                              onClick={() => handleRemoveSchedule(idx)}
                              className="text-red-500 hover:text-red-700 bg-red-50 p-2.5 rounded-lg transition-colors"
                              title="Remove schedule"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'accounts' && currentUser.role === 'Admin' && (
          <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 animate-in fade-in">
             <h2 className="text-xl font-black text-slate-900 mb-6">Manage Accounts</h2>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Create New Account</h3>
                  <form onSubmit={handleCreateAccount} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Username</label>
                      <input required type="text" value={newAccUsername} onChange={e=>setNewAccUsername(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Password</label>
                      <input required type="password" value={newAccPassword} onChange={e=>setNewAccPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-1 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Role</label>
                      <select value={newAccRole} onChange={e=>setNewAccRole(e.target.value as Role)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                        <option value="Admin">Admin (Full Access)</option>
                        <option value="Moderator">Moderator (Manage Posts)</option>
                        <option value="Staff">Staff (Manage Doctors)</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-sm transition-colors">
                      Create Account
                    </button>
                  </form>
               </div>

               <div>
                 <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Existing Accounts</h3>
                 <div className="space-y-2 max-h-[300px] overflow-y-auto">
                   {accounts.map(acc => (
                     <div key={acc.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <div>
                          <p className="font-bold text-sm text-slate-900">{acc.username}</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{acc.role}</p>
                        </div>
                        {acc.id !== '1' && acc.id !== currentUser.id && (
                          <button 
                            onClick={() => deleteAccount(acc.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
