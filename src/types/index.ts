export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message:string;
  access_token:string;
  data:UserType;
}


// export interface AddProjectPayload {
//   title: string;
//   description: string;
//   link: string;
// }

export interface ProjectResponse {
  _id: string;
  title: string;
  description: string;
  liveLink?: string;
  gitHubLink?:string;
  creator: {
    _id: string;
    username: string;
  };
  comments: {
    _id: string;
    message: string;
    author: {
      _id: string;
      username: string;
    };
  }[];
}

export interface UserSummary {
  _id: string;
  username: string;
  bio?: string;
}

export interface ProjectSummary {
  _id: string;
  title: string;
  description: string;
  creator: {
    _id: string;
    username: string;
  };
}

export interface SearchResult {
  users: UserSummary[];
  projects: ProjectSummary[];
}

export interface UpdateProfilePayload {
  username: string;
  bio?: string;
  avatar?: string;
  liveLink?: string;
  gitHubLink?:string;
}


export interface UserType {
  _id?: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  liveLink?: string;
  gitHubLink?:string;
}

export interface ProjectType {
  _id: string;
  title: string;
  description: string;
  liveLink?: string;
  gitHubLink?:string;
  creator: UserType;
}

export interface CommentType {
  _id: string;
  text: string;
  userId: UserType;
}

export interface AddCommentPayload {
  message: string;
}
