import {
  Fork,
  GitBlob,
  GitRef,
  GitTreeCreateDTO,
  GitTree,
  TreeEntity,
  GitRefCreateDTO,
  GitCommit,
  GitCommitCreateDTO,
} from './types';

export class GithubService {
  private static apiEndpoint = 'https://api.github.com';
  private static ghEndpoint = 'https://github.com';
  private static clientId = 'ba97c6160162014cccdc';
  private static clientSecret = 'b21353e4e21996d91575598c76957edd00e72696';
  private static token?: string;
  private static index: TreeEntity[] = [];

  public static getAuthLink() {
    const scopes = ['user', 'repo'].join('%20');
    return `${this.ghEndpoint}/login/oauth/authorize?client_id=${this.clientId}&scope=${scopes}`;
  }
  public static async setToken(code: string) {
    const form = new FormData();
    form.append('client_id', this.clientId);
    form.append('client_secret', this.clientSecret);
    form.append('code', code);
    this.token = await fetch(`${this.ghEndpoint}/login/oauth/access_token`, {
      method: 'post',
      body: form,
    })
      .then((response) => response.text())
      .then((s) => new URLSearchParams(s).get('access_token') || undefined);
  }
  public static isAuthorized(): boolean {
    return !!this.token;
  }
  public static async createFork(sourceRepository: string): Promise<Fork> {
    return this.post(`${this.apiEndpoint}/repos/${sourceRepository}/forks`);
  }

  public static async commitIndex(message: string, repository: string): Promise<GitCommit> {
    const commitToBranch = 'master';
    return this.getBranchRef(repository, commitToBranch)
      .then((ref) => ref.object.sha)
      .then(async (masterSHA) => {
        const treeDto = {
          base_tree: masterSHA,
          tree: this.index,
        };
        const tree = await this.createTree(repository, treeDto);
        const commitDto: GitCommitCreateDTO = {
          message: message,
          parents: [masterSHA],
          tree: tree.sha,
        };
        return this.createCommit(repository, commitDto);
      })
      .then(async (commit) => {
        const refDto: GitRefCreateDTO = {
          sha: commit.sha,
          force: true,
        };
        await this.updateBranchRef(repository, commitToBranch, refDto);
        return commit;
      });
  }
  public static async addTextToIndex(repository: string, content: string, filename: string): Promise<TreeEntity> {
    return this.createTextBlob(repository, content).then((blob) => this.createTreeEntity(filename, blob.sha));
  }

  public static async addFileToIndex(repository: string, file: File): Promise<TreeEntity> {
    return this.createFileBlob(repository, file).then((blob) => this.createTreeEntity(file.name, blob.sha));
  }

  public static async createCommit(repository: string, model: GitCommitCreateDTO): Promise<GitCommit> {
    return this.post(`${this.apiEndpoint}/repos/${repository}/git/commits`, JSON.stringify(model));
  }

  private static async createTree(repository: string, model: GitTreeCreateDTO): Promise<GitTree> {
    return this.post(`${this.apiEndpoint}/repos/${repository}/git/trees`, JSON.stringify(model));
  }

  private static async getBranchRef(repository: string, branch: string): Promise<GitRef> {
    return fetch(`${this.apiEndpoint}/repos/${repository}/git/refs/heads/${branch}`, {
      method: 'get',
    }).then((res) => res.json());
  }

  private static async updateBranchRef(repository: string, branch: string, ref: GitRefCreateDTO): Promise<GitRef> {
    return this.post(`${this.apiEndpoint}/repos/${repository}/git/refs/heads/${branch}`, JSON.stringify(ref));
  }

  private static async createTextBlob(repository: string, content: string): Promise<GitBlob> {
    return this.post(
      `${this.apiEndpoint}/repos/${repository}/git/blobs`,
      JSON.stringify({
        content: content,
        encoding: 'utf-8',
      }),
    );
  }

  private static async createFileBlob(repository: string, file: File): Promise<GitBlob> {
    return this.post(
      `${this.apiEndpoint}/repos/${repository}/git/blobs`,
      JSON.stringify({
        content: await this.toBase64(file),
        encoding: 'base64',
      }),
    );
  }

  private static async post<T>(url: string, body?: any): Promise<T> {
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${this.token}`,
      },
      body: body,
    }).then((res) => res.json());
  }

  private static async toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).replace(/^data:\S*;base64,/, ''));
      reader.onerror = (error) => reject(error);
    });
  }

  private static createTreeEntity(path: string, sha: string): TreeEntity {
    const item = {
      path: path,
      mode: '100644',
      type: 'blob',
      sha: sha,
    };
    this.index.push(item);
    return item;
  }
}
