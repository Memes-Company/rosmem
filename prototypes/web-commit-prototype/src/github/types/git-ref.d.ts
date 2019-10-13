export interface GitRef {
  ref: string;
  node_id: string;
  url: string;
  object: GitObject;
}
export interface GitObject {
  sha: string;
  type: string;
  url: string;
}

export interface GitRefCreateDTO {
  sha: string;
  force: boolean;
}
