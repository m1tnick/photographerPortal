import { AlbunsModule } from './albuns.module';

describe('AlbunsModule', () => {
  let albunsModule: AlbunsModule;

  beforeEach(() => {
    albunsModule = new AlbunsModule();
  });

  it('should create an instance', () => {
    expect(albunsModule).toBeTruthy();
  });
});
