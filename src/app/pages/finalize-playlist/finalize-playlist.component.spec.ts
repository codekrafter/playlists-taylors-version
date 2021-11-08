import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizePlaylistComponent } from './finalize-playlist.component';

describe('FinalizePlaylistComponent', () => {
  let component: FinalizePlaylistComponent;
  let fixture: ComponentFixture<FinalizePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
