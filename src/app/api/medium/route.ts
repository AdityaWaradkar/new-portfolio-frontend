import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const feedUrl = searchParams.get("url");

  if (!feedUrl) {
    return NextResponse.json(
      { error: "Missing feed URL" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // Parse XML to JSON with thumbnails
    const items = parseMediumFeed(xmlText);
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching Medium feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// Parse Medium RSS feed and extract thumbnails
function parseMediumFeed(xml: string) {
  const items: any[] = [];
  
  // Extract item elements
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    // Extract fields using regex
    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const descriptionMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/);
    const guidMatch = itemXml.match(/<guid>([\s\S]*?)<\/guid>/);
    const categoryMatches = itemXml.match(/<category>([\s\S]*?)<\/category>/g);
    const contentMatch = itemXml.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
    
    const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : "";
    const link = linkMatch ? linkMatch[1].trim() : "";
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : "";
    const description = descriptionMatch ? decodeHtmlEntities(descriptionMatch[1].trim()) : "";
    const guid = guidMatch ? guidMatch[1].trim() : "";
    const content = contentMatch ? contentMatch[1].trim() : "";
    
    // Extract categories
    const categories: string[] = [];
    if (categoryMatches) {
      categoryMatches.forEach(cat => {
        const catMatch = cat.match(/<category>([\s\S]*?)<\/category>/);
        if (catMatch) categories.push(catMatch[1].trim());
      });
    }
    
    // Extract thumbnail from content or description
    let thumbnail = extractThumbnail(content, description);
    
    items.push({
      title,
      link,
      pubDate,
      description,
      guid,
      categories,
      thumbnail,
    });
  }
  
  return items;
}

// Extract thumbnail image from content
function extractThumbnail(content: string, description: string): string | null {
  // Try to get thumbnail from content:encoded first
  if (content) {
    // Look for img tag in content
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
    if (imgMatch) {
      // Filter out small/icon images
      const src = imgMatch[1];
      if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar')) {
        return src;
      }
    }
    
    // Look for figure tag with image
    const figureMatch = content.match(/<figure[^>]*>.*?<img[^>]+src="([^">]+)"/i);
    if (figureMatch) {
      return figureMatch[1];
    }
  }
  
  // Try to get from description
  if (description) {
    const imgMatch = description.match(/<img[^>]+src="([^">]+)"/i);
    if (imgMatch) {
      const src = imgMatch[1];
      if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar')) {
        return src;
      }
    }
  }
  
  // Check if we can get a Medium preview image from the link
  // Medium has a standard thumbnail URL pattern
  const linkMatch = content.match(/<link[^>]+href="([^">]+)"/i);
  if (linkMatch) {
    const link = linkMatch[1];
    if (link && link.includes('medium.com')) {
      // Try to extract image from the URL or use Medium's OG image
      return null;
    }
  }
  
  // Try to find any image in the content
  const anyImgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
  if (anyImgMatch) {
    return anyImgMatch[1];
  }
  
  return null;
}

// Helper to decode HTML entities
function decodeHtmlEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}