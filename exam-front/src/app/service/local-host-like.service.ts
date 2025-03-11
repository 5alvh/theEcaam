import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalHostLikeService {

  private readonly storageKey = 'likedPoems'; 
  
  constructor() { }

  getLiked(poemId: number): boolean {
    const likedPoems = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return likedPoems[poemId] || false;
  }
  
  setLiked(poemId: number, liked: boolean): void {
    const likedPoems = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    likedPoems[poemId] = liked;
    localStorage.setItem(this.storageKey, JSON.stringify(likedPoems));
  }
  
  toggleLiked(poemId: number): void {
    const currentLiked = this.getLiked(poemId);
    this.setLiked(poemId, !currentLiked);
  }  

}
