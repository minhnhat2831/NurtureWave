export interface InfoFieldProps {
  label: string;
  value?: string | number | null;
  className?: string;
}

export const InfoField = ({ label, value, className = '' }: InfoFieldProps) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <p className="text-gray-900">{value || '-'}</p>
    </div>
  );
};
