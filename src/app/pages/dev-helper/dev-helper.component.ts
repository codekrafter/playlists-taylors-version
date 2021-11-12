import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, firstValueFrom, map } from 'rxjs';
import { API_BASE_URL } from '../../constants';
import { Playlist } from '../../models';

@Component({
  templateUrl: './dev-helper.component.html',
  styleUrls: ['./dev-helper.component.scss'],
})
export class DevHelperComponent implements OnInit {
  playlist: Playlist | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    this.playlist = await firstValueFrom(
      this.route.data.pipe(
        map((d) => d['playlist']),
        filter((p) => !!p)
      )
    );
  }
}
