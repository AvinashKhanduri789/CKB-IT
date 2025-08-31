
//Remove key from array of objects
export function removeKey(obj, keyToRemove){
    const removeKey = (obj, key) => {
        const { [key]: removedKey, ...rest } = obj;
        return rest;
    };

    const newArray = obj.map(obj => removeKey(obj, keyToRemove));
    return newArray
}   


export function sortArrayOfObjects(array, key1, key2) {
    return array.sort((a, b) => {
        if (a[key1] === b[key1]) {
            // If the values of key1 are the same, sort by key2
            return a[key2] > b[key2] ? -1 : 1;
        }
        // Otherwise, sort by key1
        return a[key1] > b[key1] ? -1 : 1;
    });
}

export function formatTime(timer) {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    const formattedTime = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    return formattedTime;
}



