import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ChevronRight,
  Home,
  ExternalLink,
  Cpu,
  Calendar,
  Tag as TagIcon,
  Languages,
  BarChart3,
  Layers,
  Zap,
} from "lucide-react"; // NOTE: Database icon removed
import { getModelByIdAsync, type ModelMeta } from "@/data/models";

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-gray-600 bg-white">
    {label}
  </span>
);

const ModelDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [model, setModel] = useState<ModelMeta | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await getModelByIdAsync(id);
      setModel(data);
      setLoading(false);
    };
    loadModel();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent mb-4"></div>
          <p className="text-gray-600">Loading model...</p>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Cpu className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Model Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The model you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/models")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Models
          </Button>
        </div>
      </div>
    );
  }

  const formatParams = (params: number): string =>
    params >= 1 ? `${params}B` : `${(params * 1000).toFixed(0)}M`;

  const formatMetricName = (key: string): string => {
    const map: Record<string, string> = {
      wer: "Word Error Rate (WER)",
      cer: "Character Error Rate (CER)",
      mos_estimate: "MOS Estimate",
      bleu: "BLEU Score",
      accuracy: "Accuracy",
    };
    return map[key] || key.toUpperCase();
  };

  const formatMetricValue = (value: number): string =>
    value < 1 ? `${(value * 100).toFixed(1)}%` : value.toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 overflow-x-auto">
          <Home className="h-4 w-4 flex-shrink-0" />
          <span
            className="cursor-pointer hover:text-gray-700 whitespace-nowrap"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span
            className="cursor-pointer hover:text-gray-700 whitespace-nowrap"
            onClick={() => navigate("/models")}
          >
            Models
          </span>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-gray-700 truncate">{model.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cpu className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 break-words">
                {model.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1 break-all">
                  <span className="font-medium">{model.owner}</span>
                </span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  Updated {model.updated_at}
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">
                    v{model.version}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons (no onClick navigation) */}
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2">
              🤗 View on Hugging Face
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle>Model Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Task
                  </h3>
                  <p className="text-gray-700">{model.task}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Base Model
                  </h3>
                  <p className="text-gray-700 font-mono text-sm">
                    {model.base_model}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {model.languages.map((lang) => (
                      <Tag key={lang} label={lang} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <TagIcon className="h-4 w-4" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {model.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(model.metrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">
                        {formatMetricName(key)}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatMetricValue(value as number)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Metadata */}
          <div className="space-y-6">
            {/* Model Size Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Model Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">
                  {formatParams(model.parameters_b)}
                </p>
                <p className="text-sm text-gray-600 mt-1">parameters</p>
              </CardContent>
            </Card>

            {/* Version Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Version</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm text-gray-700">
                  {model.version}
                </p>
              </CardContent>
            </Card>

            {/* Quick Start Card (kept, no links) */}
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  Load this model using Hugging Face Transformers:
                </p>
                <div className="bg-white p-3 rounded border text-xs font-mono overflow-x-auto">
                  <div className="text-gray-600"># Install transformers</div>
                  <div className="text-gray-800">pip install transformers</div>
                  <div className="mt-2 text-gray-600"># Load model</div>
                  <div className="text-gray-800">
                    from transformers import AutoModel
                  </div>
                  <div className="text-gray-800">
                    model = AutoModel.from_pretrained(
                  </div>
                  <div className="text-gray-800 pl-4">"{model.hf_repo}"</div>
                  <div className="text-gray-800">)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => navigate("/models")}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Models
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;
