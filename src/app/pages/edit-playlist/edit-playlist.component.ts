import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  map,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { ConversionService } from '../../conversion.service';
import { Playlist, Track } from '../../models';

@Component({
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss'],
})
export class EditPlaylistComponent implements OnInit, AfterViewInit, OnDestroy {
  playlist: Playlist | null = null;

  @ViewChild(MatSelectionList) list!: MatSelectionList;

  private destroyed$ = new Subject<void>();

  private output = new BehaviorSubject<Track[]>([]);
  output$ = this.output.asObservable();

  constructor(
    private route: ActivatedRoute,
    public conversion: ConversionService
  ) {}

  async ngOnInit(): Promise<void> {
    this.playlist = await firstValueFrom(
      this.route.data.pipe(
        map((d) => d['playlist']),
        filter((p) => !!p)
      )
    );

    console.log(this.playlist);
  }

  ngAfterViewInit(): void {
    // Wait until the list is accessible
    if (!this.list) {
      setTimeout(() => this.ngAfterViewInit());
      return;
    }

    this.list.selectionChange
      .pipe(
        startWith(0),
        map(() => this.list.selectedOptions),
        takeUntil(this.destroyed$)
      )
      .subscribe(async (o) => {
        // console.log(o);
        if (!this.playlist) return;

        const selected = o.selected.map((s) => s.value);

        this.output.next(
          await Promise.all(
            this.playlist.tracks.items.map(async ({ track }) => {
              if (selected.includes(track.id)) {
                return this.conversion
                  .findReplacementTrack(track)
                  .then((v) => v ?? track); // Make sure we don't end up with a null track
              } else {
                return Promise.resolve(track);
              }
            })
          )
        );
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
