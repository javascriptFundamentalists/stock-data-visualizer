import { expect } from 'chai';
import { Store } from '../src/components/store.js';

describe('Store state manager testing', () => {
  const the_store = it;

  /**
   * Create a fixture to catch input and hold it for testing
   */
  const statefulFixtureFactory = () => {
    let _data;
    return {
      get: () => { return _data },
      set: (data) => { _data = data },
    }
  }

  the_store('should allow listeners to subscribe or unsubscribe', () => {
    const store = new Store();
    expect(1 + 1).to.equal(2);
    store.subscribe(() => { return 'foo' });
    expect([...store.listeners]).to.have.lengthOf(1);
  });

  the_store('should notify subscribers when instructed', () => {
    const store = new Store();
    const fixture = statefulFixtureFactory();
    const fooListener = () => { fixture.set({foo: 'bar'}) };
    store.subscribe(fooListener);
    store.notify();
    expect(fixture.get()).to.deep.equal({foo: 'bar'});
  });

  the_store('should notify subscribers when update is called', () => {
    // set up
    const store = new Store();
    const fixture = statefulFixtureFactory();
    const fooListener = () => { fixture.set({foo: 'bar'}) };
    store.subscribe(fooListener);

    // test
    // it doesn't matter what input, update just notifies, and each
    // component's listener will ask for it's own data
    store.update({bar: 'baz'}); 
    expect(fixture.get()).to.deep.equal({foo: 'bar'});
  });

  the_store('should be able to tell when its data has changed', () => {
    const store = new Store();

    const testCases = [
      [{foo: 'bar'}, {foo: 'bar'}, true],
      [{foo: 'bar'}, {foo: 'fails'}, false],
      [{foo: 'bar', numbers: [1, 2, 3]}, {numbers: [1, 2, 3], foo: 'bar', }, true],
      [{foo: 'bar', numbers: [1, 2, 3], obj: {a: 'b'}}, {numbers: [1, 2, 3], foo: 'bar', }, false],
      [{foo: 'bar', numbers: [1, 2, 3], obj: {a: 'b'}}, {obj: {a: 'b'}, numbers: [1, 2, 3], foo: 'bar', }, true],
    ];

    testCases.forEach(testCase => {
      expect(store.deepEqual(testCase[0], testCase[1])).to.equal(testCase[2]);
    });
  });

});
