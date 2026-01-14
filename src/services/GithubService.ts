import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import AuthService from "./AuthService";
import { UserInfo } from "../interfaces/UserInfo";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config) => {
    const AuthHeaders = AuthService.getAuthHeaders();
    if (AuthHeaders) {
        config.headers.Authorization = AuthHeaders;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

interface GitHubRepo {
    name: string;
    description?: string;
    owner?: {
        avatar_url?: string;
        login?: string;
    };
    language?: string;
}



export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await githubApi.get('/user/repos', {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
        affiliation: "owner",
      },
    });

    return response.data.map((repo: GitHubRepo) => ({
      name: repo.name,
      description: repo.description ?? null,
      imageUrl: repo.owner?.avatar_url ?? null,
      owner: repo.owner?.login ?? null,
      language: repo.language ?? null,
    }));
  } catch (error) {
    console.error("Hubo un error al obtener repositorios:", error);
    return [];
  }
};

export const createRepository = async (name: string, description?: string, isPrivate: boolean = false): Promise<void> => {
  try {
    const response = await githubApi.post('/user/repos', {
      name,
      description,
      private: isPrivate,
    });
    console.log("Repositorio creado:", response.data);
  } catch (error) {
    console.error("Error al crear el repositorio:", error);
    throw error;
  }
};


export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await githubApi.get('/user');
    return {
      login: response.data.login,
      name: response.data.name || response.data.login,
      bio: response.data.bio || 'Sin biografía',
      avatar_url: response.data.avatar_url,
      company: response.data.company,
      location: response.data.location,
      email: response.data.email,
      blog: response.data.blog,
      twitter_username: response.data.twitter_username,
      public_repos: response.data.public_repos,
      public_gists: response.data.public_gists,
      followers: response.data.followers,
      following: response.data.following,
      created_at: response.data.created_at,
      updated_at: response.data.updated_at,
    };
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
    // Retornar valores por defecto en caso de error
    return {
      login: "Usuario desconocido",
      name: "Usuario no encontrado",
      bio: "No se pudo obtener la información del usuario",
      avatar_url: "https://via.placeholder.com/150",
      public_repos: 0,
      public_gists: 0,
      followers: 0,
      following: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }
};

export const updateRepository = async (owner: string, repoName: string, updates: { name?: string; description?: string; isPrivate?: boolean }): Promise<void> => {
  try {
    const updateData: { name?: string; description?: string; private?: boolean } = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.isPrivate !== undefined) updateData.private = updates.isPrivate;
    
    const response = await githubApi.patch(`/repos/${owner}/${repoName}`, updateData);
    console.log("Repositorio actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el repositorio:", error);
    throw error;
  }
};

export const deleteRepository = async (owner: string, repoName: string): Promise<void> => {
  try {
    await githubApi.delete(`/repos/${owner}/${repoName}`);
    console.log("Repositorio eliminado");
  } catch (error) {
    console.error("Error al eliminar el repositorio:", error);
    throw error;
  }
};