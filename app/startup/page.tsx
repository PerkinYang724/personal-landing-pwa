"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, Users, Target, Lightbulb, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StartupPage() {
    const router = useRouter();

    const features = [
        {
            icon: <Lightbulb className="h-6 w-6" />,
            title: "Creative Innovation",
            description: "Pushing boundaries in digital storytelling and creative technology"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Rapid Prototyping",
            description: "Fast iteration and development of creative solutions"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Collaborative Team",
            description: "Building with talented creators and technologists"
        },
        {
            icon: <Target className="h-6 w-6" />,
            title: "Focused Mission",
            description: "Democratizing creative tools and storytelling platforms"
        }
    ];

    const milestones = [
        {
            date: "2024 Q1",
            title: "Oshen Studio Founded",
            description: "Started with a vision to revolutionize creative workflows"
        },
        {
            date: "2024 Q2",
            title: "First Product Launch",
            description: "Released our flagship creative collaboration platform"
        },
        {
            date: "2024 Q3",
            title: "Series A Funding",
            description: "Secured $2M in funding to accelerate growth"
        },
        {
            date: "2024 Q4",
            title: "Global Expansion",
            description: "Expanding to serve creators worldwide"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-cinematic">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="mb-8 text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
                            Oshen Studio
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                            Where creativity meets technology. We&apos;re building the future of digital storytelling 
                            and creative collaboration platforms.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Badge variant="secondary" className="px-4 py-2 text-lg">
                                Creative Technology
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-2 text-lg">
                                Digital Storytelling
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-2 text-lg">
                                Collaboration Tools
                            </Badge>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-display font-bold mb-6">Our Mission</h2>
                        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                            At Oshen Studio, we believe that everyone has a story to tell. Our mission is to 
                            democratize creative tools and platforms, making professional-grade storytelling 
                            accessible to creators of all levels. We&apos;re building the infrastructure for 
                            the next generation of digital creators.
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 * index }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow">
                                    <CardHeader className="text-center">
                                        <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                                            {feature.icon}
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-center">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-display font-bold mb-6">Our Journey</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            From a student&apos;s vision to a growing startup, here&apos;s our story so far.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 * index }}
                                className={`flex items-center mb-12 ${
                                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                }`}
                            >
                                <div className="flex-1">
                                    <Card className="p-6">
                                        <div className="flex items-center mb-4">
                                            <Calendar className="h-5 w-5 mr-2 text-accent" />
                                            <Badge variant="outline">{milestone.date}</Badge>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                                        <p className="text-muted-foreground">{milestone.description}</p>
                                    </Card>
                                </div>
                                <div className="w-4 h-4 bg-accent rounded-full mx-8 flex-shrink-0"></div>
                                <div className="flex-1"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-cinematic">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-display font-bold mb-6 text-white">
                            Join Our Journey
                        </h2>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                            Interested in learning more about Oshen Studio? We&apos;re always looking for 
                            talented creators, developers, and visionaries to join our mission.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg font-semibold"
                            >
                                <ExternalLink className="mr-2 h-5 w-5" />
                                Learn More
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
                                onClick={() => router.push('/contact')}
                            >
                                Get in Touch
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
