import {
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-admin e2e', () => {
  it('should create nx-admin', async () => {
    const plugin = uniq('nx-admin');
    ensureNxProject('@raftlabs/nx-admin', 'dist/packages/nx-admin');
    await runNxCommandAsync(`generate @raftlabs/nx-admin:app ${plugin} css`);
  }, 1200000);
});
