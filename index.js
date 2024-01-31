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
        this.buckets = Array(16);
        this.size = size;
        this.numItems = 0;
        this.loadFactor = 0.80;
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
        }
    }
}

let newHashMap = new HashMap();
