import type { App } from "vue";
import axios from "axios";
import type { Article, ArticlesResponse, SearchResponse } from "@/core/models";

interface ChronosAPI {
  getStatus(): Promise<string>;
  getLangs(): Promise<string[]>;
  getArticles(lang: string): Promise<ArticlesResponse>;
  getArticleByLanguageAndSlug(lang: string, slug: string): Promise<Article | null>;
  searchArticles(lang: string, query: string): Promise<SearchResponse>;
}

const ChronosPlugin = {
  install: (app: App, baseURL: string) => {
    const api: ChronosAPI = {
      async getStatus() {
        try {
          const response = await axios.get(baseURL);
          return response.data.status;
        } catch (error) {
          throw new Error('Failed to get server status');
        }
      },

      async getLangs() {
        try {
          const response = await axios.get(`${baseURL}/langs`);
          return response.data;
        } catch (error) {
          throw new Error('Failed to get langs');
        }
      },

      async getArticles(lang: string) {
        try {
          const response = await axios.get(`${baseURL}/articles/${lang}`);
          console.log(`${baseURL}/articles/${lang}`);
          return response.data;
        } catch (error) {
          throw new Error('Failed to get articles');
        }
      },

      async getArticleByLanguageAndSlug(lang: string, slug: string) {
        try {
          const response = await axios.get(`${baseURL}/articles/${lang}/${slug}`);
          return response.data;
        } catch (error: any) {
          if (error.response.status === 404) {
            return null;
          }
          throw new Error('Failed to get article');
        }
      },

      async searchArticles(lang: string, query: string): Promise<SearchResponse> {
        try {
          const response = await axios.get(`${baseURL}/search/${lang}?q=${query}`);
          return response.data;
        } catch (error) {
          throw new Error('Failed to search articles');
        }
      }
    };

    app.config.globalProperties.$chronosAPI = api;
  }
};

export default ChronosPlugin;