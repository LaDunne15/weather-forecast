const capitalize = (inputString: string): string => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

export const addArea = (name: string): Set<string> => {
    let areas: Set<string> = getAreas();
    let areas_arr = Array.from(areas);
    areas_arr.unshift(capitalize(name));
    areas = new Set(areas_arr);
    localStorage.setItem('Areas',JSON.stringify(Array.from(areas)));
    return getAreas();
};
export const deleteArea = (name: string) : Set<string> => {
    let areas: Set<string> = getAreas();
    areas.delete(name);
    localStorage.setItem('Areas',JSON.stringify(Array.from(areas)));
    return getAreas();
};
export const getAreas = () : Set<string> => {
    const areas : any = localStorage.getItem('Areas');
    const areas_arr: string [] = areas?JSON.parse(areas):[];
    return (areas_arr.length)? new Set(areas_arr) : new Set();
}