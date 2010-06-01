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

var ak = require('ak', '0.2');


var relVar = ak.rv.kv_Store;


exports.drop = function () {
  try {
    relVar.drop();
  } catch (error) {
    ak.assert(error instanceof ak.NoSuchRelVarError);
  }
};


function select(key) {
  return relVar.where({key: key});
}


exports.store = new ak.Proxy(
  {
    get: function (key) {
      var json;
      try {
        json = select(key).getOne({attr: 'json'});
      } catch (error) {
        ak.assert(error instanceof ak.NoSuchRelVarError ||
                  error instanceof relVar.DoesNotExist);
        return undefined;
      }
      return JSON.parse(json);
    },

    query: function (key) {
      try {
        return select(key).count();
      } catch (error) {
        ak.assert(error instanceof ak.NoSuchRelVarError);
        return false;
      }
    },

    set: function (key, value) {
      var json = JSON.stringify(value);
      try {
        relVar.insert({key: key, json: json});
      } catch (error) {
        if (error instanceof ak.NoSuchRelVarError) {
          relVar.create({key: 'unique string', json: 'string'});
          relVar.insert({key: key, json: json});
        } else {
          ak.assert(error instanceof ak.ConstraintError);
          select(key).set({json: json});
        }
      }
    },

    del: function (key) {
      try {
        select(key).del();
      } catch (error) {
        ak.assert(error instanceof ak.NoSuchRelVarError);
      }
    },

    list: function () {
      try {
        return relVar.all().get({attr: 'key', by: 'key'});
      } catch (error) {
        ak.assert(error instanceof ak.NoSuchRelVarError);
        return [];
      }
    }
  });
