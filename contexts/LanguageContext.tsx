"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "zh-TW";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.work": "Work",
        "nav.blog": "Blog",
        "nav.about": "About",
        "nav.contact": "Contact",

        // Hero Section
        "hero.welcome": "Welcome to my page",
        "hero.greeting": "Hi, I am",
        "hero.name": "Perkin",
        "hero.tagline": "✨ Student Founder • Creator • Storyteller",
        "hero.bio1": "I blend storytelling, technology, and design to turn ideas into stories that resonate.",
        "hero.bio2": "Through cinematic reels, YouTube features, and creative experiments, I share the journey of building as a student entrepreneur — exploring how AI and creativity can shape what's next.",
        "hero.enter": "Enter My World",
        "hero.explore": "Explore My Work",
        "hero.watch": "Watch My Story",
        "hero.startup": "Startup Project",

        // Stats
        "stats.videos": "Videos Produced",
        "stats.views": "Total Views",
        "stats.projects": "Creative Projects",

        // Footer
        "footer.bio": "Content creator and student entrepreneur passionate about blending storytelling, technology, and design. Exploring AI, creativity, and the student founder experience.",
        "footer.connect": "Connect",
        "footer.quickLinks": "Quick Links",
        "footer.portfolio": "Portfolio",
        "footer.blog": "Blog",
        "footer.about": "About",
        "footer.contact": "Contact",
        "footer.copyright": "All rights reserved.",
        "footer.madeWith": "Made with",
        "footer.andNextjs": "and Next.js",
    },
    "zh-TW": {
        // Navigation
        "nav.home": "首頁",
        "nav.work": "作品",
        "nav.blog": "部落格",
        "nav.about": "關於",
        "nav.contact": "聯絡",

        // Hero Section
        "hero.welcome": "歡迎來到我的頁面",
        "hero.greeting": "你好，我是",
        "hero.name": "Perkin",
        "hero.tagline": "✨ 學生創業者 • 創作者 • 故事講述者",
        "hero.bio1": "我融合故事敘述、技術和設計，將想法轉化為引起共鳴的故事。",
        "hero.bio2": "透過電影般的短片、YouTube 功能和創意實驗，我分享作為學生創業者的建構旅程——探索 AI 和創意如何塑造未來。",
        "hero.enter": "進入我的世界",
        "hero.explore": "探索我的作品",
        "hero.watch": "觀看我的故事",
        "hero.startup": "創業專案",

        // Stats
        "stats.videos": "影片製作",
        "stats.views": "總觀看次數",
        "stats.projects": "創意專案",

        // Footer
        "footer.bio": "內容創作者和學生企業家，熱衷於融合故事敘述、技術和設計。探索 AI、創意和學生創業者經驗。",
        "footer.connect": "聯絡方式",
        "footer.quickLinks": "快速連結",
        "footer.portfolio": "作品集",
        "footer.blog": "部落格",
        "footer.about": "關於",
        "footer.contact": "聯絡",
        "footer.copyright": "版權所有。",
        "footer.madeWith": "使用",
        "footer.andNextjs": "和 Next.js 製作",
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        // Load saved language preference
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh-TW")) {
            setLanguage(savedLanguage);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations[typeof language]] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
