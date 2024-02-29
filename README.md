# HashMap Data Structure
### This HashMap uses linked lists to handle collisions and rehashing after reaching a load factor of 0.8

- In the best (and in general average case with a nice hash function), we have $\ O(1)$ lookup and removal times
    - Worst case, we have $\ O(n)$ lookup and removal times, which only occurs when we have almost all of the keys hashing into the same position, forming a linked list of size $\ n$, however, with a smart hashing function and rehashing after the size increases, the odds of this happening are slim.
- In terms of space complexity, we always use $\ \Theta(n)$ memory
