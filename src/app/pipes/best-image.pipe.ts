import { Pipe, PipeTransform } from '@angular/core';
import { Playlist, Track } from '../models';

@Pipe({
  name: 'bestImage',
})
export class BestImagePipe implements PipeTransform {
  transform(value: Playlist | Track, reversed = true): string {
    const images = 'album' in value ? value.album.images : value.images;

    if (!images) return '';

    return reversed ? images[images.length - 1]?.url : images[0]?.url;
  }
}
