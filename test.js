var tape = require('tape')
  , caseless = require('./')
  ;

tape('set get has', function (t) {
  var headers = {}
    , c = caseless(headers)
    ;
  t.plan(9)
  c.set('a-Header', 'asdf')
  t.equal(c.get('a-header'), 'asdf')
  t.equal(c.has('a-header'), 'a-Header')
  t.ok(!c.has('nothing'))
  // old bug where we used the wrong regex
  t.ok(!c.has('a-hea'))
  c.set('a-header', 'fdsa')
  t.equal(c.get('a-header'), 'fdsa')
  t.equal(c.get('a-Header'), 'fdsa')
  c.set('a-HEADER', 'more', false)
  t.equal(c.get('a-header'), 'fdsa,more')

  t.deepEqual(headers, {'a-Header': 'fdsa,more'})
  c.swap('a-HEADER')
  t.deepEqual(headers, {'a-HEADER': 'fdsa,more'})

})
