export type DatasetMeta = {
  id: string; // stable id used in URL: /datasets/:id
  slug?: string; // optional pretty alias (not used for routing now)
  name: string; // short title
  org: string; // e.g., openpecha
  repo: string; // repo name
  description: string; // 1-2 lines
  tasks: string[]; // ML task tags
  modalities: ("text" | "audio" | "image" | "document")[];
  languages: string[]; // ISO or names
  size: {
    hours?: number; // for audio
    items?: number; // for images/docs/lines
    tokens?: number; // for text corpora
    storage_gb?: number; // size on disk
    rows?: number; // number of rows in dataset
    size_mb?: number; // size in megabytes
  };
  splits?: { train?: number; val?: number; test?: number };
  license: string; // SPDX or name
  version: string; // semantic if possible
  updated_at: string; // ISO
  visibility: "public" | "private";
  checksum?: string; // tar/zip checksum if distributed
  labels?: string[]; // domain tags for quick chips
  links: {
    repo?: string;
    docs?: string;
    huggingface?: string;
    paper?: string;
  };
};

// Type for Google Sheets API response
type GoogleSheetDataset = {
  id: string;
  name: string;
  org: string;
  repo: string;
  description: string;
  tasks: string[];
  modalities: string[];
  languages: string[];
  size_rows?: number;
  size_mb?: number;
  size_hours?: number;
  size_items?: number;
  size_tokens?: number;
  size_storage_gb?: number;
  splits_train?: number;
  splits_val?: number;
  splits_test?: number;
  license: string;
  version: string;
  updated_at: string;
  visibility: "public" | "private";
  labels?: string[];
  slug?: string;
  checksum?: string;
  link_repo?: string;
  link_docs?: string;
  link_huggingface?: string;
  link_paper?: string;
};

// Google Sheets API URL
const GOOGLE_SHEETS_API_BASE_URL =
  "https://script.google.com/macros/s/AKfycbwyqVAZcThx65FXqJjqiQbFhSbZn4IP5MNpNaKTU7U1DJ0UyotJFg8SaUMsrS7U9uWMoA/exec";
const GOOGLE_SHEETS_API_URL = `${GOOGLE_SHEETS_API_BASE_URL}?sheet=datasets`;

// Cache configuration
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute
let cachedDatasets: DatasetMeta[] | null = null;
let cacheTimestamp: number | null = null;

// Check if cache is still valid
function isCacheValid(): boolean {
  if (!cachedDatasets || !cacheTimestamp) return false;
  const now = Date.now();
  return now - cacheTimestamp < CACHE_DURATION;
}

// Transform Google Sheets data to DatasetMeta format
function transformGoogleSheetData(data: GoogleSheetDataset): DatasetMeta {
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    org: data.org,
    repo: data.repo,
    description: data.description,
    tasks: data.tasks,
    modalities: data.modalities as ("text" | "audio" | "image" | "document")[],
    languages: data.languages,
    size: {
      hours: data.size_hours,
      items: data.size_items,
      tokens: data.size_tokens,
      storage_gb: data.size_storage_gb,
      rows: data.size_rows,
      size_mb: data.size_mb,
    },
    splits:
      data.splits_train || data.splits_val || data.splits_test
        ? {
            train: data.splits_train,
            val: data.splits_val,
            test: data.splits_test,
          }
        : undefined,
    license: data.license,
    version: data.version,
    updated_at: data.updated_at,
    visibility: data.visibility,
    checksum: data.checksum,
    labels: data.labels,
    links: {
      repo: data.link_repo,
      docs: data.link_docs,
      huggingface: data.link_huggingface,
      paper: data.link_paper,
    },
  };
}

