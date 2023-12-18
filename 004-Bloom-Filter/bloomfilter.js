const fs = require('fs');
const { BloomFilter, PartitionedBloomFilter } = require('bloom-filters');

const rawData = fs.readFileSync('mockdata.json');
const data = JSON.parse(rawData);

const filter = new BloomFilter(10000, 4); // 10000 items, 4 hash functions

data.forEach((entry) => {
    filter.add(entry.name.toLowerCase());
});

const amitExists = filter.has('amit');

if (amitExists) {
    console.log('Amit exists in the names.');
} else {
    console.log('Amit does not exist in the names.');
}

console.log('Error Rate: ', filter.rate())

// Using a partitioned bloom filter
/* A Partitioned Bloom Filter is a variation of a classic Bloom Filter.

This filter works by partitioning the M-sized bit array into k slices of size m = M/k bits, k = nb of hash functions in the filter. Each hash function produces an index over m for its respective slice. Thus, each element is described by exactly k bits, meaning the distribution of false positives is uniform across all elements. */

const partitionedFilter = new PartitionedBloomFilter(10000, 4, 0.1);
// Partitioned Bloom Filter of size 10, 4 hash functions, and a load factor of 0.1

data.forEach((entry) => {
    partitionedFilter.add(entry.name.toLowerCase());
});

const amitExistsInPartitionedFilter = partitionedFilter.has('amit');

if (amitExistsInPartitionedFilter) {
    console.log('Amit exists in the names.(Partitioned)');
} else {
    console.log('Amit does not exist in the names.(Partitioned)');
}

console.log('Error Rate: ', partitionedFilter.rate())