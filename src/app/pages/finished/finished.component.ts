import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, firstValueFrom, map } from 'rxjs';
import { Playlist } from '../../models';

@Component({
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss'],
})
export class FinishedComponent implements OnInit {
  playlist: Playlist | null = null;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.playlist = await firstValueFrom(
      this.route.data.pipe(
        map((d) => d['playlist']),
        filter((p) => !!p)
      )
    );
  }
}
