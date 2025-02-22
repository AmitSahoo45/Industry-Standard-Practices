## Optimizing writes in our database

client -> server -> database

How do you sscale this?

Lets consider our db as a data structure. To speed up queries our DB uses a DS called as B+ trees. 
This is like a binary search tree without the binary inside it as 1 node can follow multiple paths. 
These are prefered as these have good insertion and search time complexities - O(log n)

To optimise out DB writes, we need to optimise headers and data(unecessary exchange of data) and reduce I/O operations which will help us reduce some resources.

1. If we can condense and maintain 1 I/O call or simply condense the data queries into 1 query, but DB would require additional resources/storage to do this(drawback)
2. If we have a lot of insertions, then what DS is going to be the most optimal one? - Linked List. O(1) insertion time complexity. We have a DS which follows the philosophy of a linked list, called as **Log**. Drawback: Search time complexity is O(n) as we have to traverse the entire list to find the data. Fast Write but Slow Reads. 

So how do we optimise the slow reads? Instead of a linked list, we use a sorted array. This will give us O(log n) time complexity for search.

So what should we use?

| DS | Insertion | Search/Reading |
|----|-----------|--------|
| B+ Trees | O(log n) | O(log n) |
| Linked List | O(1) | O(n) |

🤔

Why not use a combination of Linked List and Sorted Array?
Great insertion speed and good search speed. 🥳

O(1) & O (log n)

Can we convert our linked list to a sorted array. 
Although we cant do it in the memory because that defeats the purpose.
We will do it in DB. 

We sort it and store it in the DB so that we can get the data in O(log n) time complexity.

Lets say we insert 10k rows. it will sort it and store. 
What if we insert 10k more rows?
We will sort it and store it again.

This is not efficient.

Why dont we keep the data in sorted chunks of size n. 
Do Binary search on chunks. 

Read operations is going to be slightly slower than O(log n) but it is still going to be faster than O(n)

Lets say you are storing 1k rows in 1 chunk.
If you have 10k rows, you will have 10 chunks.

If you draw a graph, its going to be a linear graph, O(n). 
Lets say we have 1B rows, we will have 1M chunks. Still very slow!
So how do we optimise?

We can use a hybrid approach.

We are taking some records and merging them, until we see that our sorting time is not too high!!
We will be mergining based on the standard merge sorting technique. 

This large sorted array can help us reduce the overall time complexity of our search operations.

So when should we merge the sorted arrays?
Simple as the algo of merge sort. 2 array block of size 6 is merged to 12. 12 to 24 and so on. All the way upto it will be costly to sort them. 
So your read is speed up this way.

You can use bloom filter. Use that to search. And each time we will be merging the array we will be requiring a new bloom filter. 


