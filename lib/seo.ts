import { Metadata } from "next";

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://perkin.dev";
const defaultImage = `${baseUrl}/og/default.jpg`;

export function generateSEO({
    title,
    description = "Content creator, filmmaker, and student sharing cinematic stories and creative insights.",
    path = "",
    image = defaultImage,
    type = "website",
    publishedTime,
    modifiedTime,
    authors = ["Perkin"],
    tags = [],
}: SEOProps = {}): Metadata {
    const url = `${baseUrl}${path}`;
    const fullTitle = title ? `${title} | Perkin — Cinematic Portfolio` : "Perkin — Cinematic Portfolio";

    const metadata: Metadata = {
        title: fullTitle,
        description,
        openGraph: {
            title: fullTitle,
            description,
            url,
            type: type === "article" ? "article" : "website",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title || "Perkin — Cinematic Portfolio",
                },
            ],
            siteName: "Perkin",
            locale: "en_US",
            ...(type === "article" && publishedTime && { publishedTime }),
            ...(type === "article" && modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [image],
            creator: "@perkin",
        },
        alternates: {
            canonical: url,
        },
    };

    if (authors.length > 0) {
        metadata.authors = authors.map((author) => ({ name: author }));
    }
    if (tags.length > 0) {
        metadata.keywords = tags;
    }

    return metadata;
}

export function generateStructuredData({
    type,
    title,
    description,
    url,
    image,
    publishedTime,
    modifiedTime,
    authors = ["Perkin"],
}: {
    type: "WebSite" | "Article" | "VideoObject";
    title: string;
    description: string;
    url: string;
    image?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
}) {
    const baseStructuredData = {
        "@context": "https://schema.org",
        "@type": type,
        name: title,
        description,
        url,
        ...(image && { image }),
        ...(publishedTime && { datePublished: publishedTime }),
        ...(modifiedTime && { dateModified: modifiedTime }),
        ...(authors.length > 0 && {
            author: authors.map((author) => ({
                "@type": "Person",
                name: author,
            })),
        }),
    };

    if (type === "WebSite") {
        return {
            ...baseStructuredData,
            potentialAction: {
                "@type": "SearchAction",
                target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${baseUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
            },
        };
    }

    return baseStructuredData;
}