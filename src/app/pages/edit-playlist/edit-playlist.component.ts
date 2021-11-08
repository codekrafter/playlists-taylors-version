import { SelectionModel } from '@angular/cdk/collections';
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
import { MatOption } from '@angular/material/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  filter,
  firstValueFrom,
  map,
  Observable,
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
      .subscribe((selected) => this.updateOutput(selected));

    this.selectAll();
  }

  private async updateOutput(
    selection: SelectionModel<MatListOption>
  ): Promise<void> {
    if (!this.playlist) return;

    const selected = selection.selected.map((s) => s.value);

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
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  selectAll(): void {
    // Select all options that are not disabled
    this.list.options.map((o) => (o.disabled ? null : (o.selected = true)));
    this.updateOutput(this.list.selectedOptions);
  }

  selectNone(): void {
    this.list.deselectAll();
    this.updateOutput(this.list.selectedOptions);
  }

  getSelected$(list: MatSelectionList): Observable<string> {
    return list.selectionChange.pipe(
      startWith(0),
      map(() =>
        list.selectedOptions.selected
          .map((s) => 'spotify:track:' + s.value)
          .join(',')
      )
    );
  }
}
