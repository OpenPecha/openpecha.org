import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Database,
  Calendar,
  Scale,
  Tag as TagIcon,
  Languages,
  HardDrive,
  Clock,
  CheckCircle2,
  Table,
  FileText,
} from "lucide-react";
import { getDatasetByIdAsync, type DatasetMeta } from "@/data/datasets";

const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-gray-600 bg-white">
    {label}
  </span>
);

const DatasetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState<DatasetMeta | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const loadDataset = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = await getDatasetByIdAsync(id);
      setDataset(data);
      setLoading(false);
    };
    loadDataset();
  }, [id]);

  const scrollToContact = (requestType: "samples" | "quote") => {
    const el = document.getElementById("contact-form");
    const title = document.getElementById("form-title");
    if (title) {
      title.textContent =
        requestType === "samples" ? "Request Data Samples" : "Request a Quote";
    }
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-gray-600">Loading dataset...</p>
        </div>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Dataset Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The dataset you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/datasets")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Datasets
          </Button>
        </div>
      </div>
    );
  }

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
            onClick={() => navigate("/datasets")}
          >
            Datasets
          </span>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-gray-700 truncate">{dataset.name}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Database className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 break-words">
                {dataset.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 break-words">{dataset.description}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1 break-all">
                  <span className="font-medium">{dataset.org}</span> /{" "}
                  {dataset.repo}
                </span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  Updated {dataset.updated_at}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      dataset.visibility === "public"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {dataset.visibility}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              className="gap-2"
              onClick={() => scrollToContact("samples")}
            >
              Get Data Samples
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => scrollToContact("quote")}
            >
              Ask for a Quote
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
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <TagIcon className="h-4 w-4" />
                    Tasks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dataset.tasks.map((task) => (
                      <Tag key={task} label={task} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dataset.languages.map((lang) => (
                      <Tag key={lang} label={lang} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Modalities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dataset.modalities.map((mod) => (
                      <Tag key={mod} label={mod} />
                    ))}
                  </div>
                </div>

                {dataset.labels && dataset.labels.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <TagIcon className="h-4 w-4" />
                      Labels
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {dataset.labels.map((label) => (
                        <Tag key={label} label={label} />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dataset Size Card */}
            <Card>
              <CardHeader>
                <CardTitle>Dataset Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {dataset.size.rows && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Table className="h-4 w-4" />
                        <span className="text-sm">Rows</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {dataset.size.rows.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {dataset.size.size_mb && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Size</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {dataset.size.size_mb >= 1000
                          ? `${(dataset.size.size_mb / 1024).toFixed(2)} GB`
                          : `${dataset.size.size_mb.toFixed(2)} MB`}
                      </p>
                    </div>
                  )}
                  {dataset.size.hours && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {dataset.size.hours}h
                      </p>
                    </div>
                  )}
                  {dataset.size.items && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Database className="h-4 w-4" />
                        <span className="text-sm">Items</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {dataset.size.items.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {dataset.size.tokens && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <span className="text-sm">Tokens</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {(dataset.size.tokens / 1_000_000).toFixed(1)}M
                      </p>
                    </div>
                  )}
                  {dataset.size.storage_gb && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <HardDrive className="h-4 w-4" />
                        <span className="text-sm">Storage</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {dataset.size.storage_gb} GB
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Splits Card */}
            {dataset.splits && (
              <Card>
                <CardHeader>
                  <CardTitle>Data Splits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {dataset.splits.train && (
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Train</p>
                        <p className="text-xl font-bold text-gray-900">
                          {dataset.splits.train}
                          {dataset.size.hours ? "h" : ""}
                        </p>
                      </div>
                    )}
                    {dataset.splits.val && (
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Validation</p>
                        <p className="text-xl font-bold text-gray-900">
                          {dataset.splits.val}
                          {dataset.size.hours ? "h" : ""}
                        </p>
                      </div>
                    )}
                    {dataset.splits.test && (
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Test</p>
                        <p className="text-xl font-bold text-gray-900">
                          {dataset.splits.test}
                          {dataset.size.hours ? "h" : ""}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Metadata */}
          <div className="space-y-6">
            {/* License Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  License
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm text-gray-700">
                  {dataset.license}
                </p>
              </CardContent>
            </Card>

            {/* Version Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Version</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm text-gray-700">
                  {dataset.version}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form Section — new design, original fields, NO checkbox */}
        <div id="contact-form" className="mt-20">
          <h2
            id="form-title"
            className="text-2xl md:text-3xl font-semibold text-center text-gray-900"
          >
            Tell Us Your Special Needs
          </h2>

          <Card className="max-w-3xl mx-auto mt-8 border-none shadow-none">
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Your request has been received. Our team will get back to
                    you soon.
                  </p>
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6"
                  >
                    Send Another Request
                  </Button>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/contact@openpecha.org"
                  method="POST"
                  className="space-y-5"
                  onSubmit={() => setTimeout(() => setFormSubmitted(true), 150)}
                >
                  {/* hidden fields */}
                  <input
                    type="hidden"
                    name="_subject"
                    value={`Dataset Request - ${dataset.name}`}
                  />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="dataset_id" value={dataset.id} />
                  <input
                    type="hidden"
                    name="dataset_name"
                    value={dataset.name}
                  />

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      id="name"
                      name="name"
                      placeholder="Full Name *"
                      required
                      className="h-12 rounded-md bg-white border-gray-200 focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      required
                      className="h-12 rounded-md bg-white border-gray-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Row 2: Organization */}
                  <Input
                    id="organization"
                    name="organization"
                    placeholder="Organization (Optional)"
                    className="h-12 rounded-md bg-white border-gray-200 focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Row 3: Message */}
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Message or Specific Purpose *"
                    rows={5}
                    required
                    className="rounded-md bg-white border-gray-200 focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Submit */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-md text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 shadow-sm"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-14 flex justify-center">
          <Button
            onClick={() => navigate("/datasets")}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Datasets
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetail;
