import { sharedAcl } from './shared-acl';

describe('sharedAcl', () => {
  it('should work', () => {
    expect(sharedAcl()).toEqual('shared-acl');
  });
});
