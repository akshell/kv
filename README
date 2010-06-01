# kv

A simple key-value store. The stored values are persisted across
requests.

Usage examples:

    var kv = require('kv', '0.1');

    // set values
    kv.store.x = 42;
    kv.store.y = '42';
    assertEqual(items(kv.store), [['x', 42], ['y', '42']]);

    // set complex value
    kv.store.z = {a: 'a', b: [1, 2, 3], c: {d: 'd'}};
    
    // delete value
    delete kv.store.x;
    assert(!('x' in kv.store));
     
    // drop the store
    kv.drop();
    assertEqual(keys(kv.store), []);
