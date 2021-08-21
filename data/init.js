
print('---> CREATING DATABASE <---');

db = db.getSiblingDB('bookdirectory');

print('---> CREATING COLLECTION <---');

db.createCollection('book');

print('---> CREATING INDEX <---');

db.book.createIndex({ id: 1 }, { unique : true })

print('---> SUCCESS TO RUN SCRIPT <---');