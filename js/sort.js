// Sort function
export function sortData(data, sort_type) {
    let result = [...data];
    if (sort_type === 'popular') {
        result.sort((a, b) => b.ratings - a.ratings);
    } else if (sort_type === 'newest') {
        result.reverse();
    }
    return result; //default oldest
}