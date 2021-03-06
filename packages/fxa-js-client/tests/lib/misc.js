/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const assert = require('chai').assert;
const Environment = require('../addons/environment');

describe('misc', function () {
  var respond;
  var client;
  var RequestMocks;
  let env;

  beforeEach(function () {
    env = new Environment();
    respond = env.respond;
    client = env.client;
    RequestMocks = env.RequestMocks;
  });

  it('#getRandomBytes', function () {
    return respond(client.getRandomBytes(), RequestMocks.getRandomBytes).then(
      function (res) {
        assert.property(res, 'data');
      },
      assert.fail
    );
  });

  it('_required', function () {
    assert.doesNotThrow(function () {
      client._required(true, 'true_boolean');
      client._required(false, 'false_boolean');
      client._required('string', 'string');
      client._required({ hasValue: true }, 'object_with_value');
      client._required(1, 'number');
      client._required(0, 'zero');
    });

    assert.throws(function () {
      client._required('', 'empty_string');
    });

    assert.throws(function () {
      client._required({}, 'empty_object');
    });

    assert.throws(function () {
      client._required(null, 'null');
    });
  });
});
