"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Instagram,
    Youtube,
    MessageSquare,
    Linkedin,
    Mail,
    Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
    { name: "Instagram", href: "https://instagram.com/perkin", icon: Instagram },
    { name: "YouTube", href: "https://youtube.com/@perkin", icon: Youtube },
    { name: "Threads", href: "https://threads.net/@perkin", icon: MessageSquare },
    { name: "LinkedIn", href: "https://linkedin.com/in/perkin", icon: Linkedin },
    { name: "Email", href: "mailto:hello@perkin.dev", icon: Mail },
];

export function Footer() {
    return (
        <footer className="bg-card/50 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-display font-bold text-gradient">
                            Perkin
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Content creator and student entrepreneur passionate about blending
                            storytelling, technology, and design. Exploring AI, creativity, and
                            the student founder experience.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Connect</h4>
                        <div className="flex flex-wrap gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Button
                                        key={social.name}
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                        className="h-10 w-10 p-0 hover:bg-accent/10"
                                    >
                                        <Link
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                        >
                                            <Icon size={18} />
                                        </Link>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <div className="space-y-2">
                            <Link
                                href="/work"
                                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                            >
                                Portfolio
                            </Link>
                            <Link
                                href="/blog"
                                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/about"
                                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Perkin. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Heart size={16} className="text-red-500 fill-current" />
                        </motion.div>
                        <span>and Next.js</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
