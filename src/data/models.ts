export type ModelMeta = {
  id: string;
  name: string;
  owner: string;
  task: string;
  base_model: string;
  parameters_b: number;
  version: string;
  updated_at: string;
  languages: string[];
  datasets: string[];
  metrics: Record<string, number>;
  tags: string[];
  hf_repo: string;
};

// Type for Google Sheets API response
type GoogleSheetModel = {
  id: string;
  name: string;
  owner: string;
  task: string;
  base_model: string;
  parameters_b: number;
  version: string;
  updated_at: string;
  languages: string[];
  datasets: string[];
  tags: string[];
  hf_repo: string;
  [key: string]: string | number | string[] | undefined;
};

// Google Sheets API URL
const GOOGLE_SHEETS_API_BASE_URL =
  "https://script.google.com/macros/s/AKfycbwyqVAZcThx65FXqJjqiQbFhSbZn4IP5MNpNaKTU7U1DJ0UyotJFg8SaUMsrS7U9uWMoA/exec";
const GOOGLE_SHEETS_API_URL = `${GOOGLE_SHEETS_API_BASE_URL}?sheet=models`;

// Cache configuration
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute
let cachedModels: ModelMeta[] | null = null;
let cacheTimestamp: number | null = null;

// Check if cache is still valid
function isCacheValid(): boolean {
  if (!cachedModels || !cacheTimestamp) return false;
  const now = Date.now();
  return now - cacheTimestamp < CACHE_DURATION;
}

// Transform Google Sheets data to ModelMeta format
function transformGoogleSheetModel(data: GoogleSheetModel): ModelMeta {
  // Extract metrics from fields starting with "metric_"
  const metrics: Record<string, number> = {};
  Object.keys(data).forEach((key) => {
    if (key.startsWith("metric_") && typeof data[key] === "number") {
      const metricName = key.replace("metric_", "");
      metrics[metricName] = data[key];
    }
  });

  // Format updated_at to simple date string (YYYY-MM-DD)
  let formattedDate = data.updated_at;
  // Check if it's a Date object or long date string and convert to YYYY-MM-DD
  if (typeof data.updated_at === 'string' && (data.updated_at.includes('GMT') || data.updated_at.includes('T'))) {
    const date = new Date(data.updated_at);
    formattedDate = date.toISOString().split('T')[0];
  } else if (typeof data.updated_at === 'object') {
    const date = new Date(data.updated_at as unknown as Date);
    formattedDate = date.toISOString().split('T')[0];
  }

  return {
    id: data.id,
    name: data.name,
    owner: data.owner,
    task: data.task,
    base_model: data.base_model,
    parameters_b: data.parameters_b,
    version: data.version,
    updated_at: formattedDate,
    languages: data.languages,
    datasets: data.datasets,
    metrics,
    tags: data.tags,
    hf_repo: data.hf_repo,
  };
}

