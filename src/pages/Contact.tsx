import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Get query parameters
  const isSamplesRequest = searchParams.get("samples") === "1";
  const isQuoteRequest = searchParams.get("quote") === "1";
  const datasetId = searchParams.get("dataset");
  const modelId = searchParams.get("model");

  // Check if form was submitted successfully
  useEffect(() => {
    setFormSubmitted(searchParams.get("submitted") === "true");
  }, [searchParams]);

  // Determine form title and description
  const getFormTitle = () => {
    if (isSamplesRequest) return "Request Data Samples";
    if (isQuoteRequest) return "Request a Quote";
    return "Contact Us";
  };

  const getFormDescription = () => {
    if (isSamplesRequest)
      return "Fill out the form below to request sample data from our dataset.";
    if (isQuoteRequest)
      return "Fill out the form below and we'll get back to you with pricing information.";
    return "Get in touch with us for any inquiries.";
  };

  const getSubjectLine = () => {
    if (isSamplesRequest && datasetId)
      return `Data Samples Request - ${datasetId}`;
    if (isQuoteRequest && datasetId) return `Quote Request - ${datasetId}`;
    if (isSamplesRequest && modelId) return `Model Access Request - ${modelId}`;
    if (isQuoteRequest && modelId) return `Model Quote Request - ${modelId}`;
    return "General Inquiry";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{getFormTitle()}</CardTitle>
              <p className="text-gray-600 mt-2">{getFormDescription()}</p>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                // Success Message
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Thank You!
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Your request has been sent successfully.
                  </p>
                  <p className="text-gray-600 text-sm mb-6">
                    The OpenPecha team will be in touch with you soon.
                  </p>
                  <Button
                    onClick={() =>
                      window.history.replaceState({}, "", window.location.pathname)
                    }
                    className="text-white"
                    style={{ backgroundColor: "#8f3ae9" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#7c2fd8")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#8f3ae9")
                    }
                  >
                    Send Another Request
                  </Button>
                </div>
              ) : (
                // Contact Form
                <>
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Mail className="h-5 w-5" style={{ color: "#8f3ae9" }} />
                      <p className="text-gray-700">
                        Or email us directly at:{" "}
                        <a
                          href="mailto:contact@openpecha.org"
                          className="font-semibold ml-1 hover:opacity-80"
                          style={{ color: "#8f3ae9" }}
                        >
                          contact@openpecha.org
                        </a>
                      </p>
                    </div>
                  </div>

                  <form
                    action="https://formsubmit.co/contact@openpecha.org"
                    method="POST"
                    className="space-y-4"
                  >
                    {/* Hidden inputs for formsubmit.co configuration */}
                    <input
                      type="hidden"
                      name="_subject"
                      value={getSubjectLine()}
                    />
                    <input type="hidden" name="_captcha" value="false" />
                    <input
                      type="hidden"
                      name="_next"
                      value={
                        typeof window !== "undefined"
                          ? window.location.origin +
                            window.location.pathname +
                            "?submitted=true"
                          : "?submitted=true"
                      }
                    />

                    {/* Hidden field for dataset/model ID */}
                    {datasetId && (
                      <input type="hidden" name="dataset_id" value={datasetId} />
                    )}
                    {modelId && (
                      <input type="hidden" name="model_id" value={modelId} />
                    )}

                    {/* Hidden field for request type */}
                    <input
                      type="hidden"
                      name="request_type"
                      value={
                        isSamplesRequest
                          ? "Data Samples"
                          : isQuoteRequest
                          ? "Quote"
                          : "General"
                      }
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your full name"
                          className="mt-1 focus:ring-2"
                          style={
                            { "--ring-color": "#8f3ae9" } as React.CSSProperties
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="mt-1 focus:ring-2"
                          style={
                            { "--ring-color": "#8f3ae9" } as React.CSSProperties
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Optional Organization field */}
                    <div>
                      <Label htmlFor="organization" className="text-gray-700">
                        Organization (Optional)
                      </Label>
                      <Input
                        id="organization"
                        name="organization"
                        type="text"
                        placeholder="Your organization or institution"
                        className="mt-1 focus:ring-2"
                        style={
                          { "--ring-color": "#8f3ae9" } as React.CSSProperties
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700">
                        Message or Specific Purpose
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your request, intended use case, or any questions you have..."
                        className="mt-1 focus:ring-2"
                        style={
                          { "--ring-color": "#8f3ae9" } as React.CSSProperties
                        }
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full text-white"
                      style={{ backgroundColor: "#8f3ae9" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#7c2fd8")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#8f3ae9")
                      }
                    >
                      Send Request
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
