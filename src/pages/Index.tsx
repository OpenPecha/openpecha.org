import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Github, BookOpen, Users, Code2, Heart, Lightbulb, Globe, MessageCircle, ChevronRight, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const location = useLocation();
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Check if we need to scroll to a section
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      const element = document.getElementById(sectionId);
      if (element) {
        // Give time for the page to fully render before scrolling
        setTimeout(() => {
          const offset = element.offsetTop - 100;
          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
        }, 300);
      }
    }

    // Check if form was submitted successfully
    const urlParams = new URLSearchParams(window.location.search);
    setFormSubmitted(urlParams.get('submitted') === 'true');
  }, [location.state]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 100;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  const impactStories = [
    {
      title: "AI-Powered Text Translation",
      description: "Our collaborative translation models have processed over 10,000 pages of Buddhist texts, making ancient wisdom accessible across languages.",
      impact: "10,000+ pages translated"
    },
    {
      title: "Open-Source Text Editor",
      description: "The community-built Buddhist text editor is now used by 15+ organizations worldwide for manuscript digitization.",
      impact: "15+ organizations using"
    },
    {
      title: "Shared Dataset Initiative",
      description: "Our shared training datasets have enabled 8 different AI projects, reducing individual development costs by 70%.",
      impact: "70% cost reduction"
    }
  ];

  const resources = [
    {
      category: "Open & Collaborative Buddhist AI",
      items: [
        "AI models & workflows for translation, transcription, and textual analysis",
        "High-quality, vetted AI training datasets for Sanskrit, Pāli, Tibetan, and Chinese Buddhist texts"
      ]
    },
    {
      category: "Open & Collaborative Buddhist Apps",
      items: [
        "Reusable software components for study and practice platforms",
        "Open-source tools like specialized text editors",
        "Pristinely edited and structured digital Buddhist texts, ready for any application"
      ]
    }
  ];

  const partners = [
    "Esukhia",
    "Dharmaduta", 
    "Indrajala"
  ];

  const contributionWays = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "BUILD",
      description: "Use our open resources to develop tools for your community more efficiently."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "COLLABORATE", 
      description: "Contribute your skills to our open data and code projects."
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "SHARE",
      description: "Tell our community about your projects and needs."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "SUPPORT",
      description: "Donate to the OpenPecha Charitable Trust to fund the creation of these vital resources for the global community."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{backgroundColor: '#8f3ae9'}}></div>
            <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full opacity-40 blur-3xl" style={{backgroundColor: '#08cbf2'}}></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10 flex-1 flex items-center">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-cormorant text-gray-800">
                Scaling Wisdom: Building the Open-Source Foundation for Buddhist Technology, Together.
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-gray-700 leading-relaxed max-w-3xl mx-auto">
                We unite a global community to create shared technology, ensuring the Dharma's wisdom can flourish in the digital age.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('resources')}
                  className="text-white"
                  style={{backgroundColor: '#8f3ae9'}}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c2fd8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8f3ae9'}
                >
                  Explore Our Resources
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => scrollToSection('community')}
                  className="border-2 hover:bg-purple-50"
                  style={{borderColor: '#8f3ae9', color: '#8f3ae9'}}
                >
                  Join the Community
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Challenge */}
        <section id="challenge" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-8 text-gray-800">
                A Duplicated, Disconnected Effort
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, Buddhist communities know they must embrace technology to scale their activities. However, the path is difficult. 
                AI and software development are complex, and those with the skills often work in isolation, duplicating efforts and wasting 
                precious resources. Preparing the necessary data requires rare expertise in both classical languages and technology. 
                Most projects are siloed, preventing the sharing of knowledge, code, and cost-effective partnerships. <b>We have no choice but to join our efforts.</b>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Our Solution */}
        <section id="solution" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-12 text-center text-gray-800">
                How We Do It: Our Community's Three Pillars
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Lightbulb className="h-6 w-6" style={{color: '#8f3ae9'}} />
                    </div>
                    <CardTitle className="text-xl font-cormorant">Shared Knowledge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We provide a central hub—including forums, chatrooms, workshops, and conferences—for specialists and 
                      organizations to connect, share ideas, and solve problems collaboratively.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6" style={{color: '#8f3ae9'}} />
                    </div>
                    <CardTitle className="text-xl font-cormorant">Shared Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our partners build a library of shared resources—open-source code (GitHub), AI models (Hugging Face), 
                      and APIs—that dramatically lower development costs. We amplify this collective effort by providing grants 
                      to the most impactful community projects, creating a virtuous cycle of innovation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6" style={{color: '#8f3ae9'}} />
                    </div>
                    <CardTitle className="text-xl font-cormorant">Shared Human Effort</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We create a living network connecting AI experts in the West with developers in Asia and scholars worldwide, 
                      ensuring the right talent can contribute to the most impactful projects.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Resources */}
        <section id="resources" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-8 text-center text-gray-800">
                Foundational Building Blocks for All
              </h2>
              
              <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
                Our initiative focuses on creating the core components that power modern Buddhist software, all for free.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {resources.map((resource, index) => (
                  <Card key={index} className="border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-xl font-cormorant" style={{color: '#8f3ae9'}}>
                        {resource.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {resource.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <ChevronRight className="h-4 w-4 mt-1 mr-2 flex-shrink-0" style={{color: '#08cbf2'}} />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Platform Links */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <a 
                  href="https://github.com/openpecha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Card className="border-purple-200 hover:shadow-lg transition-shadow h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Github className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-cormorant flex items-center justify-center gap-2">
                        GitHub
                        <ExternalLink className="h-4 w-4" style={{color: '#8f3ae9'}} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm text-center">
                        Open-source code repositories and collaborative development
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a 
                  href="https://huggingface.co/openpecha" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Card className="border-purple-200 hover:shadow-lg transition-shadow h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#ff9a00'}}>
                        <span className="text-3xl">🤗</span>
                      </div>
                      <CardTitle className="text-lg font-cormorant flex items-center justify-center gap-2">
                        Hugging Face
                        <ExternalLink className="h-4 w-4" style={{color: '#8f3ae9'}} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm text-center">
                        AI models, datasets, and machine learning resources
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <a 
                  href="https://bo.wikipedia.org/wiki/%E0%BD%82%E0%BD%99%E0%BD%BC%E0%BC%8B%E0%BD%84%E0%BD%BC%E0%BD%A6%E0%BC%8D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Card className="border-purple-200 hover:shadow-lg transition-shadow h-full">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-cormorant flex items-center justify-center gap-2">
                        Wikimedia
                        <ExternalLink className="h-4 w-4" style={{color: '#8f3ae9'}} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm text-center">
                        Buddhist knowledge on Wikipedia, Wikisource, and Wikidata
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: About Us */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-12 text-center text-gray-800">
                Who We Are
            </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="md:col-span-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-cormorant">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      The OpenPecha Initiative is not another software product. It is a collaborative ecosystem where partners 
                      build and share foundational "building blocks" for Buddhist technology. We unite a global community of 
                      scholars, developers, and AI specialists to create open-source tools, data, and resources that can be 
                      freely used, customized, and rebranded by any Buddhist organization.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-xl font-cormorant">Our Governance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm">
                      Led by the OpenPecha Charitable Trust, emphasizing transparency and community focus. 
                      <a href="#" className="underline ml-1 hover:opacity-80" style={{color: '#8f3ae9'}}>
                        Learn more about our governance
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Partners */}
              <div>
                <h3 className="text-2xl font-cormorant font-bold mb-8 text-center text-gray-800">Our Partners</h3>
                <div className="flex flex-wrap justify-center items-center gap-8">
                  {partners.map((partner, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-4 min-w-[200px] text-center">
                      <span className="text-gray-700 font-medium">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Community & Get Involved */}
        <section id="community" className="py-16 md:py-24 text-white" style={{backgroundColor: '#8f3ae9'}}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-8 text-center">
                Join a Global Network of Innovators and Practitioners
              </h2>
              
              {/* Ways to Connect */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <a 
                  href="https://forum.openpecha.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Card className="border-purple-400 text-white h-full" style={{backgroundColor: 'rgba(124, 47, 216, 0.7)'}}>
                    <CardHeader>
                      <MessageCircle className="h-8 w-8 mb-2" />
                      <CardTitle className="flex items-center gap-2">
                        Community Forum
                        <ExternalLink className="h-4 w-4" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-100">Join discussions and share knowledge with fellow practitioners and developers.</p>
                    </CardContent>
                  </Card>
                </a>

                <a 
                  href="https://discord.gg/6raQKJWk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Card className="border-purple-400 text-white h-full" style={{backgroundColor: 'rgba(124, 47, 216, 0.7)'}}>
                    <CardHeader>
                      <Users className="h-8 w-8 mb-2" />
                      <CardTitle className="flex items-center gap-2">
                        Chatrooms
                        <ExternalLink className="h-4 w-4" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-100">Real-time collaboration and support from our global community.</p>
                    </CardContent>
                  </Card>
                </a>
              </div>

              {/* How You Can Contribute */}
              <h3 className="text-2xl font-cormorant font-bold mb-8 text-center">How You Can Contribute</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contributionWays.map((way, index) => (
                  <Card key={index} className="bg-white text-gray-800 hover:bg-purple-50 transition-colors">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <div style={{color: '#8f3ae9'}}>
                          {way.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-cormorant" style={{color: '#8f3ae9'}}>{way.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm text-center">{way.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 7: Support Us */}
        <section id="support" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-8 text-gray-800">
                Your Support Creates a Virtuous Cycle of Innovation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6" style={{color: '#8f3ae9'}} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Community Grants</h3>
                  <p className="text-gray-600 text-sm">Fund impactful open-source projects</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6" style={{color: '#08cbf2'}} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Infrastructure</h3>
                  <p className="text-gray-600 text-sm">Maintain platforms and services</p>
                </div>
              </div>

              {/* Donation Contact & Form */}
              <div className="bg-white rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
                {formSubmitted ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Thank You!</h3>
                    <p className="text-gray-700 mb-2">Your donation inquiry has been sent successfully.</p>
                    <p className="text-gray-600 text-sm">The OpenPecha team will be in touch with you soon.</p>
                    <Button 
                      onClick={() => window.history.replaceState({}, '', window.location.pathname)}
                      className="mt-6 text-white"
                      style={{backgroundColor: '#8f3ae9'}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c2fd8'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8f3ae9'}
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Mail className="h-5 w-5" style={{color: '#8f3ae9'}} />
                        <p className="text-gray-700">
                          For donations, contact us at: 
                          <a href="mailto:contact@openpecha.org" className="font-semibold ml-1 hover:opacity-80" style={{color: '#8f3ae9'}}>
                            contact@openpecha.org
                          </a>
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm">Or use the form below to express your interest in supporting us:</p>
                    </div>

                    <form action="https://formsubmit.co/contact@openpecha.org" method="POST" className="space-y-4">
                      {/* Hidden inputs for formsubmit.co configuration */}
                      <input type="hidden" name="_subject" value="OpenPecha Donation Inquiry" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.origin + '/?submitted=true' : '/?submitted=true'} />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="donor-name" className="text-gray-700">Full Name</Label>
                          <Input 
                            id="donor-name" 
                            name="name"
                            type="text" 
                            placeholder="Your full name"
                            className="mt-1 focus:ring-2"
                            style={{'--ring-color': '#8f3ae9'} as React.CSSProperties}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="donor-email" className="text-gray-700">Email Address</Label>
                          <Input 
                            id="donor-email" 
                            name="email"
                            type="email" 
                            placeholder="your.email@example.com"
                            className="mt-1 focus:ring-2"
                            style={{'--ring-color': '#8f3ae9'} as React.CSSProperties}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="donation-amount" className="text-gray-700">Intended Donation Amount</Label>
                        <select 
                          id="donation-amount"
                          name="donation_amount" 
                          required
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="" disabled selected>Select an amount or specify other</option>
                          <option value="$25">$25</option>
                          <option value="$50">$50</option>
                          <option value="$100">$100</option>
                          <option value="$250">$250</option>
                          <option value="$500">$500</option>
                          <option value="$1000">$1,000</option>
                          <option value="Other amount">Other amount</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="donation-purpose" className="text-gray-700">Message or Specific Purpose (Optional)</Label>
                        <Textarea 
                          id="donation-purpose"
                          name="message"
                          placeholder="Tell us about your intended donation purpose or any questions you have..."
                          className="mt-1 focus:ring-2"
                          style={{'--ring-color': '#8f3ae9'} as React.CSSProperties}
                          rows={3}
                        />
                      </div>

                      <Button 
                        type="submit"
                        size="lg" 
                        className="w-full text-white"
                        style={{backgroundColor: '#8f3ae9'}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c2fd8'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8f3ae9'}
                      >
                        Send Donation Inquiry
                        <Heart className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
