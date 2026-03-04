import { useEffect } from 'react';
import { useHeader } from '@/hooks/useHeaderContext';

/**
 * PLACEHOLDER PAGE
 * Temporary page for routes not yet implemented
 */
export default function PlaceholderPage({ title }: { title: string }) {
  const { setHeaderContent } = useHeader();

  useEffect(() => {
    setHeaderContent({
      title: title,
    });

    return () => {
      setHeaderContent({});
    };
  }, [title, setHeaderContent]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">This page is under development</p>
        </div>
      </div>
    </div>
  );
}
