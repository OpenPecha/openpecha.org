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
    size: { hours: 10, storage_gb: 5.2 },
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
    size: { hours: 120, storage_gb: 60 },
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
    size: { hours: 2, storage_gb: 1.1 },
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
    size: { items: 50000, tokens: 25000000, storage_gb: 0.8 },
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
    size: { items: 15000, storage_gb: 12.5 },
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
    size: { items: 8500, storage_gb: 0.15 },
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

// Helper function to find dataset by ID
export const getDatasetById = (id: string): DatasetMeta | undefined => {
  return DATASETS.find((ds) => ds.id === id);
};
