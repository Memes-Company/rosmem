export interface GitCommit {
  sha: string;
  node_id: string;
  url: string;
  html_url: string;
  author: AuthorOrCommitter;
  committer: AuthorOrCommitter;
  tree: Tree;
  message: string;
  parents?: (ParentsEntity)[] | null;
  verification: Verification;
}
export interface AuthorOrCommitter {
  name: string;
  email: string;
  date: string;
}
export interface Tree {
  sha: string;
  url: string;
}
export interface ParentsEntity {
  sha: string;
  url: string;
  html_url: string;
}
export interface Verification {
  verified: boolean;
  reason: string;
  signature?: null;
  payload?: null;
}

export interface GitCommitCreateDTO {
  message: string;
  parents?: (string)[] | null;
  tree: string;
}