// Fetch datasets from Google Sheets API with caching
export async function fetchDatasets(): Promise<DatasetMeta[]> {
  // Return cached data if still valid
  if (isCacheValid() && cachedDatasets) {
    console.log("Using cached datasets");
    return cachedDatasets;
  }

  console.log("Fetching fresh datasets from API");
  try {
    const response = await fetch(GOOGLE_SHEETS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: GoogleSheetDataset[] = await response.json();
    const transformedData = data.map(transformGoogleSheetData);

    // Update cache
    cachedDatasets = transformedData;
    cacheTimestamp = Date.now();

    return transformedData;
  } catch (error) {
    console.error("Error fetching datasets from Google Sheets:", error);
    // Return cached data if available, even if expired
    if (cachedDatasets) {
      console.log("API failed, using stale cache");
      return cachedDatasets;
    }
    // Return fallback data if API fails and no cache
    console.log("API failed, using fallback static data");
    return DATASETS;
  }
}

export const DATASETS: DatasetMeta[] = [
  {
    id: "op_garchen_10h",
    slug: "garchen-rinpoche-data-10-hours",
    name: "Garchen Rinpoche Data (10h)",
    org: "openpecha",
    repo: "garchen_rinpoche_data_10_hours",
    description:
      "~10 hours of curated Tibetan speech from Garchen Rinpoche with transcripts for ASR fine-tuning.",
    tasks: ["ASR", "Forced Alignment"],
    modalities: ["audio", "text"],
    languages: ["bo"],
    size: { hours: 10, storage_gb: 5.2, rows: 7558, size_mb: 1450 },
    splits: { train: 8, val: 1, test: 1 },
    license: "CC BY-NC 4.0",
    version: "1.0.0",
    updated_at: "2025-07-24",
    visibility: "public",
    labels: ["Tibetan", "Monastic", "Cleaned"],
    links: {
      repo: "https://github.com/openpecha/garchen_rinpoche_data_10_hours",
    },
  },
  {
    id: "op_garchen_full",
    slug: "garchen-rinpoche-data",
    name: "Garchen Rinpoche Data (Full)",
    org: "openpecha",
    repo: "garchen_rinpoche_data",
    description:
      "Full speech corpus from Garchen Rinpoche; larger/rougher set complementary to 10h clean split.",
    tasks: ["ASR"],
    modalities: ["audio", "text"],
    languages: ["bo"],
    size: { hours: 120, storage_gb: 60, rows: 95000, size_mb: 61440 },
    license: "CC BY-NC 4.0",
    version: "0.9.0",
    updated_at: "2025-07-14",
    visibility: "public",
    labels: ["Long-form", "Speaker-specific"],
    links: { repo: "https://github.com/openpecha/garchen_rinpoche_data" },
  },
  {
    id: "op_garchen_benchmark",
    slug: "garchen-rinpoche-benchmark",
    name: "Garchen Rinpoche ASR Benchmark",
    org: "openpecha",
    repo: "garchen_rinpoche_benchmark",
    description:
      "Held-out test set for evaluating Tibetan ASR models on monastic speech.",
    tasks: ["ASR Evaluation"],
    modalities: ["audio", "text"],
    languages: ["bo"],
    size: { hours: 2, storage_gb: 1.1, rows: 1500, size_mb: 1126 },
    license: "CC BY-NC 4.0",
    version: "1.0.0",
    updated_at: "2025-07-20",
    visibility: "public",
    labels: ["Benchmark", "Test-only"],
    links: {
      repo: "https://github.com/openpecha/garchen_rinpoche_benchmark",
    },
  },
  {
    id: "op_tibetan_news",
    slug: "tibetan-news-corpus",
    name: "Tibetan News Corpus",
    org: "openpecha",
    repo: "tibetan_news_corpus",
    description:
      "Large collection of Tibetan news articles for language modeling and NLP tasks.",
    tasks: ["Language Modeling", "NLP"],
    modalities: ["text"],
    languages: ["bo"],
    size: {
      items: 50000,
      tokens: 25000000,
      storage_gb: 0.8,
      rows: 50000,
      size_mb: 819,
    },
    splits: { train: 45000, val: 2500, test: 2500 },
    license: "CC BY-SA 4.0",
    version: "2.1.0",
    updated_at: "2025-08-10",
    visibility: "public",
    labels: ["News", "Modern Tibetan", "Large-scale"],
    links: {
      repo: "https://github.com/openpecha/tibetan_news_corpus",
      huggingface: "https://huggingface.co/datasets/openpecha/tibetan_news",
    },
  },
  {
    id: "op_pecha_ocr",
    slug: "pecha-ocr-dataset",
    name: "Pecha OCR Dataset",
    org: "openpecha",
    repo: "pecha_ocr_dataset",
    description:
      "Tibetan manuscript images with ground truth text for OCR model training.",
    tasks: ["OCR", "Document Analysis"],
    modalities: ["image", "text"],
    languages: ["bo"],
    size: { items: 15000, storage_gb: 12.5, rows: 15000, size_mb: 12800 },
    splits: { train: 12000, val: 1500, test: 1500 },
    license: "CC BY 4.0",
    version: "1.2.0",
    updated_at: "2025-06-15",
    visibility: "public",
    labels: ["Historical", "Manuscripts", "OCR"],
    links: {
      repo: "https://github.com/openpecha/pecha_ocr_dataset",
      docs: "https://docs.openpecha.org/datasets/pecha-ocr",
    },
  },
  {
    id: "op_buddhist_terms",
    slug: "buddhist-terminology",
    name: "Buddhist Terminology Database",
    org: "openpecha",
    repo: "buddhist_terminology",
    description:
      "Multilingual Buddhist terms with definitions and translations across Sanskrit, Tibetan, Chinese, and English.",
    tasks: ["Translation", "Terminology"],
    modalities: ["text"],
    languages: ["bo", "sa", "zh", "en"],
    size: { items: 8500, storage_gb: 0.15, rows: 8500, size_mb: 154 },
    license: "CC0 1.0",
    version: "3.0.0",
    updated_at: "2025-09-01",
    visibility: "public",
    labels: ["Multilingual", "Glossary", "Reference"],
    links: {
      repo: "https://github.com/openpecha/buddhist_terminology",
      docs: "https://docs.openpecha.org/datasets/terminology",
    },
  },
];

// Helper function to find dataset by ID (from static data)
export const getDatasetById = (id: string): DatasetMeta | undefined => {
  return DATASETS.find((ds) => ds.id === id);
};

// Helper function to find dataset by ID (from fetched data)
export const getDatasetByIdAsync = async (
  id: string
): Promise<DatasetMeta | undefined> => {
  const datasets = await fetchDatasets();
  return datasets.find((ds) => ds.id === id);
};

// Manually clear the cache (useful for debugging or force refresh)
export const clearDatasetsCache = (): void => {
  cachedDatasets = null;
  cacheTimestamp = null;
  console.log("Cache cleared");
};

// Get cache info (useful for debugging)
export const getCacheInfo = (): { isCached: boolean; age: number | null } => {
  if (!cacheTimestamp) {
    return { isCached: false, age: null };
  }
  const age = Date.now() - cacheTimestamp;
  return { isCached: isCacheValid(), age };
};
