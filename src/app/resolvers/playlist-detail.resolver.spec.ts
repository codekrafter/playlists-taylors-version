import { TestBed } from '@angular/core/testing';

import { PlaylistDetailResolver } from './playlist-detail.resolver';

describe('PlaylistDetailResolver', () => {
  let resolver: PlaylistDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PlaylistDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
