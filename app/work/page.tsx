"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, ExternalLink, Calendar, Eye, Heart } from "lucide-react";

export default function WorkPage() {
    // Sample data - you can replace this with real data
    const videos = [
        {
            id: 1,
            title: "The Future of AI in Creative Industries",
            description: "Exploring how artificial intelligence is transforming creative workflows.",
            duration: "8:32",
            views: "45K",
            likes: "2.1K",
            date: "2024-01-15",
            tags: ["AI", "Creative", "Technology"]
        },
        {
            id: 2,
            title: "Student Entrepreneurship Journey",
            description: "My personal story of building startups while studying.",
            duration: "12:45",
            views: "32K",
            likes: "1.8K",
            date: "2024-01-08",
            tags: ["Entrepreneurship", "Student Life", "Startup"]
        }
    ];

    const blogPosts = [
        {
            id: 1,
            title: "Building a PWA: Lessons from a Student Developer",
            description: "My experience creating a Progressive Web App and the technical challenges I faced.",
            readTime: "8 min read",
            date: "2024-01-20",
            tags: ["Web Development", "PWA", "Student"]
        },
        {
            id: 2,
            title: "The Psychology of Visual Storytelling",
            description: "How understanding human psychology can make your videos more engaging.",
            readTime: "12 min read",
            date: "2024-01-12",
            tags: ["Psychology", "Storytelling", "Video"]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-cinematic">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
                            My Work
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                            A showcase of my creative projects, research, and entrepreneurial journey.
                            From cinematic videos to academic research, explore the work that drives my passion.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Videos Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4 flex items-center">
                            <Play className="mr-3 h-8 w-8 text-accent" />
                            Video Content
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Cinematic storytelling and educational content that explores technology, creativity, and entrepreneurship.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                                    <div className="relative aspect-video bg-muted">
                                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-background/40" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Button size="lg" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Play className="mr-2 h-4 w-4" />
                                                Watch Now
                                            </Button>
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <Badge variant="secondary">{video.duration}</Badge>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2">{video.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {video.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-4">
                                                <span className="flex items-center">
                                                    <Eye className="mr-1 h-3 w-3" />
                                                    {video.views}
                                                </span>
                                                <span className="flex items-center">
                                                    <Heart className="mr-1 h-3 w-3" />
                                                    {video.likes}
                                                </span>
                                            </div>
                                            <span className="flex items-center">
                                                <Calendar className="mr-1 h-3 w-3" />
                                                {new Date(video.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4 flex items-center">
                            <FileText className="mr-3 h-8 w-8 text-accent" />
                            Blog Posts
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Thoughts, tutorials, and insights on technology, creativity, and the student entrepreneur experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2 group-hover:text-accent transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <span>{post.readTime}</span>
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                        <Button variant="outline" className="group-hover:bg-accent group-hover:text-accent-foreground">
                                            Read More
                                            <ExternalLink className="ml-2 h-3 w-3" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-cinematic">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            Interested in Collaborating?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            I&apos;m always excited to work on new projects and explore innovative ideas.
                            Let&apos;s create something amazing together.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary">
                                Get in Touch
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                                View Resume
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
