import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store/slices/auth.slice';
import ProfilePhotoSelector from '../components/common/ProfilePhotoSelector';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { toast } from 'sonner';

const Settings = () => {
  const dispatch = useDispatch();
  const { employer, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    profilePic: null,
  });

  // Load existing employer data into the form
  useEffect(() => {
    if (employer) {
      setFormData({
        name: employer.name || '',
        email: employer.email || '',
        organization: employer.organization || '',
        profilePic: employer.profileImage || null,
      });
    }
  }, [employer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map profilePic back to profileImage for the backend
    const profileData = {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      profileImage: formData.profilePic,
    };

    try {
      await dispatch(updateProfile(profileData)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error?.message || "Failed to update profile");
    }
  };

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-[#dee5ff]">
            Account Settings
          </h2>
          <p className="text-on-surface-variant mt-1 text-sm">
            Manage your personal and organizational profile.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-outline-variant/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            {/* Profile Photo Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pb-8 border-b border-outline-variant/10">
              <ProfilePhotoSelector 
                profileImg={employer?.profileImage} 
                setFormData={setFormData} 
              />
              <div>
                <h3 className="text-lg font-bold text-on-surface">Profile Picture</h3>
                <p className="text-sm text-on-surface-variant mt-1 max-w-md">
                  Upload a high-resolution logo or profile image. This will be displayed across the dashboard.
                </p>
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-on-surface-variant ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#060e20] text-on-surface border border-outline-variant/20 rounded-xl px-12 py-3.5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/40"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-on-surface-variant ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    mail
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#060e20] text-on-surface border border-outline-variant/20 rounded-xl px-12 py-3.5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/40"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-on-surface-variant ml-1">
                  Organization / Business Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                    business
                  </span>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full bg-[#060e20] text-on-surface border border-outline-variant/20 rounded-xl px-12 py-3.5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-on-surface-variant/40"
                    placeholder="e.g. Kashish Dhaba"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t border-outline-variant/10">
              <button
                type="submit"
                disabled={loading}
                className="bg-linear-to-r from-primary to-secondary text-on-primary-fixed font-bold px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(186,158,255,0.15)] hover:shadow-[0_0_25px_rgba(186,158,255,0.25)] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {loading ? (
                  <span
                    className="material-symbols-outlined animate-spin text-xl"
                    data-icon="progress_activity"
                  >
                    progress_activity
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
