import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft, Search, Home, Database } from "lucide-react";
import { DATASETS } from "@/data/datasets";

// Simple tag chip
const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-gray-600 bg-white">
    {label}
  </span>
);

const DatasetsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <div className="container mx-auto px-4 pt-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              High-Quality
              <br />
              Training Datasets
            </h1>
            <p className="mt-4 text-gray-600 text-lg max-w-xl">
              Boost the performance of your AI models with our high-quality,
              ready-to-use training datasets.
            </p>
            <div className="mt-6 flex gap-3">
              <Button className="">Get Datasets Catalog</Button>
              <Button variant="secondary" className="">
                Contact Sales
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Decorative illustration */}
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://learn.g2.com/hs-fs/hubfs/training%20data.png?width=2960&name=training%20data.png"
                alt="Data visualization and analytics"
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
          <span className="text-gray-700">All Category Datasets</span>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-lg border bg-white pl-10 pr-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DATASETS.map((ds) => (
            <div
              key={ds.id}
              className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/datasets/${ds.id}`)}
            >
              <div className="flex items-start gap-2 mb-2">
                <Database className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <h3 className="line-clamp-2 text-[15px] font-semibold text-gray-900 min-h-[44px]">
                  {ds.name}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3 min-h-[66px]">
                {ds.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {ds.tasks.slice(0, 3).map((task) => (
                  <Tag key={task} label={task} />
                ))}
                {ds.labels?.slice(0, 2).map((label) => (
                  <Tag key={label} label={label} />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{ds.languages.join(", ")}</span>
                <button className="text-sm font-medium text-blue-600 inline-flex items-center gap-1 hover:text-blue-700">
                  Details <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
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

export default DatasetsPage;
