// Search function
export function searchData(data, search_term) {
    let result = data.filter(item => {
        const target_field = item.title || item.name;
        return target_field.toLowerCase().includes(search_term);
    });
    return result;
}