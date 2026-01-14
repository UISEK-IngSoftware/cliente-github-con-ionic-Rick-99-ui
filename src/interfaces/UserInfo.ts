export interface UserInfo {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    company?: string;
    location?: string;
    email?: string;
    blog?: string;
    twitter_username?: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}