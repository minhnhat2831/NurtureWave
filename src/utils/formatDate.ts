//Change date into  dd/mm/yyyy
export const formatDate = (dateStr: string | undefined | null) => {
    if (!dateStr) {
        return '';
    }
    const dateObj = new Date(dateStr);
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(',', '');
    return formattedDate
};