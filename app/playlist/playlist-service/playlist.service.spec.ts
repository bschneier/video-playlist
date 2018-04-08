import { PlaylistService } from './playlist.service';
import { Video } from '../../shared/types/video';

describe('PlaylistService', () => {
  const service = new PlaylistService();

  function compareVideoArrays(array1: Video[], array2: Video[]): boolean {
    let arraysAreEqual = true;
    array1.some((value, index) => {
      if (value.title !== array2[index].title || value.length !== array2[index].length) {
        arraysAreEqual = false;
      }
      return !arraysAreEqual;
    });

    return arraysAreEqual;
  }

  function areAllArraysDistinct(array1: Video[], array2: Video[], array3: Video[]): boolean {
    return !(compareVideoArrays(array1, array2) || compareVideoArrays(array2, array3) ||
      compareVideoArrays(array1, array3));
  }

  it('should shuffle videos', () => {
    let areVideosShuffled = false;
    areVideosShuffled = areAllArraysDistinct(service.getPlaylist(), service.getPlaylist(), service.getPlaylist());
    if (!areVideosShuffled) {
      areVideosShuffled = areAllArraysDistinct(service.getPlaylist(), service.getPlaylist(),
        service.getPlaylist());
      if (areVideosShuffled) {
        areVideosShuffled = areAllArraysDistinct(service.getPlaylist(), service.getPlaylist(),
          service.getPlaylist());
      }
    }

    expect(areVideosShuffled).toBeTruthy();
  });
});
