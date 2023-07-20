export const addArea = (name: string) : Set<string> => {
    let areas: Set<string> = getAreas();
    areas.add(name);
    localStorage.setItem('Areas',JSON.stringify(Array.from(areas)));
    return getAreas();
};
export const deleteArea = (name: string) : Set<string> => {
    let areas: Set<string> = getAreas();
    areas.delete(name);
    localStorage.setItem('Areas',JSON.stringify(Array.from(areas)));
    return getAreas();
};
export const getAreas = () :Set<string> => {
    const areas = localStorage.getItem('Areas');
    return areas ? new Set(JSON.parse(areas)) : new Set();
}