// Fetch models from Google Sheets API with caching
export async function fetchModels(): Promise<ModelMeta[]> {
  // Return cached data if still valid
  if (isCacheValid() && cachedModels) {
    console.log("Using cached models");
    return cachedModels;
  }

  console.log("Fetching fresh models from API");
  try {
    const response = await fetch(GOOGLE_SHEETS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: GoogleSheetModel[] = await response.json();
    const transformedData = data.map(transformGoogleSheetModel);

    // Update cache
    cachedModels = transformedData;
    cacheTimestamp = Date.now();

    return transformedData;
  } catch (error) {
    console.error("Error fetching models from Google Sheets:", error);
    // Return cached data if available, even if expired
    if (cachedModels) {
      console.log("API failed, using stale cache");
      return cachedModels;
    }
    // Return fallback data if API fails and no cache
    console.log("API failed, using fallback static data");
    return MODELS;
  }
}

export const MODELS: ModelMeta[] = [
  {
    id: "gemma-bo-ocr-4b-v1-ep3-demo",
    name: "Gemma bo OCR 4B v1 (ep3) — demo",
    owner: "openpecha",
    task: "image-to-text (OCR)",
    base_model: "google/gemma-2-4b-it (vision-adapted)",
    parameters_b: 4.0,
    version: "1.0.0",
    updated_at: "2025-08-30",
    languages: ["bo"],
    datasets: ["op_ocr_google_books", "op_ocr_line_to_text_bench"],
    metrics: { cer: 0.24 },
    tags: ["OCR", "demo", "bo"],
    hf_repo: "openpecha/Gemma_bo_OCR_4B_v1_ep3_demo",
  },
  {
    id: "gemma-bo-ocr-12b-v1-ep3-demo",
    name: "Gemma bo OCR 12B v1 (ep3) — demo",
    owner: "openpecha",
    task: "image-to-text (OCR)",
    base_model: "google/gemma-2-12b-it (vision-adapted)",
    parameters_b: 12.0,
    version: "1.0.0",
    updated_at: "2025-07-05",
    languages: ["bo"],
    datasets: ["op_ocr_google_books", "op_ocr_line_to_text_bench"],
    metrics: { cer: 0.19 },
    tags: ["OCR", "high-capacity", "bo"],
    hf_repo: "openpecha/Gemma_bo_OCR_12B_v1_ep3_demo",
  },
  {
    id: "mms-300-garchen-v4",
    name: "MMS-300 Garchen Rinpoche — v4",
    owner: "openpecha",
    task: "automatic-speech-recognition (ASR)",
    base_model: "facebook/mms-300m",
    parameters_b: 0.3,
    version: "4",
    updated_at: "2025-07-25",
    languages: ["bo"],
    datasets: ["op_garchen_10h", "op_garchen_full"],
    metrics: { wer: 0.215, cer: 0.106 },
    tags: ["ASR", "speaker-specific", "garchen"],
    hf_repo: "openpecha/mms_300_Garchen_Rinpoche-v4-Checkpoint",
  },
  {
    id: "mms-300-garchen-v3",
    name: "MMS-300 Garchen Rinpoche — v3",
    owner: "openpecha",
    task: "automatic-speech-recognition (ASR)",
    base_model: "facebook/mms-300m",
    parameters_b: 0.3,
    version: "3",
    updated_at: "2025-07-25",
    languages: ["bo"],
    datasets: ["op_garchen_10h"],
    metrics: { wer: 0.233, cer: 0.121 },
    tags: ["ASR", "checkpoint"],
    hf_repo: "openpecha/mms_300_Garchen_Rinpoche-v3-Checkpoint",
  },
  {
    id: "garchen-rinpoche-stt",
    name: "Garchen Rinpoche STT",
    owner: "openpecha",
    task: "automatic-speech-recognition (ASR)",
    base_model: "openai/whisper-small (fine-tuned)",
    parameters_b: 0.24,
    version: "1.0.0",
    updated_at: "2025-07-11",
    languages: ["bo"],
    datasets: ["op_garchen_10h", "op_garchen_benchmark"],
    metrics: { wer: 0.198, cer: 0.098 },
    tags: ["ASR", "whisper", "bo"],
    hf_repo: "openpecha/Garchen_Rinpoche_stt",
  },
  {
    id: "op-wav2vec2-ft-v17",
    name: "op-wav2vec2-ft-v17",
    owner: "openpecha",
    task: "automatic-speech-recognition (ASR)",
    base_model: "facebook/wav2vec2-large-xlsr-53",
    parameters_b: 0.31,
    version: "17",
    updated_at: "2025-06-10",
    languages: ["bo"],
    datasets: ["op_garchen_full", "op_balanced_dialects"],
    metrics: { wer: 0.258 },
    tags: ["ASR", "wav2vec2", "bo"],
    hf_repo: "openpecha/op-wav2vec2-ft-v17",
  },
  {
    id: "op-wav2vec2-ft-v13",
    name: "op-wav2vec2-ft-v13",
    owner: "openpecha",
    task: "automatic-speech-recognition (ASR)",
    base_model: "facebook/wav2vec2-large-xlsr-53",
    parameters_b: 0.31,
    version: "13",
    updated_at: "2025-06-13",
    languages: ["bo"],
    datasets: ["op_garchen_full"],
    metrics: { wer: 0.272 },
    tags: ["ASR", "wav2vec2"],
    hf_repo: "openpecha/op-wav2vec2-ft-v13",
  },
  {
    id: "op-wav2vec2-ft-v10",
    name: "op-wav2vec2-ft-v10",
    owner: "openpecha",
    task: "automatic-speech-recognition (ASR)",
    base_model: "facebook/wav2vec2-large-xlsr-53",
    parameters_b: 0.31,
    version: "10",
    updated_at: "2025-06-13",
    languages: ["bo"],
    datasets: ["op_garchen_10h"],
    metrics: { wer: 0.289 },
    tags: ["ASR", "wav2vec2"],
    hf_repo: "openpecha/op-wav2vec2-ft-v10",
  },
  {
    id: "op-speecht5-ft-v1",
    name: "op-SpeechT5-ft-v1",
    owner: "openpecha",
    task: "text-to-audio (TTS)",
    base_model: "microsoft/speecht5-tts",
    parameters_b: 0.05,
    version: "1",
    updated_at: "2025-06-27",
    languages: ["bo"],
    datasets: ["op_balanced_dialects"],
    metrics: { mos_estimate: 3.7 },
    tags: ["TTS", "speech-synthesis"],
    hf_repo: "openpecha/op-SpeechT5-ft-v1",
  },
  {
    id: "op-mms-ft-v8",
    name: "op-mms-ft-v8",
    owner: "openpecha",
    task: "text-to-audio (TTS)",
    base_model: "facebook/mms-tts",
    parameters_b: 0.11,
    version: "8",
    updated_at: "2025-06-27",
    languages: ["bo"],
    datasets: ["op_balanced_dialects"],
    metrics: { mos_estimate: 3.5 },
    tags: ["TTS", "mms"],
    hf_repo: "openpecha/op-mms-ft-v8",
  },
];

// Helper function to find model by ID (from static data)
export const getModelById = (id: string): ModelMeta | undefined => {
  return MODELS.find((model) => model.id === id);
};

// Helper function to find model by ID (from fetched data)
export const getModelByIdAsync = async (
  id: string
): Promise<ModelMeta | undefined> => {
  const models = await fetchModels();
  return models.find((model) => model.id === id);
};

// Manually clear the cache (useful for debugging or force refresh)
export const clearModelsCache = (): void => {
  cachedModels = null;
  cacheTimestamp = null;
  console.log("Models cache cleared");
};

// Get cache info (useful for debugging)
export const getModelsCacheInfo = (): {
  isCached: boolean;
  age: number | null;
} => {
  if (!cacheTimestamp) {
    return { isCached: false, age: null };
  }
  const age = Date.now() - cacheTimestamp;
  return { isCached: isCacheValid(), age };
};
