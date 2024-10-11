import { Injectable } from '@angular/core';
import { IStorageProvider } from '../interface/istorage-provider';
import { CookieProvider } from '../shared/providers/cookie.provider';
import { LocalStorageProvider } from '../shared/providers/local-storage.provider';

export const StoreName = {
  Cookie: 'Cookie'
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private store: IStorageProvider;

  constructor(
      private cookieProvider: CookieProvider,
      private localStorageProvider: LocalStorageProvider
    ) 
  {
    this.store = this.localStorageProvider;
  }


  public get(key: string): any {
    return this.store.get(key);
  }

  public set(key: string, model: any): void {
    this.store.set(key, model);
  }

  public delete(key: string): void {
    this.store.delete(key);
  }

  public clear(): void {
    this.store.clearAll();
  }
}
