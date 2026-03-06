import { useRef, useState, type ChangeEvent } from 'react';
import { cn } from '@/lib/cn';
import { Icons } from './Icons';

export interface ImageUploaderProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;

  // Value & onChange
  value?: string; // URL or base64
  onChange?: (file: File | null, preview: string | null, uploadedUrl?: string | null) => void;

  // Upload to server (S3, etc)
  onUpload?: (file: File) => Promise<string>; // Returns uploaded URL

  // Settings
  accept?: string;
  maxSize?: number; // in MB
  required?: boolean;
  disabled?: boolean;
}

export const ImageUploader = ({
  label,
  error,
  helperText,
  containerClassName,
  labelClassName,
  value,
  onChange,
  onUpload,
  accept = 'image/*',
  maxSize = 5,
  required,
  disabled,
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | null) => {
    if (!file) {
      setPreview(null);
      setUploadError(null);
      onChange?.(null, null, null);
      return;
    }

    // Validate file size
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setUploadError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Generate preview first
    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result as string;
      setPreview(result);
      setUploadError(null);

      // If onUpload is provided, upload to server (S3, etc)
      if (onUpload) {
        try {
          setUploading(true);
          const uploadedUrl = await onUpload(file);
          setPreview(uploadedUrl); // Use uploaded URL as preview
          onChange?.(file, result, uploadedUrl);
        } catch (error) {
          setUploadError(error instanceof Error ? error.message : 'Upload failed');
          setPreview(null);
          onChange?.(null, null, null);
        } finally {
          setUploading(false);
        }
      } else {
        // No upload, just use local preview
        onChange?.(file, result, null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setUploadError(null);
    onChange?.(null, null, null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className={cn('block text-sm font-medium text-gray-700 mb-1.5', labelClassName)}>
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Preview Image if exists */}
      {preview && (
        <div className="mb-3 relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
          />
          {!disabled && !uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md transition-colors cursor-pointer"
            >
              <Icons.closeButton />
            </button>
          )}
        </div>
      )}

      {/* Simple File Input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled || uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 disabled:opacity-50"
      />

      {/* Upload Status */}
      {uploading && (
        <p className="mt-1 text-xs text-blue-600 flex items-center gap-1">
          <Icons.loadingSpin style='animate-spin' />
          Uploading...
        </p>
      )}

      {/* Error or Helper Text */}
      {(error || uploadError) && (
        <p className="mt-1 text-xs text-red-500">{error || uploadError}</p>
      )}
      {helperText && !error && !uploadError && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
