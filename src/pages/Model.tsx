import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft, Search, Home, Cpu, Zap } from "lucide-react";
import { fetchModels, type ModelMeta } from "@/data/models";

// Simple tag chip
const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-gray-600 bg-white">
    {label}
  </span>
);

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState<ModelMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      const data = await fetchModels();
      setModels(data);
      setLoading(false);
    };
    loadModels();
  }, []);

  // Helper to format parameter size
  const formatParams = (params: number): string => {
    if (params >= 1) {
      return `${params}B`;
    }
    return `${(params * 1000).toFixed(0)}M`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <div className="container mx-auto px-4 pt-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              AI Models
              <br />
              for Buddhist NLP
            </h1>
            <p className="mt-4 text-gray-600 text-lg max-w-xl">
              State-of-the-art machine learning models for Tibetan language
              processing, OCR, and speech recognition.
            </p>
            <div className="mt-6 flex gap-3">
              <Button className="">Explore on Hugging Face</Button>
              <Button variant="secondary" className="">
                View Documentation
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Decorative illustration */}
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://www.willbhurd.com/wp-content/uploads/2023/01/DALL%C2%B7E-2024-01-07-08.01.49-An-eye-catching-and-informative-lead-image-for-a-blog-about-artificial-intelligence-for-beginners.-The-image-should-visually-represent-the-concept-of-.png"
                alt="AI and Machine Learning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-20">
        {/* Breadcrumb */}
        <div className="mt-10 flex items-center gap-2 text-sm text-gray-500">
          <Home className="h-4 w-4" />
          <span
            className="cursor-pointer hover:text-gray-700"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-700">All Models</span>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search models..."
              className="w-full rounded-lg border bg-white pl-10 pr-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading models...</p>
            </div>
          ) : models.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Cpu className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No models available</p>
            </div>
          ) : (
            models.map((model) => (
            <div
              key={model.id}
              className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/models/${model.id}`)}
            >
              <div className="flex items-start gap-2 mb-2">
                <Cpu className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <h3 className="line-clamp-2 text-[15px] font-semibold text-gray-900 min-h-[44px]">
                  {model.name}
                </h3>
              </div>

              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span className="font-medium">{model.task}</span>
                </p>
                <p className="truncate" title={model.base_model}>
                  Base: {model.base_model}
                </p>
                <p>
                  <span className="font-medium">
                    {formatParams(model.parameters_b)}
                  </span>{" "}
                  parameters
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {model.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>v{model.version}</span>
                <button className="text-sm font-medium text-purple-600 inline-flex items-center gap-1 hover:text-purple-700">
                  Details <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Back button */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;
