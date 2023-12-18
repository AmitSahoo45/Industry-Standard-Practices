import mmh3
from bitarray import bitarray
import json

class BloomFilter:
    def __init__(self, size, hash_functions):
        self.size = size
        self.hash_functions = hash_functions
        self.bit_array = bitarray(size)
        self.bit_array.setall(0)

    def add(self, item):
        for seed in range(self.hash_functions):
            index = mmh3.hash(item, seed) % self.size
            self.bit_array[index] = 1

    def contains(self, item):
        for seed in range(self.hash_functions):
            index = mmh3.hash(item, seed) % self.size
            if self.bit_array[index] == 0:
                return False
        return True
    
with open('mockdata.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
    
bloom_filter = BloomFilter(10000, 4)

for entry in data:
    bloom_filter.add(entry['name'].lower())
    
items_to_check = ['Amit Kumar Sahoo', 'Zelig Joplin', 'John Chataignier', 'Gerik Giurio']
for item in items_to_check:
    if bloom_filter.contains(item.lower()):
        print(f"{item} may exist in the set.")
    else:
        print(f"{item} definitely does not exist in the set.")
