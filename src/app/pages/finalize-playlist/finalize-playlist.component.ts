import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './finalize-playlist.component.html',
  styleUrls: ['./finalize-playlist.component.scss'],
})
export class FinalizePlaylistComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
