export class GithubService {
  private static endpoint = 'https://api.github.com';
  public static async createFork(code: string, sourceRepoOwner: string, sourceRepoName: string) {
    const data = JSON.stringify({
      client_id: 'ba97c6160162014cccdc',
      client_secret: 'b21353e4e21996d91575598c76957edd00e72696',
      code: code,
    });
    const token = await fetch(`https://github.com/login/oauth/access_token`, {
      method: 'post',
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    });
    return fetch(`${this.endpoint}/${sourceRepoOwner}/${sourceRepoName}/forks`, {
      method: 'post',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `token ${token}`,
      },
    });
  }
}
