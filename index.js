/*

Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out of bound index:

if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }

*/
function doubleArraySize(arr) {
    const newSize = arr.length * 2;
    const newArray = new Array(newSize);
    for (let i = 0; i < arr.length; i++) {
        newArray[i] = arr[i];
    }
    return newArray;
}

class HashMap {

    constructor(size = 16) {
        this.buckets = Array(size);
        this.size = size;
        this.numItems = 0;
        this.loadFactor = 0.8;
    }

    // A simple hash function using chars
    // Note that I'm taking the modulus inside of the loop since JS precision gets funky when the number gets big
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
        }
     
        return hashCode;
    }

    // Collisions handled using a linked list method, each item in the hashMap has a nextItem attribute used to house items with different keys that hash to the same position
    set(key, value) {
        let index = this.hash(key);
        console.log('the index for ' + key + 'is ' + index);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
            }
        
        if (this.buckets[index] === undefined) { // There's nothing occupying this space or the first element is a duplicate
            this.buckets[index] = {key: key, value: value, nextItem: null};
            this.numItems++;
        } else if (this.buckets[index].key === key) { // The first element has the matching key
            this.buckets[index] = {key: key, value: value, nextItem: null};
        } else {
            let currItem = this.buckets[index];

            while(true) {
                if (currItem.nextItem === null) {
                    currItem.nextItem = {key: key, value: value, nextItem: null};
                    this.numItems++;
                    break;
                }

                if (currItem.key === key) {
                    currItem.value = value;
                    break;
                }

                currItem = currItem.nextItem;
            }
        }

        if (this.numItems / this.size >= this.loadFactor) {
            this.buckets = doubleArraySize(this.buckets);
            this.size = this.buckets.length;
            // this.rehash();
        }
    }

    // Retrieves the value associated with the key, null if not found
    get(key) {
        let index = this.hash(key);
        console.log('trying to find' + index);
        let currItem = this.buckets[index];

        if (currItem === undefined)
            return null;
        while (currItem !== null) {
            if (currItem.key === key) 
                return currItem.value;
            currItem = currItem.nextItem;
        }

        return null;
    }

    rehash() { // rehashes all the current items in buckets, required since when we resize the modulus changes
        // TODO
    }

    // Attempts to remove the item with the given key, true is successful, false otherwise
    remove(key) {
        let index = this.hash(key);
        console.log('trying to remove the item with this ' + index);
        let currItem = this.buckets[index];

        if (currItem.key === key) { // the item to remove is in the index position
            this.numItems--;
            this.buckets[index] = currItem.nextItem === null ? undefined : currItem.nextItem;
            return true;
        }

        // The item at the hash index isn't the one we're looking for, traverse the linked list
        while (currItem.nextItem !== null) {
            if (currItem.nextItem.key === key) {
                this.numItems--;
                currItem.nextItem = currItem.nextItem.nextItem; // Basically just skip the pointer
                return true;
            }    
            currItem = currItem.nextItem;
        }

        return false; // Couldn't find the item to remove
    }

    // Returns the number of STORED KEYS in the hashMap
    length() {
        return this.numItems;
    }

    // Removes all entries in the hashMap, doesn't bother to resize down haha
    clear() {
        this.buckets = Array(this.size);
        this.numItems = 0;
    }

    // Returns an array of all the keys in the hashMap
    keys() {
        return this.getKeysHelper(this.buckets);
    }

    // Helper to return all keys in buckets
    getKeysHelper(buckets) {
        const result = [];

        for (let i = 0; i < buckets.length; i++) {
            let currItem = buckets[i];
            while (currItem !== null && currItem !== undefined) {
                result.push(currItem.key);
                currItem = currItem.nextItem;
            }
        }

        return result;
    }

    values() {
        return this.getValuesHelper(this.buckets);
    }

    // Helper to return all values in buckets
    getValuesHelper(buckets) {
        const result = [];

        for (let i = 0; i < buckets.length; i++) {
            let currItem = buckets[i];
            while (currItem !== null && currItem !== undefined) {
                result.push(currItem.value);
                currItem = currItem.nextItem;
            }
        }

        return result;
    }

    // Returns an array containing each key value pair, i.e. [[firstKey, firstValue], [secondKey, secondValue]]
    entries() {
        let keys = this.keys(this.buckets)
        let values = this.values(this.buckets);
        let result = [];

        // Assuming the |keys| === |values|
        for (let i = 0; i < keys.length; i++) {
            let pair = [keys[i], values[i]];
            result.push(pair);
        }

        return result;
    }
}

let newHashMap = new HashMap(64);

console.log(newHashMap);

newHashMap.set('key 4', 'value 4');
newHashMap.set('key 5', 'value 5');
newHashMap.set('key 6', 'value 6');
newHashMap.set('key 7', 'value 7');
newHashMap.set('key 1', 'value 1');
newHashMap.set('key 2', 'value 2');
newHashMap.set('key 3', 'value 3');

console.log(newHashMap.keys());
console.log(newHashMap.values());
console.log(newHashMap.entries());



