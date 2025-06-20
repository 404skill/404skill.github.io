// src/npmApi.ts

import axios, { AxiosInstance } from 'axios';

const packageName = '404skill';

export interface DownloadPointDTO {
  package: string;
  downloads: number;
  start: string;  // e.g. "2025-06-13"
  end: string;    // e.g. "2025-06-19"
  unit: 'day' | 'week' | 'month';
}

export interface DownloadRangePoint {
  day: string;      // "2025-06-13"
  downloads: number;
}

export interface DownloadRangeDTO {
  package: string;
  start: string;
  end: string;
  downloads: DownloadRangePoint[];
}

export interface PackageMeta {
  name: string;
  'dist-tags': Record<string,string>;
  time: Record<string,string>;  // version → publish date
  versions: Record<string, any>;
  // …you can expand this with types you care about
}

export class NpmStatsApi {
  private readonly npmDownloads: AxiosInstance;
  private readonly npmRegistry: AxiosInstance;

  constructor() {
    this.npmDownloads = axios.create({
      baseURL: 'https://api.npmjs.org/downloads'
    });
    this.npmRegistry = axios.create({
      baseURL: 'https://registry.npmjs.org'
    });
  }

  /** total downloads in a period: 'last-day' | 'last-week' | 'last-month' */
  async getDownloadCount(
    pkg: string,
    period: 'last-day' | 'last-week' | 'last-month'
  ): Promise<DownloadPointDTO> {
    const res = await this.npmDownloads.get<DownloadPointDTO>(`/point/${period}/${pkg}`);
    return res.data;
  }

  /** daily breakdown between two YYYY-MM-DD dates (inclusive) */
  async getDownloadRange(
    pkg: string,
    start: string,
    end: string
  ): Promise<DownloadRangeDTO> {
    const res = await this.npmDownloads.get<DownloadRangeDTO>(`/range/${start}:${end}/${pkg}`);
    return res.data;
  }

  /** metadata for the package (versions, publish times, dist-tags, etc.) */
  async getPackageMetadata(pkg: string): Promise<PackageMeta> {
    const res = await this.npmRegistry.get<PackageMeta>(`/${pkg}`);
    return res.data;
  }
}
