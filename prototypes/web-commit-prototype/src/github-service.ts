export class GithubService {
  private static apiEndpoint = 'https://api.github.com';
  private static ghEndpoint = 'https://github.com';
  private static clientId = 'ba97c6160162014cccdc';
  private static clientSecret = 'b21353e4e21996d91575598c76957edd00e72696';
  static token?: string;
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
  public static async createFork(sourceRepoOwner: string, sourceRepoName: string) {
    this.token = this.token;
    fetch(`${this.apiEndpoint}/repos/${sourceRepoOwner}/${sourceRepoName}/forks`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${this.token}`,
      },
    });
  }
}
