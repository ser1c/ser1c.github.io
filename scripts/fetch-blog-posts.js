const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');
const fs = require('fs').promises;
const path = require('path');

// Get Substack URL from command line or use default
const args = process.argv.slice(2);
const SUBSTACK_URL = args[0] || 'https://sabinsubedi.substack.com';
const OUTPUT_DIR = path.join(__dirname, '../src/content/blog');

// Custom headers for the request
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml',
  'Referer': SUBSTACK_URL
};

async function fetchBlogPosts() {
  try {
    console.log(`Using Substack URL: ${SUBSTACK_URL}`);
    
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Try different feed URLs
    const feedPaths = ['/feed', '/rss', '/atom.xml', '/feed.xml'];
    let feedData = null;
    let workingFeedUrl = null;
    
    for (const feedPath of feedPaths) {
      const feedUrl = `${SUBSTACK_URL}${feedPath}`;
      try {
        console.log(`Attempting to fetch feed from: ${feedUrl}`);
        const response = await axios.get(feedUrl, { headers: HEADERS });
        
        // If we get here, we found a working feed
        console.log(`✓ Successfully fetched feed from: ${feedUrl}`);
        feedData = response.data;
        workingFeedUrl = feedUrl;
        break;
      } catch (error) {
        console.log(`✗ Failed to fetch from ${feedUrl}: ${error.message}`);
      }
    }
    
    if (!feedData) {
      throw new Error('Could not find a valid RSS feed for this Substack. Make sure the URL is correct and the blog has public posts.');
    }
    
    // Parse XML
    console.log('Parsing feed data...');
    const parser = new XMLParser({ 
      ignoreAttributes: false,
      isArray: (name) => ['item', 'category'].indexOf(name) !== -1
    });
    
    let result;
    try {
      result = parser.parse(feedData);
    } catch (parseError) {
      console.error('Error parsing feed:', parseError);
      await fs.writeFile('problematic-feed.xml', feedData);
      console.log('Saved problematic feed to problematic-feed.xml for inspection');
      throw parseError;
    }
    
    let items = [];
    let feedTitle = 'Substack';

    if (result.rss && result.rss.channel) {
      console.log('Detected RSS feed format');
      const channel = result.rss.channel;
      items = Array.isArray(channel.item) ? channel.item : (channel.item ? [channel.item] : []);
      feedTitle = channel.title || 'Substack';
    } else if (result.feed && result.feed.entry) {
      console.log('Detected Atom feed format');
      items = Array.isArray(result.feed.entry) ? result.feed.entry : [result.feed.entry];
      feedTitle = result.feed.title || 'Substack';
    } else {
      console.error('Unrecognized feed format. Structure:', JSON.stringify(result, null, 2).substring(0, 500) + '...');
      throw new Error('Unrecognized feed format');
    }
    
    console.log(`Found ${items.length} posts in the feed`);
    
    if (items.length === 0) {
      console.log('No items found in the feed. Check if there are published posts.');
      return;
    }
    
    // Process each item
    for (const item of items) {
      const title = item.title || '';
      const link = item.link || (item.link && item.link['@_href']) || '';
      const pubDate = new Date(item.pubDate || item.published || item.updated || new Date());
      let description = item.description || item.summary || '';
      const content = item['content:encoded'] || item.content || '';
      
      if (!title || !link) {
        console.log('Skipping item with missing title or link');
        continue;
      }
      
      console.log(`Processing post: "${title}"`);
      
      description = description.replace(/<[^>]*>?/gm, '');
      description = description.length > 160 ? description.substring(0, 160) + '...' : description;
      
      const slug = `substack-${title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}`;
      const formattedDate = pubDate.toISOString().split('T')[0];
      
      const categories = Array.isArray(item.category) 
        ? item.category.map(c => typeof c === 'string' ? c : c['#text'] || c.toString())
        : (item.category ? [typeof item.category === 'string' ? item.category : item.category['#text'] || 'Substack'] : ['Substack']);
      
      const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
author:
  - name: "Sabin Subedi"
    url: "${SUBSTACK_URL}"
date: "${formattedDate}"
categories: ${JSON.stringify(categories)}
draft: false
---`;

      let excerpt = (content || description).replace(/<[^>]*>?/gm, '');
      excerpt = excerpt.substring(0, 500) + '...';

      const fileContent = `${frontmatter}

${excerpt}

[Read the full post on Substack](${link})
      `;
      
      const filePath = path.join(OUTPUT_DIR, `${slug}.md`);
      
      let shouldWrite = true;
      try {
        const existingContent = await fs.readFile(filePath, 'utf8');
        if (existingContent.includes(title) && existingContent.includes(formattedDate)) {
          shouldWrite = false;
          console.log(`Post already exists, skipping: ${title}`);
        }
      } catch (e) {
        // File doesn't exist, should write
      }
      
      if (shouldWrite) {
        await fs.writeFile(filePath, fileContent);
        console.log(`Saved blog post: ${title}`);
      }
    }
    
    console.log('Successfully updated blog posts');
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    process.exit(1);
  }
}

fetchBlogPosts();
