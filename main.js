// Copyright (c) 2010, Oleg Podsechin and Anton Korenyushkin
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the author nor the names of contributors may be
//       used to endorse or promote products derived from this software
//       without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

ak = require('ak', '0.2');
kv = require('index');


exports.tests = ak.TestCase.subclass(
  {
    testStore: function () {
      kv.drop();
      kv.drop();
      ak.assertSame(kv.store.x, undefined);
      ak.assert(!('x' in kv.store));
      delete kv.store.x;
      ak.assertEqual(ak.keys(kv.store), []);
      kv.store.x = 15;
      kv.store.x = 42;
      kv.store.y = '42';
      kv.store[42] = {x: {y: 15}};
      ak.assertSame(kv.store.x, 42);
      ak.assertSame(kv.store.y, '42');
      ak.assertSame(kv.store[42].x.y, 15);
      ak.assertSame(kv.store.z, undefined);
      ak.assert('x' in kv.store);
      ak.assert(!('z' in kv.store));
      ak.assertEqual(ak.keys(kv.store), ['42', 'x', 'y']);
      delete kv.store[42];
      ak.assertEqual(ak.keys(kv.store), ['x', 'y']);
      kv.drop();
      ak.assertEqual(ak.keys(kv.store), []);
    }
  });
