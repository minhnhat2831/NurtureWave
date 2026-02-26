import { useRef, useState, type ChangeEvent } from 'react';
import { cn } from '@/lib/cn';

export interface ImageUploaderProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  labelClassName?: string;
  
  // Value & onChange
  value?: string; // URL or base64
  onChange?: (file: File | null, preview: string | null) => void;
  
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
  accept = 'image/*',
  maxSize = 5,
  required,
  disabled,
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) {
      setPreview(null);
      onChange?.(null, null);
      return;
    }

    // Validate file size
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange?.(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!disabled) {
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.(null, null);
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

      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors',
          dragActive && !disabled && 'border-violet-500 bg-violet-50',
          !dragActive && !error && 'border-gray-300 hover:border-gray-400',
          error && 'border-red-500',
          disabled && 'bg-gray-50 cursor-not-allowed opacity-60'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
          id="image-upload-input"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-contain rounded-lg"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <label
            htmlFor="image-upload-input"
            className={cn(
              'flex flex-col items-center justify-center cursor-pointer',
              disabled && 'cursor-not-allowed'
            )}
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-violet-700 hover:text-violet-800">
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
          </label>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};
