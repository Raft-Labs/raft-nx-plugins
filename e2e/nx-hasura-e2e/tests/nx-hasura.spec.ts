import {
  checkFilesExist,
  ensureNxProject,
  readJson,
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

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('nx-hasura');
      ensureNxProject('@raftlabs/nx-hasura', 'dist/packages/nx-hasura');
      await runNxCommandAsync(
        `generate @raftlabs/nx-hasura:nx-hasura ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('nx-hasura');
      ensureNxProject('@raftlabs/nx-hasura', 'dist/packages/nx-hasura');
      await runNxCommandAsync(
        `generate @raftlabs/nx-hasura:nx-hasura ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
