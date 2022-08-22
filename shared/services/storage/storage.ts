class Storage {

  localStorage = globalThis.localStorage;

  setItem(key: string, value: string): void {
    if (!this.localStorage) {
      return;
    }
    this.localStorage.setItem(key, value);
  }

  getItem(key: string) {
    if (!this.localStorage) {
      return null;
    }
    return this.localStorage.getItem(key);
  }

}

export const storage = new Storage();