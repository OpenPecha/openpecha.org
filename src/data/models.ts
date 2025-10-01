// =========================
// Types & Model Data
// =========================
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

// Helper function to find model by ID
export const getModelById = (id: string): ModelMeta | undefined => {
  return MODELS.find((model) => model.id === id);
};
