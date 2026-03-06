//Change number amount like currency
export const formatter = (currency?: string) => new Intl.NumberFormat('vi-VN', 
    { style: 'currency', currency: currency || "VND" }
);