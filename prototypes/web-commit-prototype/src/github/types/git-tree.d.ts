export interface GitTree {
  sha: string;
  url: string;
  tree?: (TreeEntity)[] | null;
  truncated: boolean;
}

export interface GitTreeCreateDTO {
  base_tree: string;
  tree?: (TreeEntity)[] | null;
}

export interface TreeEntity {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url?: string;
}
