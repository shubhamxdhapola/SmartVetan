import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../store/slices/upload.slice";
import { toast } from "sonner";

const ProfilePhotoSelector = ({ profileImg, setFormData }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(profileImg || null);
  const { uploading } = useSelector((state) => state.upload);
  const { loading } = useSelector((state) => state.employee);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(uploadImage(formData))
        .unwrap()
        .then((profileImage) => {
          setProfilePic(profileImage);
          setFormData((prevData) => ({
            ...prevData,
            profilePic: profileImage,
          }));
          toast.success("Profile image uploaded");
        })
        .catch(() => toast.error("Error in uploading image"));
    }
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    setFormData((prevData) => ({
      ...prevData,
      profileImageUrl: null,
    }));
    toast.success("Profile image removed");
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start pb-4 border-b border-outline-variant/10">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="relative group">
        {!profilePic ? (
          <>
            <div
              onClick={!(uploading || loading) ? onChooseFile : undefined}
              className={`w-32 h-32 rounded-sm bg-[#030712] border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center transition-colors overflow-hidden boxy ${
                uploading || loading
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer group-hover:border-primary/50"
              }`}
            >
              {uploading ? (
                <span
                  className="material-symbols-outlined text-primary text-3xl animate-spin mb-1"
                  data-icon="progress_activity"
                >
                  progress_activity
                </span>
              ) : (
                <>
                  <span
                    className="material-symbols-outlined text-on-surface-variant text-3xl group-hover:text-primary mb-1"
                    data-icon="add_a_photo"
                  >
                    add_a_photo
                  </span>
                  <p className="text-[10px] text-center px-4 text-on-surface-variant">
                    Upload Photo
                  </p>
                  {/* <div className="absolute bottom-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span
                      className="material-symbols-outlined text-primary text-3xl"
                      data-icon="upload"
                    >
                      upload
                    </span>
                  </div> */}
                </>
              )}
            </div>
            {/* <button
              type="button"
              onClick={onChooseFile}
              disabled={uploading || loading}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dim transition-all z-10 border-2 border-[#060e20] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span
                  className="material-symbols-outlined text-xl animate-spin"
                  data-icon="progress_activity"
                >
                  progress_activity
                </span>
              ) : (
                <span
                  className="material-symbols-outlined text-xl"
                  data-icon="add_a_photo"
                >
                  add_a_photo
                </span>
              )}
            </button> */}
          </>
        ) : (
          <>
            <img
              src={profilePic}
              alt="Profile Photo"
              className="w-32 h-32 rounded-sm object-cover border border-outline-variant/30 boxy"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={loading}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#ff6e84] text-[#490013] rounded-full flex items-center justify-center shadow-lg hover:bg-[#d73357] transition-all z-10 border-2 border-[#060e20] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                className="material-symbols-outlined text-xl"
                data-icon="delete"
              >
                delete
              </span>
            </button>
          </>
        )}
      </div>

      <div className="flex-1 space-y-2 py-2">
        <h4 className="font-headline font-bold text-on-surface">
          Profile Picture
        </h4>
        <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
          Please provide a professional headshot. JPEG or PNG, max 5MB. This
          will be visible on payroll slips and identity cards.
        </p>
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
