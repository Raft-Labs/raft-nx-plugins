import {
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-hasura e2e', () => {
  it('should create nx-hasura', async () => {
    const plugin = uniq('nx-hasura');
    ensureNxProject('@raftlabs/nx-hasura', 'dist/packages/nx-hasura');
    await runNxCommandAsync(`generate @raftlabs/nx-hasura:nx-hasura ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);
});
