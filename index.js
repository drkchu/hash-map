/*

Use the following snippet whenever you access a bucket through an index. We want to throw an error if we try to access an out of bound index:

if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }

*/

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
        console.log(index)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
            }
        
        if (this.buckets[index] === undefined || this.buckets[index].key === key) { // There's nothing occupying this space
            this.buckets[index] = {key: key, value: value};
        }

        else if (true) { // Update the condition to check if we have a collision

        }

        // Check if I should resize the hashMap based on the load factor
    }
}

let newHashMap = new HashMap();
newHashMap.set('Ke12y', 'VALUEE')
newHashMap.set('Ke12y', 'new  Value')
console.log(newHashMap);
