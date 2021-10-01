import { ensureNxProject, uniq } from '@nrwl/nx-plugin/testing';
describe('fluentui-auth e2e', () => {
  it('should create fluentui-auth', async () => {
    const plugin = uniq('fluentui-auth');
    ensureNxProject('@raftlabs/fluentui-auth', 'dist/packages/fluentui-auth');
    expect('Executor ran').toContain('Executor ran');
  }, 120000);
});
