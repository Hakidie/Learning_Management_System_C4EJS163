export function filterData(data, filter_type) {
    if (filter_type === 'high-rating') {
        return data.filter(item => item.ratings > 1000);
    } else if (filter_type === 'low-rating') {
        return data.filter(item => item.ratings <= 1000);
    }
    return data; // default 'all'
}